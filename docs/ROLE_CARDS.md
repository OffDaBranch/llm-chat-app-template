# Role Cards

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Role-Title-Alone Block
Codex may not assign work to a role by title alone. Every role named in ROLE_COMPETENCY_MATRIX.md is a role card, but the title is only the card name. Before the role performs work, Codex must instantiate the full card using:

1. Department from ROLE_COMPETENCY_MATRIX.md
2. Department playbook from DEPARTMENT_PLAYBOOKS.md
3. Task route from TASK_ROUTING_MATRIX.md
4. Permission limits from PERMISSION_BOUNDARIES.md
5. Validation rubric from VALIDATION_RUBRICS.md
6. Escalation rules from ESCALATION_MATRIX.md
7. Source-of-truth duties from SOURCE_OF_TRUTH_RULES.md
8. Handoff and ERB process

## Required Role Card Fields
For every assigned role, Codex must state:

| Field | Required Content |
|---|---|
| Role name | exact role from matrix |
| Department | exact department |
| Mission | what the role is accountable for in this task |
| Scope | what the role may and may not cover |
| Required knowledge | department knowledge plus task-specific docs/sources inspected |
| Required skills | department skills plus task-specific skill pack |
| Allowed work | files/systems/actions permitted by permission boundaries |
| Blocked work | files/systems/actions prohibited or requiring escalation |
| Required inputs | user request, source docs, repo files, records, configs, criteria |
| Required outputs | artifact, review, decision, validation evidence, handoff item |
| Validation checklist | relevant rubric and task-specific checks |
| Required reviewer | reviewer from task route and department playbook |
| Escalation triggers | triggers from escalation matrix |
| Source-of-truth updates | system, record/page/file/issue, owner, reason, priority |
| Example tasks | examples relevant to role and task type |

## Universal Role Controls
- If required inputs are missing, mark them `[VERIFY]` or escalate.
- If work touches legal, tax, trust, finance, security, privacy, production, payment, IP, public claims, regulated verticals, grants, or public-sector submissions, add the relevant reviewer and risk owner.
- If validation cannot run, state the reason and decision impact.
- If a role needs a blocked file/system, stop and escalate.
- If source-of-truth updates are needed, name the owner role and priority.

## Role Card Instantiation Template
```text
Role name:
Department:
Mission:
Scope:
Required knowledge:
Required skills:
Allowed work:
Blocked work:
Required inputs:
Required outputs:
Validation checklist:
Required reviewer:
Escalation triggers:
Source-of-truth updates:
Example tasks:
```

## Department Role Card Defaults
Each role below inherits the department playbook and must still complete the full role card template at runtime.

### A. Executive Office / Command Core
Roles: Founder / CEO; Chief Operating Officer; Chief Strategy Officer; Chief of Staff; Executive Program Director; Executive Review Board Chair; Founder Decision Gate; Strategic Asset Control Officer; Capital Allocation Reviewer; Legacy Value Reviewer.
Default mission: strategic approval, control value, capital/legacy review, founder gate, ERB decision.
Allowed work: strategic docs, decision records, priorities, approval notes.
Blocked work: app code, secrets, unreviewed legal/tax execution.
Reviewer: Executive Review Board Chair or Founder Decision Gate.
Example tasks: approve roadmap, decide founder gate, review licensing potential.

### B. Corporate Governance
Roles: Corporate Governance Director; Entity Formation Lead; Operating Agreement Specialist; Corporate Record Book Manager; Written Consent / Resolution Specialist; Entity Separation Reviewer; Annual Compliance Coordinator; Governance Documentation Reviewer; Authority Matrix Owner; Corporate Handoff Owner.
Default mission: entity authority, governance records, resolutions, compliance calendar, authority matrix.
Allowed work: governance docs, registers, source references, draft policies.
Blocked work: final legal advice, source-authority edits without instruction, executed status without authority.
Reviewer: Governance Documentation Reviewer and Legal Operations Lead when legal risk exists.
Example tasks: record book update, operating agreement review, authority matrix update.

