# ADD portable contract v0.2

## Required files and folders

```text
.atena/
  add.yaml
  vault/
    canon/
    drafts/
    research/
  specs/
  evidence/
  generated/
  state/
    plan.yaml
```

`.atena/automation/` is optional until a skill or agent is approved.

`atena/` is a legacy v0.1 path. A v0.2 validator should detect it and report a migration requirement rather than silently treating both directories as canonical.

`state/plan.yaml` is persistent local operational state. It is required even when no plan is active, in which case its plan, cursor, and suspension values are `null` and its deferred-request list is empty. It is not a canonical-vault record and must not be used to rewrite intent or approval history.

## `add.yaml` fields

```yaml
add_version: "0.2"

project:
  id: "PRJ-example"
  name: "Example"

interaction:
  default_mode: "direct"
  atena:
    trigger: "explicit-address"
    mode: "guided"
  direct_execution:
    allow_without_spec: true
    reconciliation: "propose-after-change"

specification:
  require_zero_blocking_gaps: true
  allow_explicit_defer: true
  recommend_defaults: true

bootstrap:
  tooling_checks:
    rtk:
      enabled: true
      required: false
      ask_if_missing: true
      ask_once: true
      status: "unknown" # unknown | enabled | declined | unsupported

policies:
  remote_context: "scoped-remote-context"
  draft_writing: "allowed"
  publishing: "explicit-approval"
  dependencies: "allowlist-with-plan"

autonomy:
  profile: "guarded-autopilot"
  execution_approval: "per-spec"
  report_mode: "exceptions-and-final"
  max_retries: 3

git:
  local_commits: "automatic-on-run-branch"
  direct_local_commits: "project-policy"
  merge: "explicit-approval"
  publish: "explicit-approval"

skills:
  record_opportunity_after_repetitions: 2
  propose_after_repetitions: 3

graph:
  mode: "derived"
  output: "generated/graph.production.json"
```

Projects may add fields. They must not redefine the meaning of the required fields in a way that hides a mandatory gate.

## Canonical record metadata

Every canonical record starts with frontmatter containing at least:

```yaml
id: "DEC-001"
type: "decision"
title: "Local-first workspace"
status: "approved"
created: "YYYY-MM-DD"
reviewed: "YYYY-MM-DD"
relations:
  - type: "supports"
    target: "CAP-001"
sources: []
```

Allowed initial types include `vision`, `constraint`, `decision`, `capability`, `requirement`, `risk`, `entity`, `location`, `faction`, `event`, `timeline`, `rule`, and `research-claim`.

## Spec contract

Each spec folder contains:

```text
spec.md
plan.md
tasks.md
acceptance.md
```

A spec must reference at least one canonical record or explicitly state that it creates the initial record.

### Required spec metadata

```yaml
id: "SPEC-001"
title: "Example change"
status: "draft"
origin: "planned" # planned | post-hoc
implementation_preceded_spec: false
created: "YYYY-MM-DD"
```

For post-hoc reconciliation:

```yaml
origin: "post-hoc"
implementation_preceded_spec: true
```

Do not change these markers to make the history look planned.

## Gap contract

Planned specs track unresolved items under three classes:

- `BLOCKING`: must be zero before `ready-for-approval`.
- `RESOLVABLE`: Atena records a grounded default/decision and may continue.
- `DEFERRED`: explicitly outside current scope and acceptance criteria.

A validator should reject a `ready-for-approval` planned spec with unresolved `BLOCKING` gaps.

## Planned approval contract

A planned `plan.md` contains one plan-of-flight approval record. Approval:

1. confirms the bounded outcome and scope;
2. promotes the prepared spec to `approved`;
3. authorizes ordinary in-scope local implementation under the selected autonomy profile;
4. does not authorize always-approve actions unless they are separately and explicitly approved.

## Plan coordination contract

Every planned `plan.md` activated under this contract has a stable `PLAN-XXX` identifier and stable execution-step identifiers such as `S-001`. While implementation is active, `.atena/state/plan.yaml` is the authoritative operational return point. Its required shape is:

```yaml
version: 1
active_plan:
  id: "PLAN-001"
  spec_id: "SPEC-001"
  current_step: "S-004"
  total_steps: 8
  status: "ACTIVE"
plan_cursor:
  current: "Validate the contract"
  next: "Record evidence"
suspension: null
deferred_requests: []
```

The normative machine-readable shape is [`schemas/plan-state.schema.json`](schemas/plan-state.schema.json). A validator must reject malformed state and must report these semantic violations:

- an active plan without a matching active cursor;
- a cursor step not present in the referenced plan;
- a suspension without an active plan and saved cursor;
- duplicate deferred-request IDs;
- an unknown plan, spec, request, or step reference.

Before executing a new user request while `active_plan.status` is `ACTIVE`, Atena must classify it:

- `IN_PLAN` — execute normally. Clarifications, small corrections, decisions requested by Atena, and changes necessary to complete the current step are `IN_PLAN`.
- `PLAN_DEVIATION` — do not execute until the Plan Deviation Gate records the user's route.
- `PLAN_CHANGE_REQUEST` — analyze impact on scope, decisions, steps, acceptance criteria, evidence, and recovery before replacing the active plan. The prior approval does not authorize the replacement.

For route A of a Plan Deviation Gate, persist `suspension` and its saved cursor and set `active_plan.status` to `SUSPENDED` before the parallel execution. Restore that cursor, return the status to `ACTIVE`, and clear `suspension` after the parallel work completes. For route B, append a `DEV-XXX` record with `status: PENDING` to `deferred_requests`; do not silently execute it later. Mandatory safety and approval gates still apply to either route.

## Post-hoc plan contract

For `origin: post-hoc`, `plan.md` is a reconstructed implementation map. It must state that it was produced after implementation and must not contain a fabricated prior approval.

## Validation rules

- `.atena/` is the only canonical v0.2 workspace root.
- IDs are unique and never reused.
- Relations use known types and point to existing IDs where required.
- Canonical intent cannot be rewritten without an approved successor or revision record.
- Operational canonical fields may be updated automatically only when caused directly by an authorized change and recorded in evidence.
- Every planned spec includes objective, scope, non-goals, acceptance criteria, impact, gap state, and validation.
- Every executable planned spec has a plan-of-flight approval, evidence, and reconciliation result.
- Every active planned spec has valid state in `.atena/state/plan.yaml`.
- A `PLAN_DEVIATION` has either a recorded suspension or a pending deferred request before execution continues.
- A planned spec cannot be approved with unresolved `BLOCKING` gaps.
- Every post-hoc spec preserves `origin: post-hoc` and `implementation_preceded_spec: true`.
- Direct Execution does not waive mandatory gates in `AUTONOMY.md`.
- The spec defines its quality gates; no predefined project type is required.
- RTK status never determines whether an ADD project is valid.
