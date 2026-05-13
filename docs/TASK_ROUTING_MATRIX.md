# Task Routing Matrix

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Routing Rule
Codex may not route work to a role by title alone. For every task, identify department, role card, mission, scope, required knowledge, required skills, allowed/blocked files, inputs, outputs, validation, reviewer, escalation triggers, source-of-truth updates, and ERB gate.

| Task Type | Primary Department | Primary Roles | Required Reviewer | Escalation Triggers |
|---|---|---|---|---|
| holding company governance | Corporate Governance | Corporate Governance Director, Authority Matrix Owner | Governance Documentation Reviewer | legal/entity authority, founder decision |
| operating agreement review | Corporate Governance / Legal | Operating Agreement Specialist, Legal Operations Lead | External Counsel Handoff Owner | binding legal interpretation |
| corporate record book update | Corporate Governance | Corporate Record Book Manager, Written Consent / Resolution Specialist | Governance Documentation Reviewer | missing authority/source records |
| trust activation | Trust / Legacy / Succession | Trust Activation Lead, Trustee Authority Reviewer | Founder Control Reviewer | trust/succession/legal risk |
| bank account setup | Finance / Treasury | Banking Setup Coordinator, Treasury Director | Treasury Risk Reviewer | bank/tax/identity requirements |
| chart of accounts setup | Accounting / Tax Coordination | Chart of Accounts Designer, Accounting Systems Lead | CPA Handoff Coordinator | tax/accounting assumptions |
| intercompany agreement drafting | Intercompany / Holding Company Controls | Intercompany Controls Director, Management Fee Specialist | Related-Party Transaction Reviewer | legal/tax/entity separation risk |
| IP licensing package | IP / Brand / Licensing | Licensing Director, Royalty Model Designer, Contract Packaging Lead | IP Risk Reviewer | IP ownership, royalty, legal terms |
| trademark readiness | IP / Brand / Licensing | Trademark Coordinator, Brand Usage Reviewer | IP Ownership Director | public brand/legal risk |
| domain portfolio classification | Digital Asset / Domain Portfolio | Domain Registry Manager, Lease / Flip / Keep Classifier | Digital Asset Risk Reviewer | ownership/DNS/value uncertainty |
| website page build | Website / Growth / Intake | Website Product Lead, SEO / Content Lead | Website QA Reviewer | public claims/privacy risk |
| website intake form | Website / Growth / Intake | Intake Form Architect, Lead Routing Coordinator | Privacy Reviewer | PII/privacy/CRM routing |
| CRM/Airtable setup | Data / CRM / Source-of-Truth | Airtable Systems Lead, CRM Mapping Specialist | Source-of-Truth Reviewer | data quality/privacy risk |
| Notion SOP creation | Data / CRM / Source-of-Truth / Operations | Notion Systems Lead, SOP Manager | Department Lead | source mismatch |
| GitHub repo review | Data / CRM / Source-of-Truth | GitHub Records Lead, Source-of-Truth Reviewer | PMO Handoff Owner | repo scope/conflicting docs |
| Cloudflare Worker feature | Cloudflare Infrastructure | Workers Engineer, API Integration Engineer | Wrangler Deployment Reviewer | production/security/data risk |
| D1 schema change | Cloudflare Infrastructure / Data | D1 Database Engineer, Data Quality Analyst | Release Manager | destructive migration/privacy risk |
| R2 file upload feature | Cloudflare Infrastructure | R2 Storage Engineer, Workers Engineer | Security Director | file privacy/storage risk |
| auth/security change | Security / Privacy / Access Control | Access Control Lead, Auth / Token Reviewer | Security Director | secrets/auth/production risk |
| AI chat feature | AI Platform / Agents | Agent Architect, Prompt Systems Engineer | AI Safety / Guardrail Reviewer | model safety/privacy risk |
| memory/retrieval feature | AI Platform / Data | Memory Systems Lead, Retrieval / Vector Search Engineer | Privacy Lead | retention/PII/source risk |
| admin dashboard feature | Product / Software / Security | Product Manager, Full-Stack Engineer | Access Control Lead | admin/auth/data risk |
| mobile/iOS feature | Software Engineering | Mobile Engineer, Product Manager | QA Director | privacy/release/signing risk |
| game feature | Game Studio | Game Director, Gameplay Engineer | QA Playtest Lead | asset/IP/playability risk |
| digital wearable feature | Game Studio / IP | Digital Wearables Lead, Asset Pipeline Lead | IP / Brand Integration Reviewer | asset rights/economy risk |
| in-game economy feature | Game Studio / Finance | Game Economy Designer, Revenue Analyst | Treasury Risk Reviewer | payment/economy/legal risk |
| apparel capsule launch | Apparel / Merchandise | Apparel Product Director, Product Line Planner | Brand Compliance Reviewer | margin/brand/fulfillment risk |
| Printify/Shopify workflow | Apparel / Procurement | Print-on-Demand Specialist, Fulfillment Reviewer | Procurement Director | vendor/payment/customer data |
| curriculum product | Education / Workforce | Curriculum Architect, Lesson Designer | Curriculum QA Reviewer | compliance/certification claims |
| workforce certification | Education / HR | Certification Pathway Lead, Workforce Partnership Coordinator | Workforce Compliance Reviewer | credential/public claim risk |
| grant opportunity review | Grants / Funding / Public Sector | Grants Director, Eligibility Reviewer | Compliance Requirements Reviewer | eligibility/submission risk |
| public-sector bid review | Grants / Funding / Public Sector | Public-Sector Opportunity Analyst, Application Package Coordinator | Municipal Contract Reviewer / Legal | bid/legal/compliance risk |
| property services estimate system | Property Services / Infrastructure | Estimating Specialist, Property Services Manager | Safety Reviewer | safety/municipal contract risk |
| agriculture/R&D product concept | Agriculture / Food / Hemp / R&D | Agriculture Program Director, Food Product R&D Lead | Product Safety Reviewer | food/hemp/compliance risk |
| food SKU development | Agriculture / Apparel/Procurement | SKU Development Specialist, Supplier / Ingredient Coordinator | Compliance Reviewer | food safety/labeling risk |
| media/content campaign | Media / Publishing / IP Content | Media Director, Distribution Planner | Rights / Clearance Reviewer | rights/public claims risk |
| sales prospect list | Sales / Partnerships | Prospect Researcher, Deal Qualification Analyst | CRM Pipeline Reviewer | data quality/privacy risk |
| partnership outreach | Sales / Partnerships | Partnership Lead, Outreach Script Writer | Revenue Opportunity Reviewer | claims/pricing/legal terms |
| Mailchimp campaign | Marketing / Content | Email Marketing Coordinator, Campaign Planner | Audience Ownership Reviewer | consent/privacy/claims risk |
| Stripe pricing/billing | Finance / Treasury / Sales | Payment Systems Coordinator, Revenue Analyst | Treasury Risk Reviewer | payment/revenue/tax risk |
| procurement/vendor review | Procurement / Vendor / Asset Management | Vendor Researcher, Vendor Risk Reviewer | Vendor Contract Handoff Owner | contract/security/privacy risk |
| hiring/onboarding | HR / Hiring / Workforce Operations | Recruiting Coordinator, Contractor Onboarding Lead | Workforce Compliance Reviewer | payroll/access/legal risk |
| customer support workflow | Customer Success / Support | Support Workflow Lead, Knowledge Base Manager | Service Quality Reviewer | privacy/support escalation risk |
| analytics/reporting | Analytics / Reporting / Performance | Dashboard Builder, KPI Designer | Asset Performance Reviewer | bad data/source mismatch |
| release validation | QA / Validation / Release | Release Manager, Regression Tester | Release Readiness Reviewer | missing validation/production risk |
| incident/security review | Security / Privacy | Incident Response Coordinator, Deployment Security Reviewer | Security Director | production/security incident |
| repo documentation sync | Data / CRM / Source-of-Truth | GitHub Records Lead, PMO Handoff Owner | Source-of-Truth Reviewer | AGENTS overwrite/drift risk |
