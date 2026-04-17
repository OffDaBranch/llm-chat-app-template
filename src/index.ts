/**
 * Phase 2: DB-backed chat flow for the personal AI MVP.
 */

import { Env, ChatMessage, ChatMode } from "./types";

const SYSTEM_PROMPT =
	"You are a helpful, friendly assistant. Provide concise and accurate responses.";

type ChatApiRequest = {
	conversation_id?: string;
	mode?: ChatMode;
	message?: string;
	messages?: ChatMessage[]; // legacy fallback
};

type DbMessageRow = {
	id: string;
	conversation_id: string;
	role: "system" | "user" | "assistant";
	content: string;
	citations_json: string | null;
	created_at: string;
};

type DbConversationRow = {
	id: string;
	title: string;
	mode: string;
	created_at: string;
	updated_at: string;
};

const corsHeaders: Record<string, string> = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET,POST,OPTIONS",
	"access-control-allow-headers": "Content-Type",
};

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: corsHeaders });
		}

		// Frontend / static assets
		if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
			return env.ASSETS.fetch(request);
		}

		if (url.pathname === "/api/chat" && request.method === "POST") {
			return handleChatRequest(request, env, ctx);
		}

		if (url.pathname === "/api/conversations" && request.method === "POST") {
			return handleCreateConversation(request, env);
		}

		const messagesMatch = url.pathname.match(
			/^\/api\/conversations\/([^/]+)\/messages$/,
		);
		if (messagesMatch && request.method === "GET") {
			return handleGetConversationMessages(messagesMatch[1], env);
		}

		if (url.pathname === "/api/health" && request.method === "GET") {
			return jsonResponse(
				{
					ok: true,
					env: env.APP_ENV,
					model: env.DEFAULT_MODEL,
				},
				200,
			);
		}

		return jsonResponse({ error: "Not found" }, 404);
	},
} satisfies ExportedHandler<Env>;

async function handleChatRequest(
	request: Request,
	env: Env,
	ctx: ExecutionContext,
): Promise<Response> {
	try {
		const body = (await request.json()) as ChatApiRequest;

		const incomingMessage =
			typeof body.message === "string" && body.message.trim().length > 0
				? body.message.trim()
				: extractLatestUserMessage(body.messages ?? []);

		if (!incomingMessage) {
			return jsonResponse({ error: "Message is required" }, 400);
		}

		const mode = sanitizeMode(body.mode);
		const conversationId = await ensureConversation(
			env,
			body.conversation_id,
			incomingMessage,
			mode,
		);

		const userMessageId = crypto.randomUUID();

		await env.DB.prepare(
			`INSERT INTO messages (id, conversation_id, role, content, citations_json)
       VALUES (?, ?, ?, ?, ?)`,
		)
			.bind(userMessageId, conversationId, "user", incomingMessage, null)
			.run();

		await touchConversation(env, conversationId);

		const history = await getConversationMessagesFromDb(env, conversationId);

		const aiMessages: ChatMessage[] = [
			{ role: "system", content: SYSTEM_PROMPT },
			...history.map((msg) => ({
				role: msg.role,
				content: msg.content,
			})),
		];

		const aiStream = (await env.AI.run(env.DEFAULT_MODEL, {
			messages: aiMessages,
			max_tokens: 1024,
			stream: true,
		})) as ReadableStream<Uint8Array>;

		const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();

		ctx.waitUntil(
			pipeAiStreamAndPersist({
				env,
				conversationId,
				aiStream,
				writable,
			}),
		);

		return new Response(readable, {
			status: 200,
			headers: {
				...corsHeaders,
				"content-type": "text/event-stream; charset=utf-8",
				"cache-control": "no-cache",
				connection: "keep-alive",
				"x-conversation-id": conversationId,
				"x-user-message-id": userMessageId,
			},
		});
	} catch (error) {
		console.error("Error processing chat request:", error);
		return jsonResponse({ error: "Failed to process request" }, 500);
	}
}

async function handleCreateConversation(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const body = (await request.json().catch(() => ({}))) as {
			title?: string;
			mode?: ChatMode;
		};

		const id = crypto.randomUUID();
		const mode = sanitizeMode(body.mode);
		const title = deriveTitle(body.title?.trim() || "New conversation");

		await env.DB.prepare(
			`INSERT INTO conversations (id, title, mode)
       VALUES (?, ?, ?)`,
		)
			.bind(id, title, mode)
			.run();

		const row = await getConversationById(env, id);

		return jsonResponse({ conversation: row }, 201);
	} catch (error) {
		console.error("Error creating conversation:", error);
		return jsonResponse({ error: "Failed to create conversation" }, 500);
	}
}

async function handleGetConversationMessages(
	conversationId: string,
	env: Env,
): Promise<Response> {
	try {
		const conversation = await getConversationById(env, conversationId);
		if (!conversation) {
			return jsonResponse({ error: "Conversation not found" }, 404);
		}

		const messages = await getConversationMessagesFromDb(env, conversationId);

		return jsonResponse(
			{
				conversation,
				messages,
			},
			200,
		);
	} catch (error) {
		console.error("Error loading conversation messages:", error);
		return jsonResponse({ error: "Failed to load conversation" }, 500);
	}
}

