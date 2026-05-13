# Handoff Template

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Required Handoff
Every Codex task must end with a handoff. The handoff is the operating record that lets another department, reviewer, or future Codex session continue without guessing.

```text
Task completed:
Primary agency:
Task type:
Departments involved:
Role cards used:
Role competency check:
Knowledge sources inspected:
Files changed:
Validation performed:
Risks found:
Reviewer decision:
Source-of-truth updates:
Founder approval needed:
Executive Review Board decision:
Next executable prompt:
```

## Expanded Handoff Table
| Field | Required Detail | Owner |
|---|---|---|
| Task completed | concise description of completed work | Primary Agency Owner |
| Primary agency | one agency accountable for the work | Primary Agency Owner |
| Task type | mapped task type from TASK_ROUTING_MATRIX.md | Department Lead |
| Departments involved | only departments materially involved | Department Lead |
| Role cards used | role card names and why each was used | Department Lead |
| Role competency check | mission, scope, knowledge, skills, allowed/blocked work, inputs, outputs, validation, reviewer, escalation, source-of-truth gate | Reviewer |
| Knowledge sources inspected | files, docs, systems, or external sources actually inspected | Specialist / Builder |
| Files changed | exact files changed; say none if none | Specialist / Builder |
| Validation performed | commands, checks, refetches, reviews, or documented validation limits | QA / Validation Owner |
| Risks found | legal, tax, finance, privacy, security, IP, brand, entity, production, public claim, regulated vertical, or scope risks | Risk / Compliance Owner |
| Reviewer decision | reviewer role and decision | Required Reviewer |
| Source-of-truth updates | system, record, owner, reason, priority | Source-of-Truth Owner |
| Founder approval needed | yes/no and why | Founder Decision Gate when required |
| ERB decision | APPROVE, REVISE, BLOCK, or ESCALATE | Executive Review Board Chair |
| Next executable prompt | specific next task prompt | Handoff Owner |

## Handoff Rules
- Do not say validation passed unless evidence is stated.
- Do not say no risk exists; say no material risk identified and name the reviewed risk categories.
- Do not route work by title alone; include the role competency check.
- Do not include private credentials, secrets, tokens, tax IDs, bank credentials, or private keys.
