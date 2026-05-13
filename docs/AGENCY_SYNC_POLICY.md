# Agency Sync Policy

BranchOps Codex Agency Operating System
Version: v4.2 Unified Final Max - Skill Packs + Cannabis / Hemp / Regulated Markets
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Master Source
`OffDaBranchHoldings/Branch-Off-Holdings` controls the operating doctrine. Other repos receive synced copies or references.

## Local Repo Copy Policy
Local copies are read-only operating doctrine unless explicit sync from master is requested. Repo-specific `AGENTS.md` instructions must be preserved.

## Sync Process
Fetch master, verify v4.2 headers and expected file set, copy only operating docs and portable Codex assets, do not edit application code or secrets, do not overwrite repo-specific AGENTS.md, commit docs-only changes, refetch/compare, and report SHAs.

## Drift Detection
Compare headers, file hashes, skill counts, department counts, role counts, and skill eval counts.

## Master-First Rule
If doctrine changes, update master first, validate, then propagate.

## Future GitHub Action Checker Design
A future workflow may verify version headers, skill folder file counts, AGENTS.md preservation, forbidden file changes, and cannabis docs propagation readiness.

## Propagation Prompt
```text
Use GitHub to propagate BranchOps v4.2 operating docs and codex-home skills from OffDaBranchHoldings/Branch-Off-Holdings to all BranchOps repos. Update only synced operating docs and portable Codex assets. Preserve repo-specific AGENTS.md. Return repo-by-repo commit SHAs and validation.
```

## Rollback Plan
Use Git revert on the docs-only sync commit. Do not reset branches or delete repo-specific instructions.

## Cannabis Docs Sync Policy
Cannabis/hemp regulated-market docs require legal/compliance/founder-aware review before propagation when content changes claims, license assumptions, product safety, testing, packaging, banking/tax, or public-market guidance.
