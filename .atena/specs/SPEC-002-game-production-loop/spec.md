---
id: "SPEC-002"
title: "Optional game experiment, asset and playable delivery records"
status: "draft"
origin: "planned"
implementation_preceded_spec: false
created: "2026-10-07"
canonical_refs:
  - "DEC-001"
---

# Optional game experiment, asset and playable delivery records

## Objective

Make the existing game path easier to apply through short, optional records that connect a testable question, a playable delivery, observed results and the next decision. This draft proposes future work; the current user request authorized analysis and recommendations, not implementation of this extension.

## Context and evidence

- [Current review and recommendations](../../vault/drafts/game-creation-review-2026-10-07.md).
- [Approved game path](../../vault/canon/DEC-001-game-guidance.md).
- [Prior documentary validation and limits](../../evidence/SPEC-001-game-guidance/result.md).
- [Preparation evidence](../../evidence/SPEC-002-game-production-loop/discovery.md).
- Existing guide and five templates cover hypotheses and playtests; executable examples and provider integrations remain deferred.

## Scope

- Add optional `experiment.md`, `asset-manifest.md` and `milestone-delivery.md` game templates.
- Explain their use and link them in GAMES.md, prototype readiness and playtest.
- Include bounded experiments, evidence-based follow-up, milestone identifiers, execution instructions and applicable checks.
- Include parameter adjustment ranges only when authorized by the game's plan; preserve approval for material intent changes.
- Preserve existing interview, visual bible before technical recommendation, ADD contract and approval semantics.

## Non-goals

- Build a game, choose an engine for an undefined game, run a playtest or claim runtime validation.
- Install dependencies, produce/acquire assets, connect providers, spend credits or create skills/agents.
- Change schemas, mandatory workspace paths, permission policies or the existing canonical decision.
- Publish, push, merge, deploy or create external replicas.
- Establish universal numerical thresholds, mandatory metrics or a compulsory vertical slice.

## Proposed decisions

| Decision | Proposed choice | Rationale | Status |
| --- | --- | --- | --- |
| Footprint | Three optional templates, three existing document updates | Reuse the established ADD path | proposed |
| Language | English official documents; Portuguese analysis | Existing repository convention | proposed default |
| Experiment | Question, bounded recut, observation, time/content limit and follow-up | Turn current hypotheses into actionable iterations | proposed |
| Delivery | Identifiable playable artifact, instructions, checks and pending feedback | Separate implementation claims from execution evidence | proposed |
| Assets | Origin, known usage terms, readiness and applicable import requirements | Make admission explicit without selecting providers | proposed |
| Canon | No new canonical record in this scope | Proposal concerns optional operational records; approved pillars remain authoritative | proposed |

## Gaps

### BLOCKING

- None for the proposed documentary scope. Approval mode and checkpoint remain pending authorization requirements; they are not treated as granted by this analysis.

### RESOLVABLE

- Record size: use concise fields and only applicable sections; reuse references rather than copy existing vision/design.
- Experimental limits and adjustment ranges: chosen per game milestone; do not impose numerical defaults globally.
- Asset fields: mark inapplicable requirements and unknown terms explicitly.

### DEFERRED

- Game pilot, engine adapter and behavioral evaluation require separately bounded specs and approvals.
- Asset production/provider integrations, performance work and release requirements depend on a concrete game.

## Acceptance criteria

- [ ] AC-1: All three optional templates exist and explain where to store plans and actual evidence.
- [ ] AC-2: Experiment records identify a question, limits, observations, actual results and a follow-up decision; invented results are forbidden.
- [ ] AC-3: Delivery records identify artifact/version/platform, launch instructions, controls, limitations, checks and pending human feedback.
- [ ] AC-4: Asset records distinguish reference, placeholder, candidate and admitted assets, preserving unknown provenance/terms as unresolved.
- [ ] AC-5: Guide, readiness and playtest link the records without making all fields/documents mandatory.
- [ ] AC-6: Engine recommendation remains last in initial definition; technical checks never establish enjoyment; approved intent is preserved.
- [ ] AC-7: Existing and new local links resolve; no duplicate IDs or headers are introduced; required ADD paths and idle/active state remain valid.
- [ ] AC-8: Result evidence states documentary validation limits and reconciles actual files and remaining deferred work.

## Impact

### Expected files/systems

- `GAMES.md`.
- `templates/game/prototype-readiness.md` and `templates/game/playtest.md`.
- `templates/game/experiment.md`, `asset-manifest.md` and `milestone-delivery.md`.
- This spec, plan, preparation/result evidence and execution cursor during an approved run.

### Canonical impact

No promotion or revision of canonical records is proposed. Official process additions require approval of this exact scope. Any later conflict with canonical intent triggers review rather than silent revision.

## Plan of flight and validation

See [PLAN-002](plan.md) for sequence, pending approval, checks and recovery. Validate with a small completed fictional record explicitly labelled illustrative, plus structural/link checks. Documentary validation does not prove model adherence or game quality.

## Evidence and reconciliation

Preparation is recorded in [discovery.md](../../evidence/SPEC-002-game-production-loop/discovery.md). After authorized implementation, record actual changes and AC results in `result.md`, distinguish illustrative data from actual execution, and clear plan state only after the terminal outcome is documented.

## Risks

- Excess paperwork: optional, concise records and references to existing documents.
- Scope drift into production: stop at documentation and preserve deferred work.
- Mistaking illustrative evidence for real tests: explicit labels and pending statuses.
- Tuning changes altering intent: bounded approved ranges and existing material-change gates.

## Post-hoc disclosure

Not applicable. No official implementation of this proposed extension preceded the spec. Inspection and draft preparation are discovery work, not implementation.
