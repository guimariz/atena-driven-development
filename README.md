# Atena Driven Development (ADD) v0.1

ADD is an open, local-first method for structuring projects and knowledge vaults with AI under human approval.

> Intent -> canonical vault -> process recommendation -> spec -> plan -> approval -> execution -> evidence -> updated memory.

It works with Codex, Claude, local models, or another capable assistant. It does not require a proprietary application, database, or cloud service. A future Atena executable is a user interface and orchestrator for the same files.

## What this package contains

- [ADD.md](ADD.md): definition, principles, and artifact model.
- [WORKFLOW.md](WORKFLOW.md): the operational lifecycle and approval gates.
- [POLICIES.md](POLICIES.md): local-first, privacy, canonical-content, and Git policies.
- [CONTRACT.md](CONTRACT.md): portable folder contract and validation rules.
- [templates](templates): copyable templates for a vault, spec, skill, and agent.
- [example-project](example-project): a minimal initialized ADD workspace.

## Quick start

1. Copy the `atena/` folder from `example-project/` into a new or existing project.
2. Edit `atena/add.yaml` to set the project identity and policies.
3. Create an initial proposal in `atena/vault/drafts/` using the canonical-record template.
4. Review the proposal; only then promote it to `atena/vault/canon/`.
5. Create one change folder under `atena/specs/` using the spec template.
6. Follow the approval gates in [WORKFLOW.md](WORKFLOW.md) before code changes, publishing, deletions, or remote-model context transfer.

## Core rule

AI may create proposals and evidence automatically. It may not silently alter canonical knowledge, make material changes, publish, delete, overwrite, or send sensitive context to a remote provider.

## Status vocabulary

`draft` -> `proposed` -> `approved` -> `implemented` -> `verified` -> `superseded`

Only `approved` canonical records may drive an implementation plan. `implemented` and `verified` add execution evidence; they do not replace the original intent.

## License

Use, adapt, and version this package in the project repository that adopts it.
