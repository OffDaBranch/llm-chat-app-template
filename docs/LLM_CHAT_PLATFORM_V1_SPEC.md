# LLM Chat Platform v1 Spec

## Objective

Convert the existing `llm-chat-app-template` repository from a starter chat demo into a durable, governed, knowledge-aware application that can operate first as a personal AI operating core and later as a licensable product.

## Product Positioning

This repository should no longer be treated as a generic chatbot template. It should become a structured application with:

- persistent conversations
- user profile and preferences
- editable memory
- document upload and retrieval
- source citations
- usage logging
- admin controls
- future-ready tenant boundaries

## Scope Rule

Build the smallest durable single-user slice first. Do not implement full multi-tenant billing or broad plugin ecosystems before the system has durable storage, retrieval, and governance.

## Core v1 Capabilities

### 1. Persistent chat
- create conversation
- list conversations
- read conversation with messages
- rename conversation
- archive or delete conversation
- persist assistant and user messages

### 2. Profile and preferences
- one profile record per user/workspace
- preferred model
- preferred response mode
- optional personal instructions

### 3. Memory layer
- create memory item
- list memory items
- pin/unpin memory item
- update memory item
- delete memory item
- selectively inject memory into prompts

### 4. Document knowledge
- upload document metadata
- store original file in object storage
- create document chunks
- retrieve relevant chunks for a prompt
- return citations with responses

### 5. Trust layer
- indicate whether answer used retrieved sources
- attach citations to response
- preserve mapping between answer and source chunks

### 6. Admin controls
- default model
- token limits
- upload limits
- retrieval on/off
- memory on/off
- response mode defaults

### 7. Usage governance
- log requests
- log model used
- log token usage if available
- log latency and errors

## Recommended Cloudflare Runtime Architecture

### Runtime
- Cloudflare Workers for API runtime
- Workers AI for model generation
- D1 for relational state
- R2 for file storage
- Vectorize later for scaled retrieval if needed
- KV only for short-lived cache or rate limiting

### Design rule
Keep one source of truth per layer:
- D1: structured operational data
- R2: original files
- Vector index: retrieval acceleration only, not source-of-truth metadata

## Minimum Data Model

### profile
- id
- display_name
- preferred_model
- preferred_response_mode
- personal_instructions
- created_at
- updated_at

### conversations
- id
- title
- status (`active`, `archived`, `deleted` soft state if preferred)
- created_at
- updated_at

### messages
- id
- conversation_id
- role (`system`, `user`, `assistant`, `tool`)
- content
- model
- prompt_tokens
- completion_tokens
- total_tokens
- latency_ms
- created_at

### memory_items
- id
- content
- category
- priority
- pinned
- active
- created_at
- updated_at

### documents
- id
- filename
- media_type
- size_bytes
- storage_key
- processing_status
- created_at
- updated_at

### document_chunks
- id
- document_id
- chunk_index
- content
- token_count
- embedding_ref nullable
- created_at

### citations
- id
- message_id
- document_id
- document_chunk_id
- snippet
- start_offset nullable
- end_offset nullable
- created_at

### usage_events
- id
- event_type
- model
- prompt_tokens
- completion_tokens
- total_tokens
- latency_ms
- status
- error_message nullable
- created_at

### app_settings
- id
- default_model
- retrieval_enabled
- memory_enabled
- max_upload_bytes
- max_output_tokens
- updated_at

## API Contract Direction

The exact framework structure may vary, but the repository should expose clear route groups.

### Chat routes
- `GET /api/conversations`
- `POST /api/conversations`
- `GET /api/conversations/:id`
- `PATCH /api/conversations/:id`
- `DELETE /api/conversations/:id`
- `POST /api/conversations/:id/messages`

### Memory routes
- `GET /api/memory`
- `POST /api/memory`
- `PATCH /api/memory/:id`
- `DELETE /api/memory/:id`

### Document routes
- `GET /api/documents`
- `POST /api/documents`
- `GET /api/documents/:id`
- `DELETE /api/documents/:id`
- `POST /api/documents/:id/process`

### Settings routes
- `GET /api/settings`
- `PATCH /api/settings`

### Usage routes
- `GET /api/usage`

## Response Contract Direction

### Chat response shape
```json
{
  "ok": true,
  "conversation": {
    "id": "...",
    "title": "..."
  },
  "message": {
    "id": "...",
    "role": "assistant",
    "content": "...",
    "model": "..."
  },
  "citations": [
    {
      "document_id": "...",
      "document_name": "...",
      "chunk_id": "...",
      "snippet": "..."
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0,
    "total_tokens": 0,
    "latency_ms": 0
  }
}
```

### Rule
Return stable, minimal, typed response objects. Do not leak raw provider payloads directly to the client.

## UI Surface

### Required screens
- chat workspace
- conversation sidebar
- memory manager
- document manager
- settings panel

### Chat workspace requirements
- message list
- input box
- citation display
- response mode selector
- loading/error states

### Conversation sidebar requirements
- new conversation
- rename
- archive
- delete
- list recency ordering

### Memory manager requirements
- create memory
- edit memory
- pin/unpin
- activate/deactivate

### Document manager requirements
- upload
- list documents
- processing status
- delete document

### Settings panel requirements
- default model
- retrieval toggle
- memory toggle
- token/output limits

## Prompt Construction Rules

When generating an answer:
1. load profile instructions if present
2. load relevant memory items if enabled
3. retrieve relevant document chunks if retrieval enabled
4. construct a bounded prompt with explicit sections
5. log usage and citations

### Prompt sections
- system instructions
- profile instructions
- memory context
- retrieved context
- conversation history window
- current user message

## Non-Goals for v1

Do not prioritize these before the core is durable:
- team collaboration
- marketplace/plugin framework
- advanced agent orchestration
- multi-tenant billing
- public sharing/social layers
- broad model provider matrix

## Acceptance Criteria

### Phase 1 acceptance
- conversations persist across sessions
- messages save and reload correctly
- profile persists
- memory CRUD works
- usage events are written

### Phase 2 acceptance
- document metadata persists
- files store in object storage
- chunks are generated
- chat answers can include citations

### Phase 3 acceptance
- settings persist
- retrieval and memory can be toggled on/off
- stable response contracts are enforced

## Repository Governance

### Required docs to maintain
- this spec
- implementation backlog/issues
- schema migration history
- environment variable reference

### Engineering rules
- smallest functional slice first
- no raw provider payloads to UI
- avoid duplicate sources of truth
- every user-facing feature maps to stored state where applicable
- every material feature has a validation path

## Immediate Execution Order

1. establish durable schema
2. wire persistent conversation APIs
3. add profile and memory APIs
4. add document registry and file upload flow
5. add chunking and retrieval
6. add citations to responses
7. add settings and usage dashboard endpoints

## Long-Term Value

If implemented correctly, this repository becomes:
- a personal AI operating core
- a reusable internal assistant foundation
- a future white-label/licensable product shell
- a controlled knowledge asset rather than a disposable demo
