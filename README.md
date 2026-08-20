# Atena Driven Development (ADD) v0.1

ADD is an open, local-first method for structuring projects and knowledge vaults with AI under human direction. Its default autonomy profile is **Autopilot Guarded**: the AI executes an approved bounded change independently and pauses only for meaningful exceptions.

ADD is project-type agnostic. A project defines its own quality gates in its canonical vault and specs instead of selecting a predefined profile.

> Intent -> canonical vault -> process recommendation -> spec -> plan -> approval -> execution -> evidence -> updated memory.

It works with Codex, Claude, local models, or another capable assistant. It does not require a proprietary application, database, or cloud service. A future Atena executable is a user interface and orchestrator for the same files.

## What this package contains

- [ADD.md](ADD.md): definition, principles, and artifact model.
- [WORKFLOW.md](WORKFLOW.md): the operational lifecycle and approval gates.
- [AUTONOMY.md](AUTONOMY.md): the Autopilot Guarded profile, stop conditions, and quality loop.
- [POLICIES.md](POLICIES.md): local-first, privacy, canonical-content, and Git policies.
- [CONTRACT.md](CONTRACT.md): portable folder contract and validation rules.
- [templates](templates): copyable templates for a vault, spec, skill, and agent.
- [example-project](example-project): a minimal initialized ADD workspace.

## Quick start

1. Copy the `atena/` folder from `example-project/` into a new or existing project.
2. Edit `atena/add.yaml` to set the project identity and policies.
3. Create an initial proposal in `atena/vault/drafts/` using the canonical-record template.
4. Review and approve the initial project intent before it becomes canonical.
5. Create one change folder under `atena/specs/` using the spec template.
6. Approve its plan of flight once. Atena then executes the in-scope local work, validates it, reconciles operational vault facts, and reports the result.
7. Atena pauses only for a stop condition or an always-approve action listed in [AUTONOMY.md](AUTONOMY.md).

## Core rule

AI may create drafts, make in-scope local changes, validate them, generate evidence, and update operational facts after the plan of flight is approved. It may not silently change canonical intent, publish, make destructive changes, alter security-sensitive behavior, or send sensitive context to a remote provider.

## Status vocabulary

`draft` -> `proposed` -> `approved` -> `implemented` -> `verified` -> `superseded`

Only `approved` canonical records may drive an implementation plan. `implemented` and `verified` add execution evidence; they do not replace the original intent.

## License

Use, adapt, and version this package in the project repository that adopts it.