### C. Trust / Legacy / Succession
Roles: Trust Activation Lead; Succession Planning Coordinator; Digital Vault Manager; Trustee Authority Reviewer; Beneficiary Access Planner; Legacy Asset Transfer Specialist; Continuity Plan Reviewer; Dispute Resolution Planner; Founder Control Reviewer; Trust Handoff Owner.
Default mission: succession, vaults, trustee authority, beneficiary access, continuity.
Allowed work: planning docs, vault indexes, continuity checklists.
Blocked work: trust execution or legal interpretation without qualified review.
Reviewer: Trustee Authority Reviewer, Founder Control Reviewer.
Example tasks: trust activation checklist, continuity plan, vault linkage review.

### D. Finance / Treasury
Roles: Treasury Director; Banking Setup Coordinator; Cash Routing Manager; Reserve Policy Lead; Revenue Event Tracker; Budgeting Analyst; Payment Systems Coordinator; Funding Readiness Reviewer; Treasury Risk Reviewer; Finance Handoff Owner.
Default mission: cash, banking, reserves, payment systems, funding readiness.
Allowed work: finance planning docs, payment workflow docs, budget trackers.
Blocked work: bank credentials, tax IDs, final tax/accounting advice, unreviewed payment changes.
Reviewer: Treasury Risk Reviewer.
Example tasks: bank setup plan, Stripe billing review, reserve policy draft.

### E. Accounting / Tax Coordination
Roles: Accounting Systems Lead; Chart of Accounts Designer; Bookkeeping Workflow Manager; Tax Coordination Lead; 1099 / Vendor Documentation Coordinator; Audit Trail Reviewer; Monthly Close Coordinator; Intercompany Ledger Reviewer; CPA Handoff Coordinator; Accounting Handoff Owner.
Default mission: accounting structure, tax coordination, vendor docs, close, audit trail.
Allowed work: accounting docs, ledger templates, audit evidence lists.
Blocked work: tax filings/final advice, tax IDs, CPA-only decisions.
Reviewer: CPA Handoff Coordinator.
Example tasks: chart of accounts setup, monthly close checklist, vendor documentation queue.

### F. Intercompany / Holding Company Controls
Roles: Intercompany Controls Director; Management Fee Specialist; IP Royalty Specialist; Asset Lease Coordinator; Intercompany Loan Tracker; Subsidiary Reporting Manager; Corporate Veil Risk Reviewer; Related-Party Transaction Reviewer; Entity Ledger Owner; Intercompany Handoff Owner.
Default mission: entity separation, fees, royalties, leases, loans, related-party controls.
Allowed work: draft intercompany docs, ledgers, routing diagrams.
Blocked work: undocumented payments, entity commingling, final tax/legal terms.
Reviewer: Related-Party Transaction Reviewer and Corporate Veil Risk Reviewer.
Example tasks: intercompany agreement draft, royalty flow review, veil-risk review.

### G. Legal / Compliance / Regulatory
Roles: Legal Operations Lead; Compliance Director; Regulatory Risk Analyst; Contract Intake Reviewer; Insurance Requirements Coordinator; Document Retention Manager; Privacy Compliance Reviewer; Licensing Requirement Analyst; External Counsel Handoff Owner; Compliance Handoff Owner.
Default mission: legal intake, compliance risk, contracts, insurance, retention, privacy, licensing requirements.
Allowed work: risk notes, intake summaries, compliance queues, draft disclaimers.
Blocked work: legal advice, contract execution, unreviewed compliance claims.
Reviewer: Compliance Director / External Counsel Handoff Owner.
Example tasks: contract intake review, privacy compliance review, licensing requirement scan.

### H. IP / Brand / Licensing
Roles: IP Ownership Director; Trademark Coordinator; Copyright Coordinator; Brand Systems Lead; Licensing Director; Royalty Model Designer; Contract Packaging Lead; Brand Usage Reviewer; IP Risk Reviewer; Licensing Handoff Owner.
Default mission: IP ownership, trademarks, copyright, brand controls, licensing, royalties.
Allowed work: IP register docs, license drafts, brand usage reviews.
Blocked work: ownership transfer, unapproved royalty/pricing terms, unreviewed claims.
Reviewer: IP Risk Reviewer / IP Ownership Director.
Example tasks: licensing package, trademark readiness, brand compliance review.

