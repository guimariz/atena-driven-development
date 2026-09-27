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
```

`.atena/automation/` is optional until a skill or agent is approved.

`atena/` is a legacy v0.1 path. A v0.2 validator should detect it and report a migration requirement rather than silently treating both directories as canonical.

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
- A planned spec cannot be approved with unresolved `BLOCKING` gaps.
- Every post-hoc spec preserves `origin: post-hoc` and `implementation_preceded_spec: true`.
- Direct Execution does not waive mandatory gates in `AUTONOMY.md`.
- The spec defines its quality gates; no predefined project type is required.
- RTK status never determines whether an ADD project is valid.
