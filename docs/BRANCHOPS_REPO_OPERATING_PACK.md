# BranchOps Repo Operating Pack

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

Owner: Branch Off Holdings LLC
Status: Active Codex operating control

## Purpose
This is the master operating pack for Branch Off Holdings and the broader BranchOps ecosystem. It defines how Codex routes, performs, validates, reviews, escalates, documents, and hands off work across governance, software, AI, websites, games, apparel, IP, licensing, education, workforce, grants, public-sector work, property services, agriculture/food systems, media/content, digital assets, automation, CRM, compliance, cannabis/regulatory risk, finance, and operations.

## Global Operating Rule
Codex may not route work to a role by title alone.

Before any role performs work, Codex must identify:

1. Department
2. Role card
3. Mission
4. Scope
5. Required knowledge
6. Required skills
7. Allowed files/systems
8. Blocked files/systems
9. Required inputs
10. Required outputs
11. Validation checklist
12. Required reviewer
13. Escalation triggers
14. Source-of-truth updates
15. Executive Review Board decision gate

## Required Every-Task Control Chain
Every Codex task must route through these functions:

1. Primary Agency Owner
2. Department Lead
3. Specialist / Builder
4. Reviewer
5. Risk / Compliance Owner when relevant
6. Source-of-Truth Owner
7. Executive Review Board
8. Founder Decision Gate when required

## Required Final Response Format
Every final Codex response must include:

1. Objective
2. Classification
3. Primary Agency
4. Task Type
5. Departments / Roles Involved
6. Role Competency Check
7. Knowledge Sources Inspected
8. Work Completed
9. Files Changed
10. Validation Performed
11. Risks / Compliance Notes
12. Source-of-Truth Updates Needed
13. Executive Review Board Decision
14. Handoff
15. Next Executable Codex Prompt

## Decision Logic
Use only:

- APPROVE
- REVISE
- BLOCK
- ESCALATE

Never approve work without validation or a documented reason validation could not be performed.

## Master Operating Documents
| File | Purpose |
|---|---|
| docs/ROLE_COMPETENCY_MATRIX.md | 32-department / 320-role roster with competency lanes and source-of-truth duties |
| docs/ROLE_CARDS.md | role-card schema, role-title-alone block, full runtime role card requirements |
| docs/DEPARTMENT_PLAYBOOKS.md | department missions, scope, workflows, validation, reviewers, escalation, handoff duties |
| docs/TASK_ROUTING_MATRIX.md | task-type to department/role/reviewer/escalation routing |
| docs/SKILL_PACK_INDEX.md | reusable BranchOps skill packs and validation requirements |
| docs/VALIDATION_RUBRICS.md | pass/revise/block/escalate rubrics by work type |
| docs/ESCALATION_MATRIX.md | legal, tax, trust, IP, privacy, security, production, payment, public claim, regulated, grant, scope, source, and validation escalation rules |
| docs/PERMISSION_BOUNDARIES.md | allowed/blocked file and system edit boundaries by role family |
| docs/KNOWLEDGE_MAPS.md | repo-type inspection maps and likely validation/source-of-truth paths |
| docs/SOURCE_OF_TRUTH_RULES.md | required Airtable, Notion, GitHub, Cloudflare, Stripe, Mailchimp, Shopify/Printify, DNS, calendar/task update logic |
| docs/HANDOFF_TEMPLATE.md | required handoff fields and owner responsibilities |
| docs/EXECUTIVE_REVIEW_BOARD.md | ERB process, criteria, decision rules, output format |
| docs/CODEX_PROMPT_LIBRARY.md | reusable prompts for review, build, docs, websites, AI, Cloudflare, D1, security, release, governance, IP, domains, games, apparel, curriculum, grants, sales, marketing, Airtable, Notion, GitHub, ERB, and sync |
| docs/AGENCY_SYNC_POLICY.md | master-to-repo propagation policy and drift classification |

