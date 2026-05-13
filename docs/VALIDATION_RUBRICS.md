# Validation Rubrics

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Universal Validation Rule
Never approve work without validation or a documented reason validation could not be performed. Validation must match the task risk.

| Work Type | Minimum Evidence Required | Required Reviewer | PASS | REVISE | BLOCK | ESCALATE |
|---|---|---|---|---|---|---|
| Documentation-only work | changed files listed, requested sections present, links/references coherent, no app code touched | Documentation Reviewer / GitHub Records Lead | complete, scoped, internally consistent | missing section, stale reference, formatting issue | contradicts controlling source | legal/financial/security claims need review |
| Code changes | diff review, relevant tests/build/typecheck/lint or documented limits | Code Review Lead / QA Director | tests pass and scope matches request | minor test/docs gaps | app broken, unsafe code, unrelated changes | auth, payment, production, privacy risk |
| Database changes | migration/schema diff, rollback/backup note, query compatibility check | D1 Database Engineer / Data Quality Analyst | schema validated and rollback path stated | missing migration note | destructive change without plan | production data or privacy risk |
| Deployment changes | config diff, environment target, rollback plan, preview/smoke evidence | Deployment Security Reviewer / Release Manager | safe target and rollback stated | incomplete deploy notes | production deploy without review | secrets, auth, data, outage risk |
| Legal/governance docs | source authority cited, draft/final status, required disclaimers, reviewer queue | Legal Operations Lead / Governance Documentation Reviewer | clearly draft or approved under authority | missing authority marker | final/executed status falsely applied | attorney/founder review needed |
| Finance/intercompany docs | ledger/routing logic, amounts marked draft/verified, reviewer notes | Treasury Risk Reviewer / CPA Handoff Coordinator | documented assumptions and review path | missing amount/source | unsupported tax/payment direction | CPA/founder review needed |
| Public website/content changes | content diff, privacy/brand check, claims review, accessibility/basic QA | Website QA Reviewer / Brand Usage Reviewer | accurate, non-sensitive, usable | copy/SEO/privacy gap | misleading or regulated claim | legal/compliance/founder review |
| Privacy/security changes | threat/risk notes, secret scan posture, auth/data path review | Security Director / Privacy Lead | no secret/privacy regression | incomplete threat note | exposed secret or unsafe auth | incident or production data risk |
| AI/memory/data features | prompt/data boundary review, eval/smoke test, retention/source notes | AI Safety Reviewer / Data Quality Analyst | bounded, evaluated, source-aware | weak eval | unsafe memory/data leakage | privacy/security/legal risk |
| Game features | playtest/smoke, asset/license check, economy/IP review when relevant | QA Playtest Lead / IP Brand Integration Reviewer | playable and licensed | tuning/UX gaps | broken build or unlicensed asset | monetization/IP risk |
| Mobile features | build or targeted validation, privacy/signing review if relevant | Mobile Engineer Reviewer / QA Director | validates on target or documented limit | device coverage gap | broken critical flow | privacy/signing/release risk |
| Curriculum/grant/public-sector work | source eligibility, rubric/checklist, compliance review, submission readiness | Compliance Reviewer / Grants Director | accurate and submission-ready or clearly draft | missing evidence | unsupported eligibility/claim | founder/legal/compliance review |

## Required Validation Output
```text
Validation performed:
- Evidence:
- Commands/checks:
- Reviewer:
- Result:
- Validation limits:
Decision impact: APPROVE / REVISE / BLOCK / ESCALATE
```
