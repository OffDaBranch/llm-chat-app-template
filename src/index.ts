/**
 * Phase 5: retrieval-enabled chat + knowledge ingestion.
 */

import { Env, ChatMessage, ChatMode, Citation } from "./types";

type ChatApiRequest = {
	conversation_id?: string;
	mode?: ChatMode;
	message?: string;
	messages?: ChatMessage[];
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

type DbDocumentRow = {
	id: string;
	title: string;
	source_type: string;
	storage_key: string | null;
	raw_text: string | null;
	created_at: string;
};

type DbDocumentChunkRow = {
	id: string;
	document_id: string;
	chunk_index: number;
	content: string;
	token_estimate: number;
	created_at: string;
};

type RetrievedChunk = {
	chunk_id: string;
	document_id: string;
	document_title: string;
	chunk_index: number;
	content: string;
	token_estimate: number;
	score: number;
};

const SYSTEM_PROMPT =
	"You are a helpful, friendly assistant. Use any provided reference material when relevant. If the reference material is relevant to the user question, prefer it over guessing. If no reference material is relevant, answer normally and do not pretend you used sources you did not use.";

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

		// Static frontend
		if (url.pathname === "/" || !url.pathname.startsWith("/api/")) {
			return env.ASSETS.fetch(request);
		}

		// Chat API
		if (url.pathname === "/api/chat" && request.method === "POST") {
			return handleChatRequest(request, env, ctx);
		}

		// Conversation routes
		if (url.pathname === "/api/conversations" && request.method === "POST") {
			return handleCreateConversation(request, env);
		}

		const conversationMessagesMatch = url.pathname.match(
			/^\/api\/conversations\/([^/]+)\/messages$/,
		);
		if (conversationMessagesMatch && request.method === "GET") {
			return handleGetConversationMessages(conversationMessagesMatch[1], env);
		}

		// Document routes
		if (url.pathname === "/api/documents/upload" && request.method === "POST") {
			return handleUploadDocument(request, env);
		}

		if (url.pathname === "/api/documents" && request.method === "GET") {
			return handleListDocuments(env);
		}

		const documentChunksMatch = url.pathname.match(
			/^\/api\/documents\/([^/]+)\/chunks$/,
		);
		if (documentChunksMatch && request.method === "GET") {
			return handleGetDocumentChunks(documentChunksMatch[1], env);
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
		const retrievedChunks = await findRelevantChunks(env, incomingMessage, 3);
		const referenceMessage = buildReferenceSystemMessage(retrievedChunks);

		const aiMessages: ChatMessage[] = [
			{ role: "system", content: SYSTEM_PROMPT },
			...(referenceMessage ? [referenceMessage] : []),
			...history.map((msg) => ({
				role: msg.role,
				content: msg.content,
			})),
		];

		const citations: Citation[] = retrievedChunks.map((chunk) => ({
			type: "document",
			label: `${chunk.document_title} [chunk ${chunk.chunk_index}]`,
			source_id: chunk.chunk_id,
		}));

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
				citations,
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

async function handleUploadDocument(
	request: Request,
	env: Env,
): Promise<Response> {
	try {
		const formData = await request.formData();
		const fileValue = formData.get("file");

		if (!(fileValue instanceof File)) {
			return jsonResponse({ error: "A file field named 'file' is required" }, 400);
		}

		const rawText = (await fileValue.text()).trim();

		if (!rawText) {
			return jsonResponse({ error: "Uploaded file is empty" }, 400);
		}

		const documentId = crypto.randomUUID();
		const safeFilename = sanitizeFilename(fileValue.name || "upload.txt");
		const storageKey = `documents/${documentId}/${safeFilename}`;
		const title = fileValue.name?.trim() || "Uploaded document";

		await env.FILES.put(storageKey, fileValue);

		await env.DB.prepare(
			`INSERT INTO documents (id, title, source_type, storage_key, raw_text)
       VALUES (?, ?, ?, ?, ?)`,
		)
			.bind(documentId, title, "upload_text", storageKey, rawText)
			.run();

		const chunks = chunkText(rawText, 1200, 150);

		for (let i = 0; i < chunks.length; i += 1) {
			const chunkId = crypto.randomUUID();
			const chunk = chunks[i];

			await env.DB.prepare(
				`INSERT INTO document_chunks (id, document_id, chunk_index, content, token_estimate)
         VALUES (?, ?, ?, ?, ?)`,
			)
				.bind(chunkId, documentId, i, chunk, estimateTokens(chunk))
				.run();
		}

		return jsonResponse(
			{
				ok: true,
				document: {
					id: documentId,
					title,
					source_type: "upload_text",
					storage_key: storageKey,
					chunk_count: chunks.length,
				},
			},
			201,
		);
	} catch (error) {
		console.error("Error uploading document:", error);
		return jsonResponse({ error: "Failed to upload document" }, 500);
	}
}

async function handleListDocuments(env: Env): Promise<Response> {
	try {
		const result = await env.DB.prepare(
			`SELECT id, title, source_type, storage_key, raw_text, created_at
       FROM documents
       ORDER BY created_at DESC`,
		).all<DbDocumentRow>();

		return jsonResponse(
			{
				documents: result.results ?? [],
			},
			200,
		);
	} catch (error) {
		console.error("Error listing documents:", error);
		return jsonResponse({ error: "Failed to list documents" }, 500);
	}
}

async function handleGetDocumentChunks(
	documentId: string,
	env: Env,
): Promise<Response> {
	try {
		const doc = await env.DB.prepare(
			`SELECT id, title, source_type, storage_key, raw_text, created_at
       FROM documents
       WHERE id = ?
       LIMIT 1`,
		)
			.bind(documentId)
			.first<DbDocumentRow>();

		if (!doc) {
			return jsonResponse({ error: "Document not found" }, 404);
		}

		const result = await env.DB.prepare(
			`SELECT id, document_id, chunk_index, content, token_estimate, created_at
       FROM document_chunks
       WHERE document_id = ?
       ORDER BY chunk_index ASC`,
		)
			.bind(documentId)
			.all<DbDocumentChunkRow>();

		return jsonResponse(
			{
				document: doc,
				chunks: result.results ?? [],
			},
			200,
		);
	} catch (error) {
		console.error("Error loading document chunks:", error);
		return jsonResponse({ error: "Failed to load document chunks" }, 500);
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

async function findRelevantChunks(
	env: Env,
	query: string,
	limit = 3,
): Promise<RetrievedChunk[]> {
	const searchTerms = extractSearchTerms(query);

	if (searchTerms.length === 0) {
		return [];
	}

	const result = await env.DB.prepare(
		`SELECT
        dc.id AS chunk_id,
        dc.document_id AS document_id,
        d.title AS document_title,
        dc.chunk_index AS chunk_index,
        dc.content AS content,
        dc.token_estimate AS token_estimate
      FROM document_chunks dc
      INNER JOIN documents d ON d.id = dc.document_id
      ORDER BY d.created_at DESC, dc.chunk_index ASC`,
	).all<{
		chunk_id: string;
		document_id: string;
		document_title: string;
		chunk_index: number;
		content: string;
		token_estimate: number;
	}>();

	const rows = (result.results ?? []) as Array<{
		chunk_id: string;
		document_id: string;
		document_title: string;
		chunk_index: number;
		content: string;
		token_estimate: number;
	}>;

	const scored = rows
		.map((row) => ({
			...row,
			score: scoreChunk(row.content, searchTerms, query),
		}))
		.filter((row) => row.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);

	return scored;
}

function buildReferenceSystemMessage(
	chunks: RetrievedChunk[],
): ChatMessage | null {
	if (chunks.length === 0) {
		return null;
	}

	const parts = chunks.map(
		(chunk, index) =>
			`[Reference ${index + 1}] ${chunk.document_title} (chunk ${chunk.chunk_index})\n${chunk.content}`,
	);

	return {
		role: "system",
		content:
			"Reference material from uploaded documents is below. Use it when relevant to the user's request. If it is not relevant, ignore it.\n\n" +
			parts.join("\n\n"),
	};
}

function extractSearchTerms(query: string): string[] {
	const stopWords = new Set([
		"the",
		"and",
		"for",
		"with",
		"that",
		"this",
		"what",
		"when",
		"where",
		"which",
		"about",
		"your",
		"from",
		"have",
		"into",
		"will",
		"would",
		"should",
		"could",
		"them",
		"they",
		"then",
		"than",
		"were",
		"been",
		"being",
		"also",
		"just",
		"like",
		"want",
		"need",
		"help",
	]);

	return Array.from(
		new Set(
			query
				.toLowerCase()
				.replace(/[^a-z0-9\s]/g, " ")
				.split(/\s+/)
				.map((term) => term.trim())
				.filter((term) => term.length >= 3 && !stopWords.has(term)),
		),
	);
}

function scoreChunk(
	content: string,
	searchTerms: string[],
	fullQuery: string,
): number {
	const normalizedContent = normalizeText(content);
	const normalizedQuery = normalizeText(fullQuery);
	let score = 0;

	if (normalizedQuery.length >= 6 && normalizedContent.includes(normalizedQuery)) {
		score += 8;
	}

	for (const term of searchTerms) {
		if (normalizedContent.includes(term)) {
			score += 3;
		}
	}

	return score;
}

function normalizeText(input: string): string {
	return input.toLowerCase().replace(/\s+/g, " ").trim();
}

async function pipeAiStreamAndPersist(args: {
	env: Env;
	conversationId: string;
	aiStream: ReadableStream<Uint8Array>;
	writable: WritableStream<Uint8Array>;
	citations: Citation[];
}): Promise<void> {
	const { env, conversationId, aiStream, writable, citations } = args;

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
					JSON.stringify(citations),
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

function chunkText(text: string, chunkSize = 1200, overlap = 150): string[] {
	const normalized = text.replace(/\r/g, "").trim();
	if (!normalized) return [];

	const chunks: string[] = [];
	let start = 0;

	while (start < normalized.length) {
		const end = Math.min(start + chunkSize, normalized.length);
		const chunk = normalized.slice(start, end).trim();

		if (chunk) {
			chunks.push(chunk);
		}

		if (end >= normalized.length) {
			break;
		}

		start = Math.max(end - overlap, 0);
	}

	return chunks;
}

function estimateTokens(text: string): number {
	return Math.ceil(text.length / 4);
}

function sanitizeFilename(filename: string): string {
	return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
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
	if (!trimmed) return "Untitled";
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