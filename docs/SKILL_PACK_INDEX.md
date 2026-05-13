# Skill Pack Index

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Skill Pack Rule
A skill pack is an operating procedure that binds task routing, required inputs, outputs, validation, and reviewer expectations. Role title alone is not enough; Codex must select the role card and applicable skill pack.

| Skill Pack | Purpose | Used By Roles | Required Inputs | Required Outputs | Validation Rules |
|---|---|---|---|---|---|
| branchops-role-routing | classify task and select department/role cards | Primary Agency Owner, Department Lead | user request, repo context, task type | role competency check | mapped task type and reviewer present |
| branchops-executive-review | run ERB gate | ERB Chair, Reviewer | completed work, validation, risks | APPROVE/REVISE/BLOCK/ESCALATE | no approval without evidence |
| branchops-handoff-generation | create final handoff | Handoff Owner | files, validation, risks, SOT needs | handoff block and next prompt | all template fields filled |
| branchops-github-repo-review | inspect repo docs/code boundaries | GitHub Records Lead, Engineering Director | repo, branch, target files | findings, files inspected | no edits unless requested |
| branchops-repo-doc-sync | sync operating docs from master | GitHub Records Lead, PMO Handoff Owner | master file, target repos | commit SHAs, validation notes | refetch and compare markers |
| branchops-cloudflare-worker-build | build/review Worker features | Workers Engineer, Platform Architect | route spec, wrangler config | code/docs/tests | type/build/smoke or documented limit |
| branchops-d1-schema-change | manage D1 schema updates | D1 Database Engineer, Data Quality Analyst | schema, migration goal | migration plan, validation | rollback and data risk review |
| branchops-ai-platform-build | build AI/agent/prompt features | AI Platform Director, Agent Architect | model/task spec, data policy | prompts, evals, feature docs | safety/eval review |
| branchops-security-privacy-review | review security/privacy risk | Security Director, Privacy Lead | diff, data flows, auth paths | risk decision | secret/privacy checks |
| branchops-qa-release-validation | validate releases | QA Director, Release Manager | acceptance criteria, diff | test results, readiness decision | pass/revise/block evidence |
| branchops-website-intake-build | build website intake/funnel work | Website Product Lead, Intake Form Architect | funnel goal, fields, privacy needs | page/form/routing docs | privacy and lead routing review |
| branchops-airtable-source-of-truth-sync | sync structured records | Airtable Systems Lead | record schema, changes | update plan/status | record owner and priority |
| branchops-notion-sop-builder | create SOP/docs pages | Notion Systems Lead, SOP Manager | process, audience, owner | SOP outline/page content | source and owner review |
| branchops-licensing-package-builder | package IP/licensing offers | Licensing Director, Royalty Model Designer | asset, terms, territory | licensing package | IP/legal/finance review |
| branchops-holdco-governance-doc-control | manage holdco governance docs | Corporate Governance Director | source authority, doc request | draft/control decision | legal/founder gates |
| branchops-intercompany-controls-review | review intercompany flows | Intercompany Controls Director | entities, service/payment flow | control notes | finance/legal review |
| branchops-domain-portfolio-review | classify domains/assets | Digital Asset Director | domain list, use, value | keep/lease/flip/route decision | DNS/ownership review |
| branchops-game-feature-build | build/review game features | Game Director, Gameplay Engineer | feature spec, assets | feature plan/build docs | playtest/IP review |
| branchops-digital-wearables-pipeline | manage wearable assets | Digital Wearables Lead | asset design, platform, rights | wearable pipeline docs | IP/license review |
| branchops-apparel-product-system | build apparel/SKU workflows | Apparel Product Director | capsule concept, vendor, margin | SKU/product plan | brand/margin/fulfillment review |
| branchops-curriculum-build | create education products | Curriculum Architect | learner, outcomes, standard | lesson/certification package | curriculum/compliance review |
| branchops-grant-opportunity-review | review grant eligibility | Grants Director, Eligibility Reviewer | opportunity docs | eligibility and checklist | compliance/founder review |
| branchops-public-sector-bid-review | review bids/contracts | Public-Sector Opportunity Analyst | solicitation, requirements | bid readiness summary | legal/compliance review |
| branchops-prospect-list-builder | build target lists | Prospect Researcher, CRM Mapping Specialist | market, ICP, filters | prospect list and CRM plan | data quality review |
| branchops-marketing-campaign-builder | plan campaigns | Marketing Director, Campaign Planner | offer, audience, channel | campaign plan | brand/compliance review |
| branchops-analytics-reporting | build reports/dashboards | Analytics Director, Dashboard Builder | metrics, source systems | dashboard/report | KPI/source validation |
| branchops-vendor-procurement-review | review vendors/assets | Procurement Director, Vendor Risk Reviewer | vendor, cost, contract | recommendation | risk/contract review |