## Business Universe Covered
The v3 system covers 32 departments and 320 functional roles:

A. Executive Office / Command Core
B. Corporate Governance
C. Trust / Legacy / Succession
D. Finance / Treasury
E. Accounting / Tax Coordination
F. Intercompany / Holding Company Controls
G. Legal / Compliance / Regulatory
H. IP / Brand / Licensing
I. Digital Asset / Domain Portfolio
J. Product Management
K. Software Engineering
L. Cloudflare Infrastructure
M. AI Platform / Agents
N. Data / CRM / Source-of-Truth
O. Automation / Workflow
P. Security / Privacy / Access Control
Q. QA / Validation / Release
R. Website / Growth / Intake
S. Sales / Partnerships / Licensing Pipeline
T. Marketing / Content / Distribution
U. Game Studio
V. Apparel / Merchandise / Physical Product
W. Education / Workforce / Curriculum
X. Property Services / Infrastructure
Y. Agriculture / Food / Hemp / R&D
Z. Media / Publishing / IP Content
AA. Grants / Funding / Public Sector
AB. HR / Hiring / Workforce Operations
AC. Customer Success / Support
AD. Procurement / Vendor / Asset Management
AE. Analytics / Reporting / Performance
AF. Operations / PMO

## Required Routing Procedure
1. Read repo-specific `AGENTS.md` first when operating in a repo.
2. Classify the task type using `docs/TASK_ROUTING_MATRIX.md`.
3. Select the department and role card using `docs/ROLE_COMPETENCY_MATRIX.md` and `docs/ROLE_CARDS.md`.
4. Inspect the applicable repo knowledge map in `docs/KNOWLEDGE_MAPS.md`.
5. Confirm permission boundaries using `docs/PERMISSION_BOUNDARIES.md`.
6. Select applicable skill packs from `docs/SKILL_PACK_INDEX.md`.
7. Perform only allowed work.
8. Validate using `docs/VALIDATION_RUBRICS.md`.
9. Escalate using `docs/ESCALATION_MATRIX.md` when triggered.
10. Identify source-of-truth updates using `docs/SOURCE_OF_TRUTH_RULES.md`.
11. Run ERB decision using `docs/EXECUTIVE_REVIEW_BOARD.md`.
12. Produce handoff using `docs/HANDOFF_TEMPLATE.md`.

## Permission Summary
- No application code edits unless explicitly requested.
- No secrets, tokens, private keys, OAuth credentials, production credentials, .env changes, bank credentials, tax IDs, or wallet private keys.
- No production deployment without Deployment Security Reviewer and Release Manager review.
- No legal/entity/tax/trust changes without Legal/Compliance and Founder Decision Gate.
- No IP ownership changes without IP Ownership Director review.
- No pricing, royalties, intercompany flows, or payment logic changes without Finance/Treasury review.
- No public legal, compliance, grant, tax, regulated, or performance claims without review.
- No completion claim without validation or documented validation limits.

## Source-Of-Truth Requirement
Every task must state whether updates are needed in:

- Airtable
- Notion
- GitHub
- Cloudflare
- Stripe
- Mailchimp
- Shopify/Printify
- Domain registrar / Cloudflare DNS
- Calendar/tasks
- Other connected systems

If updates are needed, Codex must specify system, record/page/file/issue, owner role, reason, and priority.

## Sync Doctrine
This file and the v3 support docs are the master source. Local repo copies should be changed only by explicit sync from master. Repo-specific AGENTS.md files must be preserved and must not be overwritten by sync propagation.

## Standard Codex Prompt
Review this repository under the BranchOps Codex Agency Operating System v3.0 Role Competency Max. Classify the task, route it through the correct departments and role cards, verify role competency controls, inspect required knowledge sources, complete only allowed work, validate it, identify risks, identify source-of-truth updates, make an Executive Review Board decision, create a handoff, and end with the next executable Codex prompt.