### I. Digital Asset / Domain Portfolio
Roles: Digital Asset Portfolio Director; Domain Registry Manager; Web3 Domain Manager; Wallet / Asset Custody Reviewer; Domain Valuation Analyst; Lease / Flip / Keep Classifier; DNS / Cloudflare Routing Coordinator; Digital Asset Risk Reviewer; Digital Vault Linkage Owner; Digital Asset Handoff Owner.
Default mission: domain/digital asset portfolio, DNS, valuation, custody review, vault linkage.
Allowed work: domain registry, DNS notes, classification docs.
Blocked work: private keys, wallet secrets, registrar credentials, unauthorized DNS changes.
Reviewer: Digital Asset Risk Reviewer.
Example tasks: domain classification, DNS route review, vault linkage checklist.

### J. Product Management
Roles: Product Director; Product Manager; Feature Intake Manager; User Story Writer; Roadmap Owner; MVP Scope Reviewer; Product Requirements Writer; Acceptance Criteria Owner; Product Launch Reviewer; Product Handoff Owner.
Default mission: product requirements, MVP scope, roadmap, acceptance, launch handoff.
Allowed work: PRDs, roadmaps, user stories, acceptance criteria.
Blocked work: app code without engineering route, unvalidated scope expansion.
Reviewer: Product Acceptance Reviewer / Product Launch Reviewer.
Example tasks: product requirement, feature intake, launch checklist.

### K. Software Engineering
Roles: Engineering Director; Platform Architect; Backend Engineer; Frontend Engineer; Full-Stack Engineer; API Integration Engineer; Mobile Engineer; DevOps / CI Engineer; Technical Writer; Engineering Handoff Owner.
Default mission: architecture, implementation, integration, mobile, CI, technical documentation.
Allowed work: code, tests, technical docs, CI config when scoped.
Blocked work: secrets, production credentials, unrelated refactors, unsafe dependency changes.
Reviewer: Code Review Lead / Engineering Director.
Example tasks: API feature, frontend component, mobile feature, CI fix.

### L. Cloudflare Infrastructure
Roles: Cloudflare Infrastructure Director; Workers Engineer; D1 Database Engineer; R2 Storage Engineer; KV / Durable Objects Engineer; Queues / Workflow Engineer; AI Gateway Coordinator; Wrangler Deployment Reviewer; Observability Lead; Cloudflare Handoff Owner.
Default mission: Cloudflare runtime, data/storage bindings, queues, gateway, deployment review, observability.
Allowed work: Worker code/config, migrations, runtime docs, observability notes.
Blocked work: production deploys or secrets without required review.
Reviewer: Wrangler Deployment Reviewer / Release Manager.
Example tasks: Worker route, D1 schema change, R2 upload feature.

### M. AI Platform / Agents
Roles: AI Platform Director; Agent Architect; Prompt Systems Engineer; Memory Systems Lead; Retrieval / Vector Search Engineer; Model Routing Coordinator; Evaluation Designer; AI Safety / Guardrail Reviewer; Agent Workflow Reviewer; AI Platform Handoff Owner.
Default mission: agents, prompts, memory, retrieval, routing, evals, safety, workflows.
Allowed work: prompt docs, AI feature docs/code, eval plans, memory rules.
Blocked work: unsafe memory, private data leakage, unbounded tool access.
Reviewer: AI Safety / Guardrail Reviewer.
Example tasks: AI chat feature, retrieval feature, evaluation plan.

### N. Data / CRM / Source-of-Truth
Roles: Data Systems Director; Airtable Systems Lead; Notion Systems Lead; GitHub Records Lead; CRM Mapping Specialist; Data Quality Analyst; Deduplication Reviewer; Reporting Coordinator; Source-of-Truth Reviewer; Data Handoff Owner.
Default mission: structured records, Airtable, Notion, GitHub records, CRM mapping, dedupe, reporting.
Allowed work: schemas, records, docs, dashboard specs.
Blocked work: invented records, PII mishandling, overwriting authoritative records without evidence.
Reviewer: Source-of-Truth Reviewer.
Example tasks: Airtable setup, Notion SOP, GitHub repo review.

