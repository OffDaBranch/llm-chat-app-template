# CODEX_HOME Portable Setup

BranchOps Codex Agency Operating System
Version: v4.2 Unified Final Max - Skill Packs + Cannabis / Hemp / Regulated Markets
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

## Portable Layout
```text
branchops-codex-os/
  codex-home/
    AGENTS.md
    config.toml
    rules/
      branchops.rules
    skills/
      ...
    templates/
      ...
  install/
    setup-codex-home.ps1
  README.md
```

## Windows Setup
Set CODEX_HOME to the codex-home folder, restart Codex/terminal sessions, and verify skills are visible.

## Verification Command
```powershell
$env:CODEX_HOME
Get-ChildItem $env:CODEX_HOME\skills | Measure-Object
```

## What To Sync
codex-home/AGENTS.md, config.toml, rules, skills, templates, and operating docs.

## What Not To Sync
Secrets, tokens, .env, credentials, private keys, production credentials, local caches.

## Security Warnings
Do not store credentials, private keys, OAuth tokens, bank credentials, tax IDs, wallet keys, production data, customer private data, cannabis license portal passwords, or seed-to-sale credentials in portable CODEX_HOME.

## New Device Setup
Run install/setup-codex-home.ps1 after review. Verify AGENTS.md is lightweight and points to docs.

## Rollback
Unset CODEX_HOME or point it back to the previous known-good folder.

## Sync v4.2 Into New Devices
Use master repo as source, copy only portable Codex OS files, and verify counts: 376 skill folders and six files per skill folder.
