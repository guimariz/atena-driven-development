# ADD workflow

## Lifecycle

1. **Discover**: understand the request and ask only questions needed to avoid a risky assumption.
2. **Draft**: create a proposal under `vault/drafts/` or a draft spec under `specs/`.
3. **Analyze**: identify missing information, alternatives, risks, dependencies, affected canonical records, and the proposed process.
4. **Approve intent**: the user accepts, edits, or rejects the proposal before promotion to canon.
5. **Specify**: create or update a bounded spec with acceptance criteria and non-goals.
6. **Plan**: produce tasks, expected file changes, tests, evidence, and any approval checkpoint.
7. **Approve execution**: the user authorizes the exact plan or a selected option.
8. **Execute**: AI performs only the approved scope.
9. **Verify**: collect test results, observations, unresolved items, and changed files.
10. **Reconcile**: propose updates to affected canonical records and regenerate derived artifacts.

## Required gates

| Gate | Required before | The user sees |
| --- | --- | --- |
| Canonical promotion | Moving draft knowledge to `vault/canon` | diff, source/evidence, relations, contradictions |
| Execution | Material file/code/content changes | plan, scope, alternatives, affected files, tests |
| Sensitive context | Sending vault content to a remote model | exact context, recipient/provider, reason |
| Destructive action | Delete, overwrite, reset, migration | targets, backup/recovery option, consequence |
| Publication | GitHub push or other external sharing | destination, files, secrets/privacy scan |

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

A change is complete only when its acceptance criteria are verified, evidence is recorded, and every changed canonical fact has either an approved vault update or an explicit statement that no canonical update is required.
