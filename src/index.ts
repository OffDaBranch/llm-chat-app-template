/**
 * LLM Chat Application Template
 *
 * A simple chat application using Cloudflare Workers AI.
 * This template demonstrates how to implement an LLM-powered chat interface with
 * streaming responses using Server-Sent Events (SSE).
 *
 * @license MIT
 */
import { Env, ChatMessage, ChatMode } from "./types";

// Default system prompt
const SYSTEM_PROMPT = `You are BranchOps Personal AI, a practical operating assistant for BranchOps work.
Introduce yourself as BranchOps Personal AI when the user asks who you are, what you can do, or starts a new orientation-style conversation.
Keep responses focused on helping the user execute BranchOps outcomes instead of behaving like a generic trivia or casual chatbot.

Core operating lanes:
- product slices: define thin, shippable slices with scope, acceptance criteria, validation, and follow-up slices.
- Codex prompts: turn goals into precise prompts for coding agents, including constraints, files to inspect, validation, and reporting requirements.
- repo/build planning: identify implementation order, likely files, schema/build impacts, test strategy, and deployment checks.
- automation: propose repeatable scripts, terminal workflows, checklists, and lightweight operating systems.
- Airtable/Notion/GitHub operating workflows: design tables, docs, issue flows, project boards, handoff notes, and status loops without claiming live connector access.
- monetization paths: map features to offers, pricing tests, packaging, activation paths, and operational costs.
- risk/compliance notes: flag data, privacy, security, legal, platform, and operational risks in practical terms.
- next executable terminal steps: when code or repo work is relevant, end with concrete commands or terminal actions the user can run next.

Behavior rules:
- Be direct, specific, and implementation-minded.
- If the user asks a broad question, answer through a BranchOps operating lens and give the next useful action.
- Do not claim external Airtable, Notion, GitHub, billing, or deployment access unless the user explicitly provides it in the current conversation.
- If a request is outside BranchOps operating work, still help briefly, then connect the answer back to execution when useful.`;

const MODE_PROMPTS: Record<ChatMode, string> = {
	general:
		"Mode: general. Be a concise BranchOps copilot across planning, prompts, workflows, automation, monetization, risks, and next steps.",
	founder:
		"Mode: founder. Prioritize strategy, positioning, offer design, monetization, customer discovery, operating cadence, decision tradeoffs, and risk notes.",
	builder:
		"Mode: builder. Prioritize product slices, repo/build plans, implementation sequencing, Codex-ready prompts, validation commands, and terminal next steps.",
	research:
		"Mode: research. Prioritize structured investigation plans, assumptions, source needs, comparison criteria, synthesis, unknowns, and risk/compliance implications. Be clear when current live research or connectors are not available.",
	personal_admin:
		"Mode: personal_admin. Prioritize task triage, scheduling logic, follow-up systems, lightweight automations, knowledge capture, and Airtable/Notion/GitHub operating hygiene.",
};

const DEFAULT_MODEL = "@cf/meta/llama-3.1-8b-instruct-fp8";
const VALID_CHAT_MODES: ChatMode[] = [
	"general",
	"founder",
	"builder",
	"research",
	"personal_admin",
];

export default {
	/**
	 * Main request handler for the Worker
	 */
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		const url = new URL(request.url);

		// Handle static assets (frontend)
		if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
			return env.ASSETS.fetch(request);
		}

		// API Routes
		if (url.pathname === "/api/health") {
			return jsonResponse({ ok: true, app_env: env.APP_ENV });
		}

		if (url.pathname === "/api/conversations") {
			if (request.method === "GET") {
				return listConversations(env);
			}

			return new Response("Method not allowed", { status: 405 });
		}

		const messagesMatch = url.pathname.match(
			/^\/api\/conversations\/([^/]+)\/messages$/,
		);
		if (messagesMatch) {
			if (request.method === "GET") {
				return listMessages(env, decodeURIComponent(messagesMatch[1]));
			}

			return new Response("Method not allowed", { status: 405 });
		}

		if (url.pathname === "/api/chat") {
			// Handle POST requests for chat
			if (request.method === "POST") {
				return handleChatRequest(request, env);
			}

			// Method not allowed for other request types
			return new Response("Method not allowed", { status: 405 });
		}

		// Handle 404 for unmatched routes
		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;

