# Discovery — SPEC-004

Date: 2026-10-07, America/Sao_Paulo.

## Request and classification

The user addressed Atena and required visual bible, character identity, position and scene structure before visual agents/skills act; requested recommendations across game types, verification of bible activation and approval modes, visible progress/next steps and explicit draft/canon transitions.

Root operational state is idle. This is new Guided ADD proposal preparation and a refinement of pending drafts, not a replacement/deviation of an active approved plan. SPEC-003 remains unapproved; current requirements do not silently authorize its implementation.

## Inspection

Read the authoritative game/interaction/workflow/autonomy/policy/contract docs, current templates, config/state and pending SPEC-003. The template includes game discovery and bible instructions; report_mode defaults to exceptions-and-final. Root methodology repository has no on-disk AGENTS.md; this chat has user-supplied project instructions.

Read project instruction/config/state files for the two game projects returned by the local project inventory. Both root AGENTS copies lack the current game creation section and an explicit visual-bible requirement; both contain approval-mode and draft/canon guidance. Nottgard's config has exceptions-and-final. No claim is made that this identifies the user's reported game or the exact instructions of a past run. Source directories were inspected only; no files in other games were changed. Git-root inspection was denied, so full ancestor/override precedence remains unverified. Global AGENTS inspection also did not find an explicit visual-bible rule.

The user was asked to identify the affected project/chat. That answer is required for a specific historical diagnosis/migration, which is outside this upstream proposal's acceptance.

## Official documentation

Used OpenAI Docs to verify [AGENTS discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md) and [skill discovery](https://learn.chatgpt.com/docs/build-skills). The docs establish instruction precedence/loading and that portable templates alone are not automatically adopted runtime instructions/skills. External queries used generic documentation terms and no local game/vault excerpts.

## Approval audit

[schema-audit.json](schema-audit.json) contains nine synthetic, read-only fixtures evaluated with the existing dependency-free schema evaluator. Supported modes pass; unconfigured active mode fails. PENDING is a valid persisted shape. Missing active cursor, unknown references, out-of-plan steps and mode/checkpoint inconsistency can pass shape validation, demonstrating the need for semantic checks already required by CONTRACT.md. No operational state or actual execution approval was changed.

The existing publication checker validates idle state, not the full active-plan workflow. Existing evidence documents per-plan completion but does not demonstrate all live mode transitions. This audit therefore verifies written/structural controls, not full agent compliance or the past reported behavior.

## Prepared recommendation

Drafted the readiness/progress/status proposal, exact proposed DEC-002 content and complete SPEC-004. Suggested other bounded game roles without creating/invoking them. SPEC-003 is to be refined to depend on the readiness requirement, preserving a separate checkpoint and the earlier proposal history.

## Authority and limits

Only preparation/research/evidence records are authorized so far. No official methodology/configuration, canon, installed skills, live agents or other-project files were modified. Plan mode remains unconfigured; approval pending. Specific-game migration, actual packages, live model/game checks and publication remain deferred.

## Preparation checks

[checks.json](checks.json) records the reused structural checker's results for this proposal snapshot: required paths, complete spec companions, unique root IDs, local destination links, UTF-8/headings and schema-valid idle state. This is preparation evidence, not verification of implementation acceptance. Schema auditing and structural checking used the existing restricted parser/evaluator, with unsupported syntax/keywords rejected and external URLs/fragment anchors excluded. The final check also confirmed official tracked files have no diff; only draft/research/spec/evidence additions are present.
