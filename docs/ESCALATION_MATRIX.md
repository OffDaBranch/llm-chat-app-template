# Escalation Matrix

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Escalation Rule
Codex must escalate when a role lacks authority, source authority is unclear, validation is missing, or the work creates legal, financial, security, privacy, production, public, regulated, or founder-level risk.

| Trigger | Examples | Escalate To | Default Decision |
|---|---|---|---|
| Legal risk | contracts, entity docs, liability, public legal claims | Legal Operations Lead, Compliance Director, External Counsel Handoff Owner, Founder Decision Gate | ESCALATE |
| Tax risk | tax treatment, 1099s, deductions, entity classification | Tax Coordination Lead, CPA Handoff Coordinator, Founder Decision Gate | ESCALATE |
| Trust/succession risk | trust activation, trustee authority, beneficiary access | Trust Activation Lead, Trustee Authority Reviewer, Founder Decision Gate | ESCALATE |
| IP ownership risk | ownership transfer, license terms, rights assignment | IP Ownership Director, IP Risk Reviewer, Founder Decision Gate | ESCALATE |
| Brand risk | public brand claims, usage rights, trademark confusion | Brand Systems Lead, Brand Usage Reviewer | REVISE/ESCALATE |
| Data privacy risk | PII, retention, consent, customer data | Privacy Lead, Data Retention Reviewer, Security Director | ESCALATE |
| Security risk | auth, secrets, tokens, access control, incident | Security Director, Access Control Lead, Incident Response Coordinator | BLOCK/ESCALATE |
| Production deployment risk | deploy, config, migration, runtime change | Deployment Security Reviewer, Release Manager, Cloudflare Handoff Owner | ESCALATE |
| Payment/revenue risk | pricing, billing, Stripe, royalties, intercompany | Treasury Director, Finance Handoff Owner, Intercompany Controls Director | ESCALATE |
| Public claim/compliance risk | marketing claims, grant claims, regulated claims | Compliance Director, Marketing Director, Founder Decision Gate | ESCALATE |
| Regulated vertical risk | cannabis, food, hemp, public-sector, safety | Compliance Director, relevant program director, external reviewer | ESCALATE |
| Grant/public-sector submission risk | eligibility, certifications, budget narratives, bid terms | Grants Director, Compliance Requirements Reviewer, Founder Decision Gate | ESCALATE |
| Large scope creep | task expands beyond repo/request | PMO Director, Executive Program Director | REVISE |
| Unclear source of truth | conflicting docs, missing authority, stale records | Source-of-Truth Reviewer, GitHub Records Lead, Data Systems Director | REVISE/ESCALATE |
| Missing validation | tests/checks unavailable, no evidence | QA Director, Release Readiness Reviewer | REVISE/BLOCK |
| Outside repo scope | work belongs to another repo/system | PMO Handoff Owner, GitHub Records Lead | REVISE |

## Required Escalation Output
```text
Escalation trigger:
Risk category:
Current blocker:
Required reviewer:
Required evidence:
Temporary safe action:
Decision: ESCALATE / BLOCK / REVISE
Next executable prompt:
```
