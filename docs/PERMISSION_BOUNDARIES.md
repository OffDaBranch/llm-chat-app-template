# Permission Boundaries

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Universal Blocked Actions
- No role may edit secrets, tokens, .env files, private keys, OAuth credentials, production credentials, wallet keys, tax IDs, bank credentials, or live customer private data.
- No role may deploy production without Deployment Security Reviewer and Release Manager review.
- No role may change legal/entity/tax/trust documents without Legal/Compliance review and Founder Decision Gate.
- No role may alter IP ownership records without IP Ownership Director review.
- No role may change pricing, royalties, intercompany flows, payment routing, or payment logic without Finance/Treasury review.
- No role may make public claims, compliance claims, grant submissions, legal claims, or tax claims without required review.
- No role may mark work complete without validation or documented validation limits.

## File/System Boundaries
| Area | Roles That May Edit | Required Reviewer | Blocked Without Review |
|---|---|---|---|
| Application code | Software Engineering, Cloudflare Infrastructure, AI Platform, Game Studio, Mobile Engineer where relevant | Code Review Lead, QA Director, Security when auth/data involved | production credentials, unrelated refactors, unsafe dependency changes |
| Legal/governance docs | Corporate Governance, Legal/Compliance, Trust/Legacy | Legal Operations Lead, Governance Documentation Reviewer, Founder Decision Gate for binding docs | execution-ready legal/tax/trust docs without professional review |
| Financial docs | Finance/Treasury, Accounting/Tax, Intercompany Controls | Treasury Risk Reviewer, CPA Handoff Coordinator, Founder Decision Gate when material | bank/tax IDs, payment routing, final tax advice |
| Source-of-truth records | Data/CRM/Source-of-Truth, owning department handoff owner | Source-of-Truth Reviewer | invented records, unverified status changes |
| Public website content | Website/Growth/Intake, Marketing/Content, Sales/Partnerships | Privacy Reviewer, Brand Usage Reviewer, Compliance when claims exist | legal/compliance claims, regulated claims, misleading claims |
| Brand/IP docs | IP/Brand/Licensing, Media/Publishing, Apparel, Game Studio | IP Ownership Director, Brand Usage Reviewer | ownership transfer, unreviewed licensing terms |
| Deployment configs | Cloudflare Infrastructure, DevOps/CI, Automation | Deployment Security Reviewer, Release Manager | production deploys, secret changes, destructive migrations |
| Secrets/auth files | Security/Privacy only as reviewer; Codex should not edit secrets | Security Director | any secret or credential content |
| Database schemas | Software Engineering, Cloudflare Infrastructure, Data Systems | D1 Database Engineer, QA Director, Data Quality Analyst | destructive migrations without backup/rollback plan |
| Mobile app code | Mobile Engineer, Engineering Director | Code Review Lead, QA Director | production signing/secrets, privacy-sensitive changes without review |
| Game code | Game Studio roles, Software Engineering | QA Playtest Lead, IP/Brand Integration Reviewer | third-party assets/code without license review |
| Curriculum docs | Education/Workforce/Curriculum | Curriculum QA Reviewer, Compliance Reviewer | certification claims without evidence/review |
| Sales/marketing docs | Sales/Partnerships, Marketing/Content | Revenue Opportunity Reviewer, Brand Voice Reviewer, Compliance when claims exist | unapproved pricing, legal claims, misleading performance claims |

## Completion Authority
A role may complete work only when all of the following are true:
1. It is inside the role card scope.
2. Required inputs were inspected or missing inputs are documented.
3. Allowed systems/files were respected.
4. Blocked systems/files were not touched.
5. Validation evidence exists or validation limits are documented.
6. Required reviewer and Executive Review Board decision are included.
