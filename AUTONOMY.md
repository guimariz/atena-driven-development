# Autopilot Guarded

## Purpose

Autopilot Guarded minimizes interruptions without treating an AI as infallible. The user approves the intended outcome and bounded plan once; the AI completes predictable local work autonomously and asks only when it reaches a defined exception.

## Plan of flight

Every executable spec must have one approval record that defines:

- intended outcome and acceptance criteria;
- allowed files, directories, and systems;
- validation commands and expected evidence;
- maximum duration, retries, changed-file count, and cost where applicable;
- whether non-sensitive remote context is allowed;
- rollback/recovery approach.

Approval authorizes all automatic actions below for that spec only. A new or materially expanded scope requires a new approval.

## Autonomy levels

| Level | Atena behavior |
| --- | --- |
| `guarded-autopilot` (default) | Executes an approved spec and reports by exception and at completion. |
| `supervised` | Presents a checkpoint before each major lifecycle phase. |
| `restricted` | Drafts and analyzes only; execution requires a separate approval. |

## Automatic after plan approval

- Read in-scope local files and inspect logs.
- Create drafts, specs, plans, tasks, generated artifacts, and evidence.
- Modify in-scope local content or code.
- Run non-destructive validation, tests, linters, formatters, and build commands.
- Retry bounded failures and apply in-scope fixes.
- Update operational canonical facts: implementation status, validation result, related files, and evidence references.
- Generate a review report, graph, and context pack.

## Pause conditions

Pause and explain the evidence when any condition applies:

- a product, canon, requirement, or architecture ambiguity changes the intended outcome;
- a new dependency, integration, permission, credential, or paid service is needed;
- validation fails after the retry limit or acceptance criteria cannot be demonstrated;
- a required change lies outside the allowed scope or exceeds a stated budget;
- a canonical conflict or unresolved contradiction is found;
- a security, privacy, data-loss, or production-impact risk is detected.

## Always-approve actions

The user must explicitly approve these even during autopilot:

- changing canonical intent, business rules, architecture, or established lore;
- sending sensitive vault content to a remote model;
- deleting, overwriting, resetting, or migrating material data;
- adding authentication, changing authorization, or weakening security controls;
- publishing, pushing, deploying, or sharing outside the local workspace.

## Dependencies and local Git

Use `allowlist-with-plan` for dependencies. Atena may install a project-local dependency automatically only when it is already on the project's allowlist and the approved plan of flight names it. A new dependency pauses the run and presents its purpose, version, license, security implications, alternatives, and lockfile impact. Atena never installs global system dependencies without approval.

Atena may create local commits on an isolated run branch or worktree when the plan permits it. Merge, push, release, and deployment always require explicit approval.

## Scoped remote context

With `scoped-remote-context`, Atena may send only the task's spec, explicitly related approved canonical records, in-scope code, project rules, and validation output to an approved remote model. It must exclude credentials, personal data, files marked `sensitive`, private research, and unrelated vault content. Every transfer records a local context manifest. A broad-vault request requires a preview and approval.

## Skills and agents

After two substantially similar procedures, Atena records a skill opportunity. On the third, it may propose a local skill with observed examples, estimated benefit, scope, permissions, alternatives, and validation. Creation still requires approval. It recommends an agent only for a bounded deliverable; it recommends multi-agents only for independent streams with a named integration owner.

## Quality loop

Before reporting completion, Atena must:

1. Validate the ADD contract and graph links.
2. Run the plan's automated checks.
3. Compare the result with the spec and acceptance criteria.
4. Run an independent review pass that searches for scope drift, regressions, and missing evidence.
5. Reconcile operational vault facts and record unresolved items.

No model score by itself is acceptance evidence. A spec is complete only when the observable acceptance criteria pass or the user explicitly accepts a documented exception.

For an interactive or visual outcome, the spec must explicitly state its visual validation method. Human visual review is recommended but is not an automatic blocking gate unless the spec requires it.

## Calibration by evaluation

Maintain a small suite of representative, previously reviewed tasks. Measure acceptance pass rate, regression rate, human corrections, retries, duration, and cost. Increase autonomous scope only after the profile succeeds consistently on that suite; reduce it after regressions.
