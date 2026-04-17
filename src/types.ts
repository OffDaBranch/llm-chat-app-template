/**
 * Type definitions for the Phase 1 personal AI MVP.
 */

export interface Env {
	/**
	 * Binding for the Workers AI API.
	 */
	AI: Ai;

	/**
	 * Binding for static assets.
	 */
	ASSETS: { fetch: (request: Request) => Promise<Response> };

	/**
	 * Primary application database.
	 */
	DB: D1Database;

	/**
	 * Raw file storage bucket.
	 */
	FILES: R2Bucket;

	/**
	 * Runtime environment name.
	 */
	APP_ENV: string;

	/**
	 * Default Workers AI model identifier.
	 */
	DEFAULT_MODEL: string;
}

export type ChatRole = "system" | "user" | "assistant";

export type ChatMode =
	| "general"
	| "founder"
	| "builder"
	| "research"
	| "personal_admin";

/**
 * Represents a chat message.
 */
export interface ChatMessage {
	role: ChatRole;
	content: string;
}

export interface Conversation {
	id: string;
	title: string;
	mode: ChatMode;
	created_at: string;
	updated_at: string;
}

export interface MessageRecord {
	id: string;
	conversation_id: string;
	role: ChatRole;
	content: string;
	citations_json: string | null;
	created_at: string;
}

export interface ProfileRecord {
	id: string;
	display_name: string | null;
	bio: string | null;
	preferences_json: string | null;
	pinned_facts_json: string | null;
	created_at: string;
	updated_at: string;
}

export interface MemoryItem {
	id: string;
	title: string;
	content: string;
	category: string | null;
	importance: number;
	source: string | null;
	created_at: string;
	updated_at: string;
}

export interface DocumentRecord {
	id: string;
	title: string;
	source_type: string;
	storage_key: string | null;
	raw_text: string | null;
	created_at: string;
}

export interface DocumentChunkRecord {
	id: string;
	document_id: string;
	chunk_index: number;
	content: string;
	token_estimate: number;
	created_at: string;
}

export interface Citation {
	type: "memory" | "document" | "profile";
	label: string;
	source_id: string;
}

export interface AskRequest {
	conversation_id: string;
	mode: ChatMode;
	message: string;
	stream?: boolean;
}

export interface AskResponse {
	conversation_id: string;
	message_id: string;
	answer: string;
	citations: Citation[];
}
