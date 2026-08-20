# ADD workflow

## Lifecycle

1. **Discover**: understand the request and ask only questions needed to avoid a risky assumption.
2. **Draft**: create a proposal under `vault/drafts/` or a draft spec under `specs/`.
3. **Analyze**: identify missing information, alternatives, risks, dependencies, affected canonical records, and the proposed process.
4. **Approve intent**: the user accepts, edits, or rejects the proposal before initial promotion to canon.
5. **Specify**: create or update a bounded spec with acceptance criteria and non-goals.
6. **Plan**: produce tasks, expected file changes, tests, evidence, and any approval checkpoint.
7. **Approve the plan of flight**: the user authorizes the bounded scope, validation, limits, and recovery approach once.
8. **Execute autonomously**: AI performs the approved scope and pauses only for a stop condition.
9. **Verify**: collect test results, observations, unresolved items, and changed files.
10. **Reconcile**: propose updates to affected canonical records and regenerate derived artifacts.

## Required gates

| Gate | Required before | The user sees |
| --- | --- | --- |
| Initial canon / intent change | Establishing or changing vision, rules, architecture, or lore | diff, source/evidence, relations, contradictions |
| Plan of flight | A bounded spec's local execution | scope, alternatives, affected files, tests, limits |
| Sensitive context | Sending vault content to a remote model | exact context, recipient/provider, reason |
| Destructive action | Delete, overwrite, reset, migration | targets, backup/recovery option, consequence |
| Publication | GitHub push or other external sharing | destination, files, secrets/privacy scan |

After a plan of flight is approved, normal code changes, validation, generated artifacts, evidence, and operational vault updates do not create additional gates. See [AUTONOMY.md](AUTONOMY.md).

## Process recommendations

The assistant must recommend a process in this format:

```text
Recommendation: <action>
Reason: <observable trigger>
Benefit: <expected outcome>
Scope: <what it may read/write>
Alternatives: <one or more viable alternatives>
Approval needed: <yes/no and why>
```

### When to recommend a skill

Recommend a skill when a procedure is repeatable, stable, and useful across multiple specs. A skill is a documented workflow, not an extra model persona.

### When to recommend an agent

Recommend an agent for a bounded, specialist-like assignment with one owner, one deliverable, and an explicit read/write scope.

### When to recommend multi-agents

Recommend multiple agents only if the work can be split into independent streams, their outputs can be reconciled, and they do not edit the same artifacts. Name an integration owner. Otherwise use one agent.

## Completion rule

A change is complete only when its acceptance criteria are verified, evidence is recorded, and every changed canonical fact has either an automatic operational update, an approved intent update, or an explicit statement that no canonical update is required.
