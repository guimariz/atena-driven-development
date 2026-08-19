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
  mode: "project" # project | knowledge | hybrid
policies:
  remote_context: "review-before-remote"
  draft_writing: "allowed"
  canonical_promotion: "explicit-approval"
  execution: "explicit-approval"
  publishing: "explicit-approval"
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
- Approved records cannot be rewritten without an approved successor or revision record.
- Every spec includes scope, non-goals, acceptance criteria, and impact.
- Every execution has evidence and a reconciliation result.
