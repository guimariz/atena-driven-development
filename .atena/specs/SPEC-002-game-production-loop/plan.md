---
id: "PLAN-002"
spec_id: "SPEC-002"
status: "draft"
approval:
  mode: "unconfigured"
---

# Plan of flight — SPEC-002

## Plan mode

- Origin: `planned`.
- Reconstruction: `false`.
- Revision: 1.
- Current status: proposal only; no implementation authorization or active cursor.

## Recommended approach

Extend the existing game guidance with three optional operational records. Recommend `per-plan` approval for the complete documentary scope; do not inherit the approval mode or authorization of SPEC-001. Mode selection remains the user's decision.

## Reuse

Reuse existing vision, design, visual bible, readiness, playtest, ADD specs and evidence locations. Avoid new schemas, dependencies and automation.

## Implementation sequence

1. `S-001` — Recheck scope, current game documents, contract and state; record the selected approval mode and checkpoint before activation.
2. `S-002` — Add the three optional templates with concise, applicable fields and truthful result statuses.
3. `S-003` — Update GAMES, readiness and playtest with use instructions and local links while preserving established decisions.
4. `S-004` — Review a clearly labelled fictional application and verify AC-1 through AC-7, contract paths, links and IDs.
5. `S-005` — Record actual outcome and limits, reconcile spec status and changed files, and clear the cursor after a documented terminal result.

## Approval checkpoints

Recommended route: one `PLAN` checkpoint for revision 1. Alternative `per-batch` or `per-step` routes must be selected and defined before execution. This draft does not activate the plan.

## Expected changes

Six official files listed in [spec.md](spec.md), plus this run's operational records and state when authorized. No canonical record edits.

## Validation

- Inspect each acceptance criterion against actual document content.
- Apply records to one fictional example, labelling every illustrative value and keeping real execution results pending.
- Resolve local Markdown links; check required ADD paths, root-scoped ID uniqueness and duplicate headings in affected documents.
- Validate operational state against the existing schema when activating and ending a run; unavailable validation tooling is a reported limitation, not an implicit pass.
- Review changes for preservation of engine ordering, subjective-feedback boundaries and approval rules.
- Record documentary evidence; no game runtime or model behavioral pass is claimed.

## Limits

- Maximum repair attempts per failing check: 3.
- Official changed-file budget: 6, excluding authorized run records/state.
- No external service calls, paid jobs, dependencies, assets, agents, publishing or canonical promotion in this plan.

## Recovery

Preserve the pre-run versions of affected documents locally. Restore only changes belonging to this run if needed, preserving unrelated work. Record a stopped/partial outcome before clearing an activated cursor.

## Mandatory gates

Approval of the documentary changes and approval-mode selection are required. Actions outside this scope need a separate proposal under the existing gates.

## Approval record

```yaml
mode: "unconfigured"
checkpoints:
  - id: "PLAN"
    status: pending
    approved_at: null
    approved_by: null
    scope_revision: 1
```

No approval is inferred from the user's request for analysis and recommendations.
