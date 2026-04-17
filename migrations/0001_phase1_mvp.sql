PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS profile (
	id TEXT PRIMARY KEY,
	display_name TEXT,
	bio TEXT,
	preferences_json TEXT,
	pinned_facts_json TEXT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversations (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	mode TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
	id TEXT PRIMARY KEY,
	conversation_id TEXT NOT NULL,
	role TEXT NOT NULL,
	content TEXT NOT NULL,
	citations_json TEXT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS memory_items (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	content TEXT NOT NULL,
	category TEXT,
	importance INTEGER NOT NULL DEFAULT 3,
	source TEXT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documents (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	source_type TEXT NOT NULL,
	storage_key TEXT,
	raw_text TEXT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS document_chunks (
	id TEXT PRIMARY KEY,
	document_id TEXT NOT NULL,
	chunk_index INTEGER NOT NULL,
	content TEXT NOT NULL,
	token_estimate INTEGER NOT NULL DEFAULT 0,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_conversations_updated_at
ON conversations(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_created_at
ON messages(conversation_id, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_memory_items_updated_at
ON memory_items(updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_documents_created_at
ON documents(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_document_chunks_document_index
ON document_chunks(document_id, chunk_index ASC);

INSERT OR IGNORE INTO profile (
	id,
	display_name,
	bio,
	preferences_json,
	pinned_facts_json
) VALUES (
	'primary',
	NULL,
	NULL,
	'{}',
	'[]'
);
