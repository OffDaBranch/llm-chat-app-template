# Source Of Truth Rules

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Purpose
Codex must identify the authoritative system for every durable output. A task is incomplete until the final response states whether updates are needed in each connected system and names the owner role for each needed update.

## Required Final Source-Of-Truth Check
Every final Codex output must include a source-of-truth table covering:

| System | Update Needed? | Record / Page / File / Issue | Owner Role | Reason | Priority |
|---|---|---|---|---|---|
| Airtable | yes/no | registry, CRM record, asset record, task, pipeline item | Data Systems Director / Airtable Systems Lead | structured status and reporting | P0-P3 |
| Notion | yes/no | SOP, policy, brief, operating page, meeting note | Notion Systems Lead | human-readable documentation | P0-P3 |
| GitHub | yes/no | repo file, issue, PR, release note, project item | GitHub Records Lead | versioned technical or governance source | P0-P3 |
| Cloudflare | yes/no | Worker, Pages, D1, R2, KV, Queue, DNS, logs | Cloudflare Handoff Owner | runtime or infrastructure control | P0-P3 |
| Stripe | yes/no | product, price, payment link, invoice, subscription | Finance Handoff Owner | billing and revenue system | P0-P3 |
| Mailchimp | yes/no | audience, campaign, segment, automation | Marketing Handoff Owner | email/customer communications | P0-P3 |
| Shopify/Printify | yes/no | product, SKU, fulfillment workflow | Apparel Handoff Owner | merchandise and physical product control | P0-P3 |
| Domain registrar / Cloudflare DNS | yes/no | domain record, DNS route, registrar note | Digital Asset Handoff Owner | domain and routing control | P0-P3 |
| Calendar/tasks | yes/no | follow-up, deadline, review, renewal | PMO Handoff Owner | operating cadence | P0-P3 |
| Other connected systems | yes/no | named system and object | relevant department handoff owner | system-specific record | P0-P3 |

## Priority Definitions
- P0: blocking legal, security, payment, production, or founder decision update.
- P1: required before the asset is used by another team or system.
- P2: should be completed in the normal operating cadence.
- P3: optional cleanup, backlog, or informational update.

## Authority Order
1. Executed legal/state records and signed governing documents.
2. Signed agreements, consents, contracts, and approved board/founder decisions.
3. GitHub master operating files and repo-specific AGENTS.md instructions.
4. Airtable structured registries and CRM records.
5. Notion readable SOPs, policies, and operating pages.
6. Cloudflare, Stripe, Mailchimp, Shopify/Printify, registrar, and other runtime/account systems.
7. Drafts, generated text, and chat context.

## Required Owner Behavior
The Source-of-Truth Owner must verify that the proposed update belongs in the named system, identify the exact record/page/file/issue, and state whether Codex can perform the update or whether a human/operator must do it.

## Blocked Behavior
- Do not invent source-of-truth records.
- Do not mark a system update complete unless Codex actually made it or the user confirms it.
- Do not place secrets, tax IDs, bank credentials, wallet private keys, OAuth credentials, or production credentials in any source-of-truth system.
- Do not treat chat context as controlling authority when an executed record or master repo file exists.