async function ensureConversation(
	env: Env,
	conversationId: string | undefined,
	firstMessage: string,
	mode: ChatMode,
): Promise<string> {
	if (conversationId) {
		const existing = await getConversationById(env, conversationId);
		if (existing) {
			return existing.id;
		}
	}

	const id = conversationId || crypto.randomUUID();
	const title = deriveTitle(firstMessage);

	await env.DB.prepare(
		`INSERT INTO conversations (id, title, mode)
     VALUES (?, ?, ?)`,
	)
		.bind(id, title, mode)
		.run();

	return id;
}

async function getConversationById(
	env: Env,
	conversationId: string,
): Promise<DbConversationRow | null> {
	const result = await env.DB.prepare(
		`SELECT id, title, mode, created_at, updated_at
     FROM conversations
     WHERE id = ?
     LIMIT 1`,
	)
		.bind(conversationId)
		.first<DbConversationRow>();

	return result ?? null;
}

async function getConversationMessagesFromDb(
	env: Env,
	conversationId: string,
): Promise<DbMessageRow[]> {
	const result = await env.DB.prepare(
		`SELECT id, conversation_id, role, content, citations_json, created_at
     FROM messages
     WHERE conversation_id = ?
     ORDER BY created_at ASC`,
	)
		.bind(conversationId)
		.all<DbMessageRow>();

	return (result.results ?? []) as DbMessageRow[];
}

async function touchConversation(env: Env, conversationId: string): Promise<void> {
	await env.DB.prepare(
		`UPDATE conversations
     SET updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
	)
		.bind(conversationId)
		.run();
}

async function pipeAiStreamAndPersist(args: {
	env: Env;
	conversationId: string;
	aiStream: ReadableStream<Uint8Array>;
	writable: WritableStream<Uint8Array>;
}): Promise<void> {
	const { env, conversationId, aiStream, writable } = args;

	const reader = aiStream.getReader();
	const writer = writable.getWriter();
	const decoder = new TextDecoder();
	let sseBuffer = "";
	let assistantText = "";

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			if (value) {
				await writer.write(value);

				sseBuffer += decoder.decode(value, { stream: true });
				const parsed = consumeSseEvents(sseBuffer);
				sseBuffer = parsed.buffer;

				for (const data of parsed.events) {
					const delta = extractDeltaText(data);
					if (delta) {
						assistantText += delta;
					}
				}
			}
		}

		if (assistantText.trim().length > 0) {
			const assistantMessageId = crypto.randomUUID();

			await env.DB.prepare(
				`INSERT INTO messages (id, conversation_id, role, content, citations_json)
         VALUES (?, ?, ?, ?, ?)`,
			)
				.bind(
					assistantMessageId,
					conversationId,
					"assistant",
					assistantText,
					JSON.stringify([]),
				)
				.run();

			await touchConversation(env, conversationId);
		}
	} catch (error) {
		console.error("Error piping AI stream:", error);

		const encoder = new TextEncoder();
		await writer.write(
			encoder.encode(
				`data: ${JSON.stringify({
					error: "Streaming failed",
				})}\n\n`,
			),
		);
	} finally {
		await writer.close();
	}
}

function consumeSseEvents(buffer: string): {
	events: string[];
	buffer: string;
} {
	let normalized = buffer.replace(/\r/g, "");
	const events: string[] = [];

	let eventEndIndex: number;
	while ((eventEndIndex = normalized.indexOf("\n\n")) !== -1) {
		const rawEvent = normalized.slice(0, eventEndIndex);
		normalized = normalized.slice(eventEndIndex + 2);

		const lines = rawEvent.split("\n");
		const dataLines: string[] = [];

		for (const line of lines) {
			if (line.startsWith("data:")) {
				dataLines.push(line.slice("data:".length).trimStart());
			}
		}

		if (dataLines.length > 0) {
			events.push(dataLines.join("\n"));
		}
	}

	return { events, buffer: normalized };
}

function extractDeltaText(data: string): string {
	if (data === "[DONE]") {
		return "";
	}

	try {
		const json = JSON.parse(data) as {
			response?: string;
			choices?: Array<{ delta?: { content?: string } }>;
		};

		if (typeof json.response === "string" && json.response.length > 0) {
			return json.response;
		}

		return json.choices?.[0]?.delta?.content ?? "";
	} catch {
		return "";
	}
}

function extractLatestUserMessage(messages: ChatMessage[]): string {
	for (let i = messages.length - 1; i >= 0; i -= 1) {
		if (messages[i]?.role === "user" && messages[i]?.content?.trim()) {
			return messages[i].content.trim();
		}
	}
	return "";
}

function deriveTitle(input: string): string {
	const trimmed = input.trim();
	if (!trimmed) return "New conversation";
	return trimmed.length > 60 ? `${trimmed.slice(0, 60)}…` : trimmed;
}

function sanitizeMode(mode?: ChatMode): ChatMode {
	const allowed: ChatMode[] = [
		"general",
		"founder",
		"builder",
		"research",
		"personal_admin",
	];
	return allowed.includes(mode as ChatMode) ? (mode as ChatMode) : "general";
}

function jsonResponse(payload: unknown, status = 200): Response {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			...corsHeaders,
			"content-type": "application/json; charset=utf-8",
		},
	});
}