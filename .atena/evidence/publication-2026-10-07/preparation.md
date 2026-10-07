# GitHub publication preparation

Date: 2026-10-07, America/Sao_Paulo.

## Authority and scope

The user requested: `vamos subir elas para o github`, following a review identifying the local game guidance, document integrations, optional game templates and root ADD workspace as not yet published. This explicitly authorizes a local commit and publication of those changes to the existing repository, `guimariz/atena-driven-development`, on `main`.

The root plan state is idle. SPEC-001 is complete; SPEC-002 remains draft with an unconfigured approval mode and pending implementation checkpoint. Publication does not authorize implementation of SPEC-002 or change canonical intent. Historical records that excluded publication retain their original scope; this later request supplies separate publication authority.

## Local preparation

- Reviewed existing changes and root workspace records.
- Added missing draft [tasks](../../specs/SPEC-002-game-production-loop/tasks.md) and [acceptance](../../specs/SPEC-002-game-production-loop/acceptance.md) companions required by the portable contract. All extension implementation tasks and criteria remain pending.
- This small contract repair used Direct Execution before any new publication spec. No new prior plan or approval is fabricated; a separate post-hoc spec can be prepared if requested.
- No dependencies, engine choices, canonical decisions, approval history or active-plan state were changed.
- RTK 0.48.0 is available; gain inspection returned no tracking data. No global installation or configuration was performed.

## Validation

Structured results are in [checks.json](checks.json); the repeatable local checker is [validate-publication.cjs](../../generated/validate-publication.cjs). It validates required workspace paths, spec companions, root record IDs, headings, UTF-8, local Markdown destinations and idle plan state against all keywords in the current schema. It also scans the reviewed documentation for common GitHub token and private-key patterns.

The YAML parser deliberately supports only the mapping/scalar structures present in the configuration and idle state, rejecting unsupported syntax. The schema evaluator rejects unsupported keywords. Link fragments and external URLs are not validated. The credential-pattern scan is bounded and is not a general proof that no sensitive information exists. These are documentary checks; no game, model runtime or human playtest was evaluated.

## Publication status at preparation

The preceding comparison found local HEAD and GitHub main at `d34440a3fba98dddbaae0f7bc507e0c0b5c472ce`. This record precedes the new commit and push and therefore does not claim they have already succeeded. Completion requires a successful push and a fresh remote comparison with the resulting local commit.
