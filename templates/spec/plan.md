---
id: "PLAN-XXX"
spec_id: "SPEC-XXX"
status: "draft" # draft | approved | active | completed | superseded
approval:
  mode: "unconfigured" # unconfigured | per-plan | per-batch | per-step
---

# Plan of flight — SPEC-XXX

## Plan mode

- Origin: `planned`
- Reconstruction: `false`

For a post-hoc spec use:

```text
Origin: post-hoc
Reconstruction: true
This document maps the implementation after the fact. It is not evidence of prior planning or approval.
```

## Recommended approach

What is the minimum sufficient implementation and why?

## Reuse

What existing project capabilities will be reused before creating new ones?

## Implementation sequence

1. `S-001` — <step and reason>
2. `S-002` — <step and reason>

Active planned work records its current and next stable step in `.atena/state/plan.yaml`. A post-hoc plan is never activated as an execution plan.

## Approval checkpoints

Select one mode before the plan becomes executable:

- `per-plan` — one `PLAN` checkpoint covers the complete approved plan.
- `per-batch` — define stable batches before execution:
  - `B-001` — <tasks covered by this batch>
- `per-step` — each stable `S-XXX` step is its own checkpoint.

```yaml
mode: "unconfigured"
checkpoints: []
```

## Expected changes

- `<path>` — <change>

## Validation

- `<command/check>` — <expected evidence>

## Limits

- Max retries: <n>
- Changed-file budget: <n or not applicable>
- Cost/time constraints: <if applicable>

## Recovery

How can the change be reverted or recovered safely?

## Mandatory gates

- <none, or list destructive/security/publication/etc. actions needing separate approval>

## Approval record

For planned specs only:

```yaml
mode: "unconfigured"
checkpoints:
  - id: "PLAN" # PLAN | B-XXX | S-XXX
    status: pending
    approved_at: null
    approved_by: null
    scope_revision: 1
```

When the user approves a checkpoint, update its record. Promote the spec to `approved` after the first applicable checkpoint is approved; pause again before every remaining `per-batch` or `per-step` checkpoint.

For post-hoc specs, write `Not applicable — implementation preceded specification.`