/**
 * Handles chat API requests
 */
async function handleChatRequest(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		// Parse JSON request body
		const body = (await request.json()) as {
			conversation_id?: string;
			mode?: ChatMode;
			message?: string;
			messages?: ChatMessage[];
			stream?: boolean;
		};
		const messages = normalizeMessages(body);
		const userMessage = getLatestUserMessage(body, messages);

		if (!userMessage) {
			return jsonResponse({ error: "Missing user message" }, 400);
		}

		const mode = normalizeChatMode(body.mode);
		const conversation = await getOrCreateConversation(
			env,
			body.conversation_id,
			mode,
			userMessage,
		);
		await saveMessage(env, conversation.id, "user", userMessage);

		// Add system prompt if not present
		if (!messages.some((msg) => msg.role === "system")) {
			messages.unshift({ role: "system", content: buildSystemPrompt(mode) });
		}

		const stream = await env.AI.run(
			(env.DEFAULT_MODEL || DEFAULT_MODEL) as keyof AiModels,
			{
				messages,
				max_tokens: 1024,
				stream: true,
			},
			{
				// Uncomment to use AI Gateway
				// gateway: {
				//   id: "YOUR_GATEWAY_ID", // Replace with your AI Gateway ID
				//   skipCache: false,      // Set to true to bypass cache
				//   cacheTtl: 3600,        // Cache time-to-live in seconds
				// },
			},
		);

		const responseStream = streamAssistantResponse(
			stream as ReadableStream<Uint8Array>,
			async (assistantMessage) => {
				if (assistantMessage.length > 0) {
					await saveMessage(env, conversation.id, "assistant", assistantMessage);
				}
			},
		);

		return new Response(responseStream, {
			headers: {
				"content-type": "text/event-stream; charset=utf-8",
				"cache-control": "no-cache",
				connection: "keep-alive",
				"x-conversation-id": conversation.id,
			},
		});
	} catch (error) {
		console.error("Error processing chat request:", error);
		return jsonResponse({ error: "Failed to process request" }, 500);
	}
}

async function listConversations(env: Env): Promise<Response> {
	const { results } = await env.DB.prepare(
		`SELECT id, title, mode, created_at, updated_at
		 FROM conversations
		 ORDER BY updated_at DESC`,
	).all();

	return jsonResponse({ conversations: results });
}

async function listMessages(env: Env, conversationId: string): Promise<Response> {
	const conversation = await env.DB.prepare(
		"SELECT id FROM conversations WHERE id = ?",
	)
		.bind(conversationId)
		.first();

	if (!conversation) {
		return jsonResponse({ error: "Conversation not found" }, 404);
	}

	const { results } = await env.DB.prepare(
		`SELECT id, conversation_id, role, content, citations_json, created_at
		 FROM messages
		 WHERE conversation_id = ?
		 ORDER BY created_at ASC`,
	)
		.bind(conversationId)
		.all();

	return jsonResponse({ messages: results });
}

function normalizeMessages(body: {
	message?: string;
	messages?: ChatMessage[];
}): ChatMessage[] {
	if (Array.isArray(body.messages)) {
		return body.messages.filter(
			(message): message is ChatMessage =>
				isChatRole(message.role) && typeof message.content === "string",
		);
	}

	if (typeof body.message === "string" && body.message.trim().length > 0) {
		return [{ role: "user", content: body.message.trim() }];
	}

	return [];
}

function getLatestUserMessage(
	body: { message?: string },
	messages: ChatMessage[],
): string | null {
	if (typeof body.message === "string" && body.message.trim().length > 0) {
		return body.message.trim();
	}

	for (let index = messages.length - 1; index >= 0; index--) {
		const message = messages[index];
		if (message.role === "user" && message.content.trim().length > 0) {
			return message.content.trim();
		}
	}

	return null;
}