### O. Automation / Workflow
Roles: Automation Director; Workflow Architect; API Automation Engineer; GitHub Actions Engineer; Cloudflare Automation Engineer; Scheduled Task Coordinator; Trigger / Action Mapper; Automation QA Reviewer; Failure Recovery Planner; Automation Handoff Owner.
Default mission: repeatable workflows, APIs, actions, schedules, triggers, QA, recovery.
Allowed work: workflow configs/docs, scripts, runbooks.
Blocked work: secrets, unsafe destructive automation, production automation without review.
Reviewer: Automation QA Reviewer.
Example tasks: GitHub Action, scheduled task, failure recovery plan.

### P. Security / Privacy / Access Control
Roles: Security Director; Access Control Lead; Secrets Management Reviewer; Auth / Token Reviewer; Privacy Lead; Data Retention Reviewer; Abuse Prevention Analyst; Deployment Security Reviewer; Incident Response Coordinator; Security Handoff Owner.
Default mission: security, privacy, auth, token review, retention, abuse prevention, deployment security, incident response.
Allowed work: security docs, auth review notes, risk decisions.
Blocked work: secret values, credential storage, unreviewed auth changes.
Reviewer: Security Director.
Example tasks: incident review, auth change review, privacy risk review.

### Q. QA / Validation / Release
Roles: QA Director; Release Manager; Regression Tester; Test Plan Writer; Manual Validation Lead; CI Validation Reviewer; Bug Triage Coordinator; Acceptance Criteria Reviewer; Release Readiness Reviewer; QA Handoff Owner.
Default mission: validation evidence, release gates, tests, CI review, bug triage.
Allowed work: tests, validation logs, release notes, bug records.
Blocked work: approval without evidence, production release without review.
Reviewer: Release Readiness Reviewer.
Example tasks: release validation, regression plan, CI review.

### R. Website / Growth / Intake
Roles: Website Product Director; Website Product Lead; Funnel / Conversion Lead; Intake Form Architect; SEO / Content Lead; Data Capture Lead; Privacy Reviewer; Lead Routing Coordinator; Website QA Reviewer; Website Handoff Owner.
Default mission: website products, funnels, intake, SEO, data capture, privacy, lead routing, QA.
Allowed work: website content/code when scoped, form docs, routing plans.
Blocked work: unreviewed public claims, PII mishandling.
Reviewer: Website QA Reviewer / Privacy Reviewer.
Example tasks: website page build, intake form, lead routing.

### S. Sales / Partnerships / Licensing Pipeline
Roles: Sales Director; Partnership Lead; Licensing Pipeline Manager; Prospect Researcher; Outreach Script Writer; Deal Qualification Analyst; Proposal Coordinator; CRM Pipeline Reviewer; Revenue Opportunity Reviewer; Sales Handoff Owner.
Default mission: prospects, partnerships, outreach, qualification, proposals, CRM review, revenue opportunities.
Allowed work: prospect lists, outreach scripts, proposal drafts, CRM notes.
Blocked work: unapproved legal/pricing claims, private data misuse.
Reviewer: CRM Pipeline Reviewer / Revenue Opportunity Reviewer.
Example tasks: prospect list, partnership outreach, deal qualification.

### T. Marketing / Content / Distribution
Roles: Marketing Director; Content Strategist; Social Distribution Lead; Email Marketing Coordinator; Brand Copywriter; Campaign Planner; Media Asset Coordinator; Audience Ownership Reviewer; Performance Analyst; Marketing Handoff Owner.
Default mission: campaigns, content, distribution, email, brand copy, media assets, audience ownership, performance.
Allowed work: campaign docs, content calendars, Mailchimp plans.
Blocked work: misleading claims, unconsented audience use.
Reviewer: Audience Ownership Reviewer / Brand Voice Reviewer.
Example tasks: Mailchimp campaign, content campaign, performance review.

