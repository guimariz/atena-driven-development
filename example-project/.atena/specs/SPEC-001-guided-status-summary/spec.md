---
id: "SPEC-001"
title: "Add a project status summary"
status: "approved"
origin: "planned"
implementation_preceded_spec: false
created: "2026-09-27"
canonical_refs:
  - "DEC-001"
---

# Add a project status summary

## Objective

Add a short `PROJECT-STATUS.md` file that shows the example project's current ADD mode and workspace path.

## Scope

- Create `PROJECT-STATUS.md` in the example project root.

## Non-goals

- No automation or runtime command is added.

## Decisions

| Decision | Choice | Evidence / rationale | Status |
| --- | --- | --- | --- |
| Workspace path | `.atena/` | Canonical decision DEC-001 | decided |
| Interaction modes | Guided ADD + Direct Execution | ADD v0.2 interaction contract | decided |

## Gaps

### BLOCKING

- None.

### RESOLVABLE

- None.

### DEFERRED

- Automated status generation is outside this example.

## Acceptance criteria

- [x] `PROJECT-STATUS.md` states that `.atena/` is the workspace.
- [x] It names Guided ADD and Direct Execution.

## Impact

- New documentation file only.
