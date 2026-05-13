# Permission Boundaries

BranchOps Codex Agency Operating System
Version: v4.2 Unified Final Max - Skill Packs + Cannabis / Hemp / Regulated Markets
Master Source: OffDaBranchHoldings/Branch-Off-Holdings
Rule: Do not manually edit local repo copies except when syncing from master.

| Area | Roles That May Edit / Draft | Required Review | Blocked Without Review |
|---|---|---|---|
| application code | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| tests | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| GitHub Actions | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| deployment configs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| database schemas | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| legal/governance docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| trust/succession docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| financial docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| intercompany docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| source-of-truth records | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| public website content | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| brand/IP docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| secrets/auth-related files | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| domain/DNS docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| mobile app code | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| game code | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| apparel/product docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| curriculum docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| sales/marketing docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| grants/public-sector docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| support/customer docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| analytics/reporting docs | Routed department builder role with matching skill pack | Department reviewer, Risk/Compliance Owner when relevant, SOT Owner | secrets, production credentials, unrelated code, unapproved legal/tax/public claims |
| cannabis/hemp compliance docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis license/application docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis municipal/zoning docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis product safety docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis packaging/labeling docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis testing/COA docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis marketing claims docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis banking/tax docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis seed-to-sale/inventory docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis recall/adverse-event docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis workforce training docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |
| cannabis vendor/white-label docs | Cannabis department builder roles, Cannabis Compliance Lead, Legal Handoff Owner | Cannabis Compliance Lead, Legal/Regulatory, SOT Owner, Founder Gate when triggered | submission, launch, public claim, license filing, regulated product approval |

## Global Blocked Actions
- No role may edit secrets, tokens, .env files, private keys, OAuth credentials, or production credentials.
- No role may deploy production without Deployment Risk Lead and Release Manager review.
- No role may change legal/entity/tax/trust documents without Legal/Compliance and Founder Decision Gate.
- No role may alter IP ownership records without IP Ownership Director review.
- No role may change pricing, royalties, intercompany flows, or payment logic without Finance/Treasury review.
- No role may make public legal, tax, medical, compliance, funding, or regulated-industry claims without review.
- No role may submit grants, bids, public-sector responses, contracts, or legal filings without Founder Decision Gate.
- No role may mark work complete without validation or documented validation limits.
- No role may provide instructions for illegal cannabis cultivation, manufacturing, extraction, trafficking, shipping, or sales.
- No role may create unlicensed cannabis launch plans.
- No role may recommend evading state, federal, municipal, banking, tax, age-gating, advertising, or seed-to-sale requirements.
- No role may make medical, therapeutic, disease-treatment, pregnancy, breastfeeding, pet-health, or dosage claims without legal/scientific review.
- No role may approve cannabis packaging or labeling without compliance review.
- No role may approve cannabis marketing without advertising/public-claims review.
- No role may approve cannabis product specs without product safety and testing review.
- No role may approve cannabis banking/tax plans without finance/tax review.
- No role may approve cannabis launch without founder decision gate.
- No role may submit cannabis license applications, cannabis grants, cannabis bids, cannabis contracts, or cannabis regulatory filings without founder approval.
