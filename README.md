# Personal AI MVP

## Objective

Use this repository as the Cloudflare-based MVP lane for a personal AI system that can evolve beyond a generic chat demo.

This repo is no longer being treated as a stock template reference. It is now the working lane for a personal AI application with owned memory, document ingestion, retrieval, and user-facing conversation flows.

## Current Role

This repository is the experimental product lane for a personal AI assistant built on Cloudflare.

It is intended to grow into a system that can support:

- persistent conversations
- personal profile and preference memory
- document storage and chunking
- retrieval-ready knowledge layers
- future citation-aware UI flows
- upload and knowledge ingestion surfaces

## Current MVP Foundations

The current repo already includes early Phase 1 structure for:

- D1-backed conversations
- D1-backed messages
- profile records
- memory items
- document records
- document chunks
- typed request and response contracts
- Cloudflare bindings for AI, D1, R2, and runtime variables

## Boundary Rules

- Treat this repo as the personal AI product lane, not as a generic starter template.
- Do not let it drift into the main BranchOps internal control plane unless code is intentionally promoted.
- Do not treat old template wording as authoritative anymore.
- Keep product-purpose documentation current as the repo evolves.

## Near-Term Priorities

1. stabilize branch strategy
2. audit feature branches for valid shared history
3. restore one clear development path
4. implement conversation restore
5. implement document ingestion and retrieval
6. implement citation-aware UI and upload flow

## Promotion Decision

This repo is currently being treated as a promoted MVP lane rather than an archive candidate.

That promotion is provisional until branch cleanup is complete. If the branch graph proves too messy to maintain cleanly, the retained code should be moved into a fresh long-term repo and this repository should be archived.

## Next Governance Step

After branch cleanup, confirm one of these two paths explicitly:

- continue this repo as the long-term personal AI lane, or
- extract the retained code into a clean successor repo and archive this one
