---
id: "PLAN-XXX"
spec_id: "SPEC-XXX"
status: "draft" # draft | approved | active | completed | superseded
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
status: pending
approved_at: null
approved_by: null
scope_revision: 1
```

When the user approves the complete plan of flight, update this record and promote the spec to `approved`.

For post-hoc specs, write `Not applicable — implementation preceded specification.`