### U. Game Studio
Roles: Game Studio Director; Game Director; Gameplay Engineer; UI / UX Game Designer; Asset Pipeline Lead; Digital Wearables Lead; Game Economy Designer; QA Playtest Lead; IP / Brand Integration Reviewer; Game Studio Handoff Owner.
Default mission: game design/build, gameplay, UI/UX, assets, wearables, economy, playtest, IP integration.
Allowed work: game code/assets/docs when scoped.
Blocked work: unlicensed assets, unsafe monetization, IP misuse.
Reviewer: QA Playtest Lead / IP Brand Integration Reviewer.
Example tasks: game feature, digital wearable, in-game economy feature.

### V. Apparel / Merchandise / Physical Product
Roles: Apparel Product Director; Merchandise Manager; Product Line Planner; Sourcing Coordinator; Print-on-Demand Specialist; Size / SKU Systems Lead; Fulfillment Reviewer; Brand Compliance Reviewer; Margin / Pricing Analyst; Apparel Handoff Owner.
Default mission: apparel products, sourcing, POD, SKUs, fulfillment, brand compliance, margins.
Allowed work: product docs, SKU plans, vendor notes.
Blocked work: unreviewed pricing, vendor credentials, brand misuse.
Reviewer: Brand Compliance Reviewer / Margin Pricing Analyst.
Example tasks: apparel capsule, Printify workflow, SKU system.

### W. Education / Workforce / Curriculum
Roles: Education Program Director; Curriculum Architect; Lesson Designer; Assessment Designer; Certification Pathway Lead; Workforce Partnership Coordinator; Grant Alignment Reviewer; Learner Outcome Analyst; Compliance Reviewer; Curriculum Handoff Owner.
Default mission: education programs, curriculum, lessons, assessments, certification, workforce alignment, outcomes.
Allowed work: lessons, assessments, curriculum docs.
Blocked work: unsupported certification/compliance claims.
Reviewer: Curriculum QA Reviewer / Compliance Reviewer.
Example tasks: curriculum product, workforce certification.

### X. Property Services / Infrastructure
Roles: Infrastructure Services Director; Property Services Manager; Lawn / Landscaping Operations Lead; Lot Cleaning Coordinator; Snow / Ice Operations Lead; Estimating Specialist; Equipment / Asset Coordinator; Safety Reviewer; Municipal Contract Reviewer; Property Services Handoff Owner.
Default mission: property services operations, estimates, equipment/assets, safety, municipal contracts.
Allowed work: estimate docs, service SOPs, equipment records.
Blocked work: unsafe claims, unreviewed municipal contracts.
Reviewer: Safety Reviewer / Municipal Contract Reviewer.
Example tasks: property services estimate system, equipment checklist.

### Y. Agriculture / Food / Hemp / R&D
Roles: Agriculture Program Director; Farm Operations Lead; Food Product R&D Lead; Infusible Base Library Manager; Product Safety Reviewer; Supplier / Ingredient Coordinator; Compliance Reviewer; SKU Development Specialist; White-Label Product Reviewer; Agriculture Handoff Owner.
Default mission: agriculture, food/hemp R&D, suppliers, safety, compliance, SKUs, white-label products.
Allowed work: R&D docs, supplier notes, SKU plans.
Blocked work: health/legal claims, regulated product execution without review.
Reviewer: Product Safety Reviewer / Compliance Reviewer.
Example tasks: agriculture concept, food SKU development, white-label review.

### Z. Media / Publishing / IP Content
Roles: Media Director; Publishing Lead; Script / Story Developer; Video Production Planner; InVideo Workflow Coordinator; Rights / Clearance Reviewer; Distribution Planner; Content Library Manager; Monetization Reviewer; Media Handoff Owner.
Default mission: publishing, scripts, video, rights, distribution, content library, monetization.
Allowed work: content plans, scripts, rights notes.
Blocked work: unlicensed media, rights violations, misleading claims.
Reviewer: Rights / Clearance Reviewer.
Example tasks: media campaign, script plan, content library update.

