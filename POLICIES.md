# ADD policies

## Local-first

The authoritative ADD workspace resides in the local project folder. Git or GitHub is optional replication, not the source of truth.

## Remote-model privacy

Local storage does not imply local inference. Before a remote LLM receives vault material, show the exact files or excerpts, provider, purpose, and sensitivity level. Record approval in the run evidence.

Suggested modes:

- `local-only`: no project content sent to remote providers.
- `review-before-remote`: show each context package for approval.
- `remote-allowed`: user allows non-sensitive, scoped context after a project-level policy review.

## Draft-first writing

AI may create a new draft automatically when it is the direct result of a user request. It must not silently promote, rewrite, overwrite, or delete canonical content. Promotion requires a visible diff and explicit approval.

## Evidence and research

Research lives outside canon until reviewed. Important claims record a source, date, confidence, and status. Use `hypothesis`, `candidate`, `canonical`, and `deprecated` for knowledge maturity.

## Git and publishing

Before a commit or push, check the staged scope, secrets, personal data, draft-only content, and generated files. Ask for the destination and explicit approval before publishing.

## Graph policy

Generate graph nodes and typed links from approved IDs and relations. Validation must flag broken links, duplicate IDs, unknown relation types, and specs lacking acceptance criteria. Do not let an inferred graph relation become canonical automatically.
