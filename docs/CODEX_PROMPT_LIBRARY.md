# Codex Prompt Library

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Prompt Rules
Every prompt must require role competency routing, validation, source-of-truth review, Executive Review Board decision, and handoff. Replace bracketed fields before use.

## Reusable Prompts

### Repo Review
```text
Review [repo] under BranchOps v3.0. Inspect AGENTS.md, docs/BRANCHOPS_REPO_OPERATING_PACK.md, README, config files, source docs, and relevant app files. Classify the task, select role cards, identify risks, validate findings, and return files inspected, gaps, source-of-truth updates, ERB decision, handoff, and next prompt.
```

### Code Feature Build
```text
Build [feature] in [repo] without unrelated refactors. Route through Product, Engineering, QA, Security if relevant, and Source-of-Truth. Inspect existing patterns first, implement the smallest safe slice, run validation, and return full BranchOps final format.
```

### Docs-Only Update
```text
Update only documentation files for [objective]. Do not edit application code. Route through Documentation/GitHub Records, Reviewer, Source-of-Truth, and ERB. Validate by refetching or checking changed files and return commit/files/risks.
```

### Website Intake Build
```text
Build or revise website intake flow for [offer/audience]. Route through Website Product Lead, Intake Form Architect, Privacy Reviewer, Lead Routing Coordinator, Website QA Reviewer, and Source-of-Truth. Validate fields, privacy copy, lead routing, and responsive behavior.
```

### AI Platform Feature
```text
Design/build AI feature [feature]. Route through AI Platform Director, Agent Architect, Prompt Systems Engineer, AI Safety Reviewer, Data Quality Analyst, and QA. Inspect data boundaries, memory/retrieval rules, eval needs, and validation path.
```

### Cloudflare Worker Route
```text
Implement Cloudflare Worker route [route]. Inspect wrangler config and existing routes. Route through Workers Engineer, API Integration Engineer, Security Reviewer, QA, and Release Manager if deployment is involved. Validate type/build/smoke path.
```

### D1 Schema Migration
```text
Plan or implement D1 schema change [change]. Route through D1 Database Engineer, Data Quality Analyst, Backend Engineer, QA, and Release Manager. Include migration, rollback, data privacy, and validation evidence.
```

### Security Review
```text
Perform security/privacy review for [scope]. Inspect auth, secrets exposure risk, data flows, retention, logs, configs, and dependencies. Return findings by severity, required fixes, validation evidence, source-of-truth updates, ERB decision, and handoff.
```

### Release Validation
```text
Validate release [scope]. Route through Release Manager, QA Director, Regression Tester, Security if relevant, and Source-of-Truth. Run or document required checks, classify blockers, and return APPROVE/REVISE/BLOCK/ESCALATE.
```

### Holding Company Document Update
```text
Draft or update governance document [document]. Route through Corporate Governance, Legal/Compliance, Source-of-Truth, and Founder Decision Gate when binding. Preserve draft disclaimers and do not mark executed without authority.
```

### IP Licensing Package
```text
Create IP licensing package for [asset]. Route through IP Ownership Director, Licensing Director, Royalty Model Designer, Contract Packaging Lead, Finance, Legal/Compliance, and Founder Decision Gate. Mark all terms draft until approved.
```

### Domain Portfolio Review
```text
Review domain portfolio item/list [domains]. Route through Digital Asset Portfolio Director, Domain Registry Manager, DNS/Cloudflare Routing Coordinator, Digital Asset Risk Reviewer, and Source-of-Truth. Classify keep/lease/flip/build/route.
```

### Game Feature
```text
Plan/build game feature [feature]. Route through Game Director, Gameplay Engineer, UI/UX Game Designer, QA Playtest Lead, IP/Brand Integration Reviewer, and Source-of-Truth. Validate playability, asset rights, economy impact, and handoff.
```

### Digital Wearable Feature
```text
Create digital wearable pipeline for [asset]. Route through Digital Wearables Lead, Asset Pipeline Lead, IP/Brand Reviewer, Game Economy Designer if monetized, QA Playtest Lead, and Source-of-Truth.
```

### Apparel Product System
```text
Build apparel product system for [capsule/product]. Route through Apparel Product Director, Merchandise Manager, SKU Systems Lead, Fulfillment Reviewer, Brand Compliance Reviewer, Margin/Pricing Analyst, and Source-of-Truth.
```

### Curriculum Build
```text
Create curriculum product [course/module]. Route through Education Program Director, Curriculum Architect, Lesson Designer, Assessment Designer, Compliance Reviewer, Learner Outcome Analyst, and Source-of-Truth.
```

### Grant Opportunity Review
```text
Review grant opportunity [opportunity]. Route through Grants Director, Funding Researcher, Eligibility Reviewer, Compliance Requirements Reviewer, Budget Narrative Writer, Submission Readiness Reviewer, and Founder Decision Gate if submission-ready.
```

### Prospect List
```text
Build prospect list for [offer/market]. Route through Prospect Researcher, Deal Qualification Analyst, CRM Mapping Specialist, Data Quality Analyst, Sales Handoff Owner, and Source-of-Truth. Include filters, fields, and next outreach prompt.
```

### Marketing Campaign
```text
Plan marketing campaign [campaign]. Route through Marketing Director, Content Strategist, Campaign Planner, Brand Copywriter, Compliance Reviewer if claims exist, Performance Analyst, and Source-of-Truth.
```

### Airtable Update
```text
Prepare Airtable source-of-truth update for [record/workflow]. Route through Airtable Systems Lead, Data Quality Analyst, Source-of-Truth Reviewer, and owning department. Specify table, fields, owner, reason, and priority.
```

### Notion SOP
```text
Create Notion SOP for [process]. Route through Notion Systems Lead, SOP Manager, Department Lead, Reviewer, and Source-of-Truth. Produce page outline, owner, update cadence, and GitHub source reference.
```

### GitHub Issue/PR Creation
```text
Create GitHub issue/PR plan for [work]. Route through GitHub Records Lead, Department Lead, Reviewer, and PMO Handoff Owner. Include scope, files, validation, risk, source-of-truth links, and next action.
```

### Executive Review
```text
Run Executive Review Board on [completed work]. Evaluate all 14 ERB criteria, decide APPROVE/REVISE/BLOCK/ESCALATE, list required fixes, source-of-truth updates, founder approval need, and next prompt.
```

### Sync Propagation
```text
Sync BranchOps operating docs from master repo to [target repos]. Do not edit application code. Preserve repo-specific AGENTS.md. Update only requested docs, refetch files, compare v3 headers/content markers, and report commit SHAs and validation notes.
```
