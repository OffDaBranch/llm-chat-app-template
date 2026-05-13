# Knowledge Maps

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Purpose
Knowledge maps tell Codex what to inspect before work begins. A role cannot perform work from title alone; it must inspect the relevant repo map, governing docs, configs, validation path, and source-of-truth systems.

## Website Repo
- Inspect first: `AGENTS.md`, `README.md`, `docs/`, `package.json`, app routes/pages/components, forms, analytics, privacy content, deployment config.
- Governing docs: `BRANCHOPS_REPO_OPERATING_PACK.md`, `TASK_ROUTING_MATRIX.md`, `PERMISSION_BOUNDARIES.md`, `VALIDATION_RUBRICS.md`.
- Configs that matter: framework config, env examples, Cloudflare/Vercel config, form handlers, analytics/SEO metadata.
- Likely validation: typecheck, lint, build, responsive/manual browser check, form smoke test.
- Source-of-truth updates: GitHub docs, Airtable lead/CRM mapping, Notion SOP, Mailchimp audience/campaign, Cloudflare/Vercel if deployed.

## AI / Cloudflare Repo
- Inspect first: `AGENTS.md`, `README.md`, `wrangler.*`, `package.json`, `workers/`, `src/`, `db/schema.sql`, `migrations/`, `docs/`.
- Governing docs: Cloudflare docs, AI platform docs, security/privacy rules, validation rubrics.
- Configs that matter: Worker bindings, D1/R2/KV/Queues/AI Gateway config, auth/access config, route definitions.
- Likely validation: typecheck, build, route smoke test, Wrangler dry run/dev, migration validation.
- Source-of-truth updates: GitHub, Cloudflare, Airtable system registry, Notion SOP, security review records.

## Corporate Governance Repo
- Inspect first: `AGENTS.md`, `docs/`, `source-authority/`, registers, policies, resolutions, agreements, document indexes.
- Governing docs: source authority hierarchy, legal/compliance rules, permission boundaries, escalation matrix.
- Configs that matter: document IDs, version history, signing status, entity layer, source authority references.
- Likely validation: source authority check, document status check, legal disclaimer presence, no secrets/tax IDs.
- Source-of-truth updates: GitHub controlled docs, Airtable registries, Notion policies, founder/legal review queues.

## Game Repo
- Inspect first: `AGENTS.md`, `README.md`, game engine config, package/project files, assets, scenes, gameplay code, design docs.
- Governing docs: Game Studio playbook, IP/Brand rules, validation rubrics, permission boundaries.
- Configs that matter: engine/build config, asset manifests, licensing notes, economy configs, platform targets.
- Likely validation: build/run/playtest, asset license check, economy/IP review, screenshot or smoke evidence.
- Source-of-truth updates: GitHub, Notion game design docs, Airtable asset registry, IP register, release notes.

## Mobile App Repo
- Inspect first: `AGENTS.md`, `README.md`, project config, package files, app source, signing/privacy docs, tests.
- Governing docs: Mobile/Engineering role cards, security/privacy, release validation, permission boundaries.
- Configs that matter: bundle IDs, signing config, API endpoints, permissions, privacy manifests, CI config.
- Likely validation: build, targeted test, simulator/device smoke, privacy/auth review if relevant.
- Source-of-truth updates: GitHub, Notion release notes/SOP, Airtable product roadmap, app store/release queue when applicable.

## Brand/IP Repo
- Inspect first: `AGENTS.md`, brand docs, IP registers, licensing docs, asset lists, trademark/copyright notes.
- Governing docs: IP/Brand/Licensing playbook, permission boundaries, source-of-truth rules.
- Configs that matter: asset IDs, ownership status, license terms, permitted use, royalty notes.
- Likely validation: ownership/source check, brand usage review, legal/finance escalation for terms.
- Source-of-truth updates: GitHub, Airtable IP registry, Notion brand manual, licensing pipeline.

## Operations/Automation Repo
- Inspect first: `AGENTS.md`, `README.md`, scripts, workflows, `.github/workflows`, docs, config examples.
- Governing docs: Automation/Workflow playbook, security/privacy, validation rubrics, sync policy.
- Configs that matter: workflow triggers, permissions, tokens references, schedules, API targets.
- Likely validation: dry run, unit/script test, action syntax check, failure recovery review.
- Source-of-truth updates: GitHub, Airtable workflow registry, Notion SOP, calendar/tasks for scheduled jobs.

## Curriculum/Workforce Repo
- Inspect first: `AGENTS.md`, curriculum docs, lessons, assessments, outcomes, compliance notes, source references.
- Governing docs: Education/Workforce playbook, validation rubrics, source-of-truth rules.
- Configs that matter: module structure, assessment criteria, certificate claims, learner outcome tracking.
- Likely validation: curriculum QA review, outcome alignment, compliance check, source check.
- Source-of-truth updates: GitHub, Notion curriculum pages, Airtable learner/product registry, grant/workforce records.

## Public-Sector/Grants Repo
- Inspect first: `AGENTS.md`, opportunity docs, solicitations, eligibility files, budgets, checklists, compliance requirements.
- Governing docs: Grants/Public Sector playbook, escalation matrix, permission boundaries.
- Configs that matter: deadlines, submission portals, eligibility fields, required attachments, budget narratives.
- Likely validation: eligibility review, compliance checklist, budget/document readiness, founder/legal gate.
- Source-of-truth updates: Airtable opportunities, Notion pursuit brief, GitHub package docs, calendar/tasks.

## Data/CRM Repo
- Inspect first: `AGENTS.md`, schema docs, Airtable/CRM mappings, Notion docs, reports, dedupe rules, pipelines.
- Governing docs: Data/CRM playbook, source-of-truth rules, privacy/security, analytics/reporting rules.
- Configs that matter: field schemas, record ownership, IDs, sync jobs, API scopes, retention rules.
- Likely validation: schema/field review, dedupe check, privacy review, sample record check.
- Source-of-truth updates: Airtable, Notion, GitHub docs, CRM/pipeline, reporting dashboards.