function normalizeChatMode(mode: ChatMode | undefined): ChatMode {
	if (mode && VALID_CHAT_MODES.includes(mode)) {
		return mode;
	}

	return "general";
}

function buildSystemPrompt(mode: ChatMode): string {
	return `${SYSTEM_PROMPT}\n\n${MODE_PROMPTS[mode]}`;
}

function isChatRole(role: string): role is ChatMessage["role"] {
	return role === "system" || role === "user" || role === "assistant";
}

async function getOrCreateConversation(
	env: Env,
	conversationId: string | undefined,
	mode: ChatMode,
	userMessage: string,
): Promise<{ id: string }> {
	if (conversationId) {
		const existing = await env.DB.prepare(
			"SELECT id FROM conversations WHERE id = ?",
		)
			.bind(conversationId)
			.first<{ id: string }>();

		if (existing) {
			await env.DB.prepare(
				"UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
			)
				.bind(existing.id)
				.run();
			return existing;
		}
	}

	const id = crypto.randomUUID();
	const title = createConversationTitle(userMessage);
	await env.DB.prepare(
		`INSERT INTO conversations (id, title, mode)
		 VALUES (?, ?, ?)`,
	)
		.bind(id, title, mode)
		.run();

	return { id };
}

async function saveMessage(
	env: Env,
	conversationId: string,
	role: ChatMessage["role"],
	content: string,
): Promise<void> {
	await env.DB.prepare(
		`INSERT INTO messages (id, conversation_id, role, content, citations_json)
		 VALUES (?, ?, ?, ?, ?)`,
	)
		.bind(crypto.randomUUID(), conversationId, role, content, null)
		.run();

	await env.DB.prepare(
		"UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
	)
		.bind(conversationId)
		.run();
}

function createConversationTitle(message: string): string {
	const normalized = message.replace(/\s+/g, " ").trim();
	if (normalized.length <= 60) {
		return normalized || "New conversation";
	}

	return `${normalized.slice(0, 57)}...`;
}

function streamAssistantResponse(
	stream: ReadableStream<Uint8Array>,
	onComplete: (assistantMessage: string) => Promise<void>,
): ReadableStream<Uint8Array> {
	const decoder = new TextDecoder();
	let buffer = "";
	let assistantMessage = "";

	return stream.pipeThrough(
		new TransformStream<Uint8Array, Uint8Array>({
			transform(chunk, controller) {
				controller.enqueue(chunk);
				buffer += decoder.decode(chunk, { stream: true });
				const parsed = consumeSseEvents(buffer);
				buffer = parsed.buffer;
				for (const data of parsed.events) {
					assistantMessage += extractAssistantText(data);
				}
			},
			async flush() {
				buffer += decoder.decode();
				const parsed = consumeSseEvents(`${buffer}\n\n`);
				for (const data of parsed.events) {
					assistantMessage += extractAssistantText(data);
				}
				await onComplete(assistantMessage);
			},
		}),
	);
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

		const dataLines = rawEvent
			.split("\n")
			.filter((line) => line.startsWith("data:"))
			.map((line) => line.slice("data:".length).trimStart());

		if (dataLines.length > 0) {
			events.push(dataLines.join("\n"));
		}
	}

	return { events, buffer: normalized };
}

function extractAssistantText(data: string): string {
	if (data === "[DONE]") {
		return "";
	}

	try {
		const parsed = JSON.parse(data) as {
			response?: string;
			choices?: { delta?: { content?: string } }[];
		};
		if (typeof parsed.response === "string") {
			return parsed.response;
		}

		const deltaContent = parsed.choices?.[0]?.delta?.content;
		if (typeof deltaContent === "string") {
			return deltaContent;
		}
	} catch {
		return "";
	}

	return "";
}

function jsonResponse(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json" },
	});
}
