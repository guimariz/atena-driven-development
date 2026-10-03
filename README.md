# Atena Driven Development (ADD) v0.2

ADD is an open, local-first method for structuring projects and durable project memory with AI under human direction. Its default autonomy profile is **Autopilot Guarded**.

ADD v0.2 introduces an explicit interaction protocol:

- Address **Atena** explicitly to enter **Guided ADD**, where Atena structures the change, closes meaningful gaps, recommends the simplest sufficient plan, asks the user to choose an approval level, and then implements and validates within approved checkpoints.
- Give a direct imperative without addressing Atena to use **Direct Execution**, where ordinary local work may be performed immediately and Atena proposes a truthful post-hoc reconciliation afterward.

> Intent -> mode detection -> project evidence -> recommendation -> spec -> plan -> approval -> active cursor -> execution -> validation -> evidence -> reconciled memory.

ADD is project-type agnostic and provider agnostic. It can be used with Codex, Claude, Hermes, local models, or another capable assistant. The project files remain the durable contract.

## What this package contains

- [ADD.md](ADD.md): definition, principles, and artifact model.
- [INTERACTION.md](INTERACTION.md): Atena invocation, Guided ADD, Direct Execution, gap handling, and interaction practices.
- [WORKFLOW.md](WORKFLOW.md): lifecycle, readiness rules, reconciliation, and approval gates.
- [AUTONOMY.md](AUTONOMY.md): Autopilot Guarded, direct-execution authority, stop conditions, and quality loop.
- [POLICIES.md](POLICIES.md): local-first, privacy, canonical-content, dependency, Git, and reconciliation policies.
- [CONTRACT.md](CONTRACT.md): portable `.atena/` folder contract and validation rules.
- [schemas/plan-state.schema.json](schemas/plan-state.schema.json): machine-readable active-plan and cursor state contract.
- [assets/atena-mark-eyes-v2.png](assets/atena-mark-eyes-v2.png): official Atena Mark graphical asset.
- [templates](templates): copyable templates for canonical records, specs, skills, and agents.
- [example-project](example-project): a minimal ADD v0.2 workspace with planned and post-hoc examples.

## Quick start

1. Copy `example-project/.atena/` into the root of a new or existing project.
2. Copy [templates/AGENTS.md](templates/AGENTS.md) to the project root, then add only the project's own local-tool or domain rules.
3. Edit `.atena/add.yaml` to set project identity and policies.
4. On the first Atena interaction in the project, Atena checks the ADD workspace and the optional RTK optimization.
5. Use `Atena, ...` when you want Guided ADD.
6. Review the recommended plan, resolve blocking gaps, and choose approval by plan, batch, or step. The approved checkpoint activates the persisted plan cursor and authorizes only its bounded implementation.
7. Use a direct imperative without addressing Atena when you intentionally want immediate local implementation. Afterward, reconcile the implementation into a `post-hoc` spec.
8. Atena pauses for the stop conditions and always-approve actions in [AUTONOMY.md](AUTONOMY.md).

## Interaction examples

### Guided ADD

```text
Atena, add Google authentication to the application.
```

Atena should inspect the project, explain the relevant decisions, recommend defaults, identify gaps, prepare the spec and implementation plan, and request approval only when the plan is ready.

### Direct Execution

```text
Add a settings page using the project's existing components.
```

The requested ordinary local change may be implemented directly. After implementation, Atena must disclose that the change preceded an ADD spec and offer to create a truthful `post-hoc` spec and reconcile the canonical vault.

### Reconcile an existing direct change

```text
Atena, reconcile the change I just made.
```

Atena inspects the actual implementation and evidence instead of pretending that a prior spec existed.

## Core rules

- `.atena/` is the canonical ADD workspace directory for v0.2.
- `atena/` is a legacy v0.1 workspace. Detect it and propose migration; do not silently rename it.
- Explicitly addressing Atena activates Guided ADD. Merely quoting or mentioning the word `Atena` as content does not.
- Guided ADD requires zero unresolved `BLOCKING` gaps before approval.
- `RESOLVABLE` gaps should receive a recommended default instead of unnecessary questioning.
- `DEFERRED` items remain visible and explicitly outside the current scope.
- While a plan is active, every new request is classified as `IN_PLAN`, `PLAN_DEVIATION`, or `PLAN_CHANGE_REQUEST` before execution.
- A deviation either saves and restores the cursor after parallel work or remains a visible `DEV-XXX` deferred request.
- Every planned spec asks the user to choose approval by plan, batch, or step; a pending checkpoint stops ordinary implementation.
- Atena Mark identifies only the Atena orchestration layer: `◈ ATENA` in chat and `[ATENA]` in plain text. It never labels tools, subagents, logs, code, or produced content.
- Direct Execution bypasses the pre-implementation spec/plan workflow, not destructive, security, privacy, publication, credential, or other always-approve gates.
- Never fabricate history. A spec created after implementation uses `origin: post-hoc` and `implementation_preceded_spec: true`.
- Prefer minimum sufficient architecture, reuse before creation, and repository evidence over assumptions.

## RTK optimization

At the beginning of a project, Atena checks whether the optional [RTK](https://github.com/rtk-ai/rtk) token-saving CLI is available using `rtk --version` and `rtk gain`. If the correct RTK is not available, Atena briefly explains its purpose and asks whether the user wants it configured. The choice is recorded so the question is not repeated unnecessarily.

RTK is recommended, not required. ADD must remain usable without it.

## Status vocabulary

Canonical records:

```text
draft -> proposed -> approved -> implemented -> verified -> superseded
```

Specs:

```text
draft -> ready-for-approval -> approved -> implemented -> verified -> superseded
```

A `post-hoc` spec may enter at `implemented` after reconstruction, but it must preserve its real origin and evidence.

## Migrating from v0.1

When `atena/` exists and `.atena/` does not, treat the workspace as legacy. Present the planned rename and affected references, then migrate only after approval. Do not maintain two competing canonical workspaces.

## License

Use, adapt, and version this package in the project repository that adopts it.
