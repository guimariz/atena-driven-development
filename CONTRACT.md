# ADD portable contract v0.1

## Required files and folders

```text
atena/
  add.yaml
  vault/canon/
  vault/drafts/
  vault/research/
  specs/
  evidence/
  generated/
```

`automation/` is optional until a skill or agent is approved.

## `add.yaml` fields

```yaml
add_version: "0.1"
project:
  id: "PRJ-example"
  name: "Example"
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
  merge: "explicit-approval"
  publish: "explicit-approval"
skills:
  record_opportunity_after_repetitions: 2
  propose_after_repetitions: 3
graph:
  mode: "derived"
  output: "generated/graph.production.json"
```

## Canonical record metadata

Every canon record starts with frontmatter containing at least:

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

Allowed initial types: `vision`, `constraint`, `decision`, `capability`, `requirement`, `risk`, `entity`, `location`, `faction`, `event`, `timeline`, `rule`, `research-claim`.

## Spec contract

Each spec folder contains `spec.md`, `plan.md`, `tasks.md`, and `acceptance.md`. A spec must reference at least one canonical record or explicitly state that it creates the initial record.

## Validation rules

- IDs are unique and never reused.
- Relations use known types and point to existing IDs.
- Canonical intent cannot be rewritten without an approved successor or revision record.
- Operational canonical fields may be updated automatically only when caused directly by an approved spec and recorded in its evidence.
- Every spec includes scope, non-goals, acceptance criteria, and impact.
- Every executable spec has a plan-of-flight approval, evidence, and a reconciliation result.
- The spec defines its quality gates; no predefined project type is required.
