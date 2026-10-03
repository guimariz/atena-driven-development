# ADD workflow

## Entry classification

Every request begins by determining the interaction path defined in [INTERACTION.md](INTERACTION.md):

```text
request
  -> explicit Atena address -> Guided ADD
  -> otherwise              -> Direct Execution
```

A mention of the word `Atena` as content does not by itself activate Guided ADD.

## Guided ADD lifecycle

1. **Bootstrap**: locate `.atena/`, detect legacy `atena/`, load minimum relevant context, and perform the one-time RTK check when applicable.
2. **Understand**: restate the intended outcome and preserve decisions already made by the user.
3. **Inspect**: gather repository, runtime, canonical, configuration, and test evidence relevant to the change.
4. **Recommend**: propose the minimum sufficient architecture/process, prefer reuse, explain material trade-offs, and provide defaults.
5. **Specify**: prepare or update the bounded spec, non-goals, decisions, impact, and acceptance criteria.
6. **Resolve gaps**: classify gaps as `BLOCKING`, `RESOLVABLE`, or `DEFERRED`; eliminate all blocking gaps.
7. **Plan**: produce tasks, expected file/system changes, validation, evidence, limits, and recovery approach.
8. **Approve once**: present the complete plan of flight. Approval promotes the prepared spec to `approved` and authorizes its bounded implementation.
9. **Activate the plan cursor**: create or update `.atena/state/plan.yaml` with the active plan, current step, next step, and an empty suspension before implementation begins.
10. **Execute autonomously**: perform the approved scope under the selected autonomy profile; pause only for a stop condition or always-approve action.
11. **Verify**: collect test results, observations, changed files, visual evidence where applicable, and unresolved items.
12. **Record evidence**: preserve enough evidence to demonstrate acceptance without relying on model confidence alone.
13. **Reconcile**: update permitted operational facts, propose material canonical changes, regenerate derived artifacts, and clear the active plan only after its terminal result is recorded.

## Active-plan request handling

Before executing a new request during an active plan, classify it under the plan-coordination contract.

```text
new request
  -> IN_PLAN              -> execute current-plan work
  -> PLAN_DEVIATION       -> Plan Deviation Gate
  -> PLAN_CHANGE_REQUEST  -> impact analysis and revised-plan approval
```

For route A of a deviation, save the cursor in `suspension`, mark the active plan `SUSPENDED`, perform the parallel work, restore the cursor, return the plan to `ACTIVE`, announce the return to the plan, and continue. For route B, record a `DEV-XXX` pending request and continue the current step. A deferred request is visible work, not an automatically scheduled execution.

For a plan change request, preserve the prior plan and its cursor until the revised plan has been approved. Update plan state only after that approval; do not represent an unapproved replacement as active.

## Direct Execution lifecycle

1. **Understand the direct instruction** and bound it to the work explicitly requested.
2. **Inspect enough context** to avoid breaking existing conventions or reimplementing an existing capability.
3. **Execute ordinary local work** without requiring a pre-implementation ADD spec or plan approval.
4. **Respect mandatory gates** for destructive, security-sensitive, credential, privacy, publication, remote-context, dependency, and project-specific restricted actions.
5. **Validate** the resulting implementation using appropriate project checks.
6. **Disclose untracked ADD state**: state that implementation preceded the ADD spec.
7. **Offer post-hoc reconciliation**.
8. **If authorized, reconstruct truthfully** from implementation and evidence using `origin: post-hoc`.

## Spec readiness

A planned spec may reach `ready-for-approval` only when:

```text
BLOCKING == 0
```

`RESOLVABLE` items must have a recorded default/decision. `DEFERRED` items must be visible, intentional, and outside the current acceptance criteria.

## Required gates

| Gate | Required before | The user sees |
| --- | --- | --- |
| Initial canon / material intent change | Establishing or changing vision, business rules, architecture, security intent, or established lore | diff, evidence, relations, contradictions, impact |
| Plan of flight | Guided ADD bounded local execution | objective, decisions, scope, non-goals, acceptance, affected systems, tests, limits, recovery |
| Sensitive context | Sending sensitive or restricted project material to a remote model | exact context, recipient/provider, purpose, sensitivity |
| Destructive action | Delete, overwrite, reset, material migration, irreversible operation | targets, consequence, backup/recovery |
| Security-sensitive action | Authentication/authorization changes or weakening controls | behavior change, threat/impact summary, recovery |
| Publication | Git push, deploy, release, or other external sharing | destination, scope, secrets/privacy scan |

Direct Execution bypasses only the pre-implementation spec/plan gate. It does not bypass the other gates.

After a Guided ADD plan of flight is approved, normal in-scope code/content changes, validation, generated artifacts, evidence, and permitted operational vault updates do not create additional gates. See [AUTONOMY.md](AUTONOMY.md).

## Process recommendations

For a material process or architecture recommendation, use a compact form:

```text
Recommendation: <action>
Reason: <observable trigger/evidence>
Benefit: <expected outcome>
Scope: <what it may read/write/change>
Alternative: <viable alternative when material>
Default: <what Atena recommends using>
Approval needed: <yes/no and why>
```

### When to recommend a skill

Recommend a skill when a procedure is repeatable, stable, and useful across multiple specs. A skill is a documented workflow, not an extra model persona.

### When to recommend an agent

Recommend an agent for a bounded, specialist-like assignment with one owner, one deliverable, and an explicit read/write scope.

### When to recommend multi-agents

Recommend multiple agents only when work can be split into independent streams, outputs can be reconciled, and agents do not compete for the same artifacts. Name an integration owner. Otherwise use one agent.

## Completion rules

### Planned change

A planned change is complete only when:

- acceptance criteria are verified;
- evidence is recorded;
- changed canonical facts have an allowed operational update, an approved intent update, or an explicit no-update result;
- deferred items remain visible;
- derived artifacts required by the spec are refreshed.

### Direct change

A direct implementation may be operationally complete after validation, but it remains **ADD-unreconciled** until either:

- a post-hoc spec and reconciliation are completed; or
- the user explicitly declines reconciliation and that decision is recorded where project tooling supports it.
