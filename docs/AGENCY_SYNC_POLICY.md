# Agency Sync Policy

BranchOps Codex Agency Operating System
Version: v3.0 Role Competency Max
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Purpose
This repo is the master source for the BranchOps Codex Agency Operating System. Other repositories may carry synced copies of the operating pack, but local copies must not drift by manual edits.

## Master Files
The master operating files are:

- docs/BRANCHOPS_REPO_OPERATING_PACK.md
- docs/ROLE_COMPETENCY_MATRIX.md
- docs/ROLE_CARDS.md
- docs/DEPARTMENT_PLAYBOOKS.md
- docs/TASK_ROUTING_MATRIX.md
- docs/SKILL_PACK_INDEX.md
- docs/VALIDATION_RUBRICS.md
- docs/ESCALATION_MATRIX.md
- docs/PERMISSION_BOUNDARIES.md
- docs/KNOWLEDGE_MAPS.md
- docs/SOURCE_OF_TRUTH_RULES.md
- docs/HANDOFF_TEMPLATE.md
- docs/EXECUTIVE_REVIEW_BOARD.md
- docs/CODEX_PROMPT_LIBRARY.md
- docs/AGENCY_SYNC_POLICY.md

## Sync Rules
1. Sync from master to local repos only when explicitly requested or when a repo audit identifies drift.
2. Update only operating-system docs unless the user explicitly requests application code changes.
3. Preserve repo-specific AGENTS.md instructions.
4. Do not overwrite local AGENTS.md files with master text.
5. After syncing, refetch target files and compare version headers and required content markers.
6. Report commit SHAs and validation notes per repo.

## Drift Classification
| Status | Meaning | Action |
|---|---|---|
| Current | file matches current v3 header and required content | no action |
| Missing | file does not exist | create only if user asks for propagation |
| Outdated | file exists but has older version or missing competency controls | update from master |
| Local extension | local repo has additional repo-specific instructions outside synced pack | preserve unless user requests consolidation |
| Conflict | local content contradicts master doctrine | escalate to Executive Review Board |

## Required Sync Validation
- Verify v3.0 header.
- Verify role-title-alone prohibition.
- Verify every-task control chain.
- Verify final response format.
- Verify department count and role count if the file contains roster data.
- Verify no AGENTS.md overwrite occurred unless explicitly requested.