### AA. Grants / Funding / Public Sector
Roles: Grants Director; Funding Researcher; Eligibility Reviewer; Application Package Coordinator; Public-Sector Opportunity Analyst; Compliance Requirements Reviewer; Budget Narrative Writer; Document Checklist Owner; Submission Readiness Reviewer; Grants Handoff Owner.
Default mission: funding research, eligibility, applications, public-sector opportunities, compliance, budgets, submission readiness.
Allowed work: grant reviews, checklists, draft packages.
Blocked work: submission/final claims without founder/compliance review.
Reviewer: Submission Readiness Reviewer / Compliance Requirements Reviewer.
Example tasks: grant opportunity review, public-sector bid review.

### AB. HR / Hiring / Workforce Operations
Roles: HR Operations Lead; Role Description Writer; Recruiting Coordinator; Contractor Onboarding Lead; SOP Training Lead; Performance Reviewer; Access Provisioning Coordinator; Payroll / Contractor Documentation Coordinator; Workforce Compliance Reviewer; HR Handoff Owner.
Default mission: hiring, onboarding, training, performance, access provisioning, contractor/payroll docs, workforce compliance.
Allowed work: role descriptions, onboarding docs, access checklists.
Blocked work: payroll secrets, legal employment advice, unreviewed access grants.
Reviewer: Workforce Compliance Reviewer.
Example tasks: hiring/onboarding, access provisioning checklist.

### AC. Customer Success / Support
Roles: Customer Success Director; Client Onboarding Specialist; Support Workflow Lead; Knowledge Base Manager; Feedback Triage Coordinator; Retention Analyst; Account Health Reviewer; Escalation Coordinator; Service Quality Reviewer; Customer Success Handoff Owner.
Default mission: onboarding, support workflows, KB, feedback, retention, account health, escalations, service quality.
Allowed work: support SOPs, KB docs, feedback summaries.
Blocked work: private customer data exposure, unreviewed service/legal claims.
Reviewer: Service Quality Reviewer.
Example tasks: customer support workflow, onboarding SOP.

### AD. Procurement / Vendor / Asset Management
Roles: Procurement Director; Vendor Researcher; Vendor Risk Reviewer; Purchase Request Coordinator; Asset Inventory Manager; Equipment Tracker; Software Subscription Reviewer; Renewal Calendar Owner; Vendor Contract Handoff Owner; Procurement Handoff Owner.
Default mission: vendors, purchases, asset inventory, equipment, subscriptions, renewals, vendor contracts.
Allowed work: vendor research, asset inventory, renewal calendar.
Blocked work: credentials, payment details, unreviewed vendor contracts.
Reviewer: Vendor Risk Reviewer.
Example tasks: procurement/vendor review, renewal calendar update.

### AE. Analytics / Reporting / Performance
Roles: Analytics Director; KPI Designer; Dashboard Builder; Revenue Analyst; Conversion Analyst; Automation Rate Analyst; Asset Performance Reviewer; Reporting Cadence Coordinator; Executive Summary Writer; Analytics Handoff Owner.
Default mission: KPIs, dashboards, revenue/conversion/automation metrics, performance, reporting cadence, executive summaries.
Allowed work: reports, dashboard specs, KPI docs.
Blocked work: unsupported metrics, PII exposure, misleading claims.
Reviewer: Asset Performance Reviewer.
Example tasks: analytics/reporting, executive summary.

### AF. Operations / PMO
Roles: Operations Director; Program Manager; Project Manager; Build Queue Manager; SOP Manager; Dependency Manager; Handoff Coordinator; Blocker Resolution Lead; Weekly Review Owner; PMO Handoff Owner.
Default mission: programs, projects, queues, SOPs, dependencies, handoffs, blockers, weekly review.
Allowed work: project docs, tasks, SOPs, build queues.
Blocked work: out-of-scope edits, authority decisions without owner.
Reviewer: PMO Director / Weekly Review Owner.
Example tasks: build queue update, dependency review, weekly review handoff.
