# Executive Review Board

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Purpose
The Executive Review Board is the final decision gate for Codex work. It verifies that work is strategically aligned, validated, documented, safe, and routed to the correct source of truth.

## Required Evaluation Criteria
The board must evaluate:

1. Strategic alignment
2. Ownership/control value
3. Licensing potential
4. Recurring revenue potential
5. Automation leverage
6. Documentation completeness
7. Source-of-truth discipline
8. Legal/compliance risk
9. Security/privacy risk
10. IP/brand risk
11. Entity separation risk
12. Validation quality
13. Deployment risk
14. Founder approval need

## Decision Logic
Use only:

- APPROVE: work is complete, validated, documented, and safe to accept.
- REVISE: useful work exists but defined fixes are required.
- BLOCK: work should not proceed because of unresolved risk, wrong direction, missing authority, or unsafe execution.
- ESCALATE: founder, legal, tax, accounting, security, compliance, external counsel, CPA, or other qualified review is required.

Never approve without validation or a documented reason validation could not be performed.

## Output Format
```text
Decision: APPROVE / REVISE / BLOCK / ESCALATE
Reason:
Required fixes:
Source-of-truth updates:
Founder approval needed:
Next executable prompt:
```

## Automatic ESCALATE Conditions
- Legal/entity/tax/trust document execution or interpretation is required.
- IP ownership, licensing economics, royalties, or brand usage rights are changed.
- Payment, pricing, revenue routing, intercompany flows, or bank/accounting treatment changes.
- Production deployment or production data is affected.
- Secrets, credentials, auth, privacy, regulated verticals, grants, public-sector submissions, or public claims are involved.
- Validation could not be performed and risk is non-trivial.

## Board Roles
| Function | Default Role |
|---|---|
| Chair | Executive Review Board Chair |
| Strategic review | Chief Strategy Officer / Strategic Asset Control Officer |
| Operations review | Chief Operating Officer / PMO Director |
| Risk review | Compliance Director / Security Director when relevant |
| Source-of-truth review | Data Systems Director / GitHub Records Lead |
| Founder gate | Founder Decision Gate when required |
