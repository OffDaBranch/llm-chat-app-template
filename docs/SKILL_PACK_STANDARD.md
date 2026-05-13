# Skill Pack Standard

BranchOps Codex Agency Operating System
Version: v4.2 Unified Final Max - Skill Packs + Cannabis / Hemp / Regulated Markets
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Required Folder
Every BranchOps skill pack lives under `codex-home/skills/<skill-name>/`.

## Required Files
- `SKILL.md`
- `examples.md`
- `checklist.md`
- `validation.md`
- `escalation.md`
- `test-prompts.md`

## Required Fields
1. Skill name
2. Purpose
3. Used by roles
4. When to use
5. When not to use
6. Required inputs
7. Required context
8. Required files/docs to inspect
9. Allowed actions
10. Blocked actions
11. Step-by-step procedure
12. Validation checklist
13. Required reviewer
14. Escalation triggers
15. Source-of-truth updates
16. Expected output format
17. Example good output
18. Example bad output
19. Test prompts
20. Failure modes
21. Recovery steps

## Skill Authoring Rules
- YAML description starts with `Use when`.
- Link back to `docs/SKILL_PACK_INDEX.md`.
- High-risk skills require normal, edge-case, and failure/escalation test prompts.
- Cannabis/hemp skills include jurisdiction, license, public-claims, SOT, legal/compliance, and founder gates.
