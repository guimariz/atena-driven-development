# ADD policies

## Local-first

The authoritative ADD workspace resides in the local project folder. Git or GitHub is optional replication, not the source of truth.

## Remote-model privacy

Local storage does not imply local inference. Before a remote LLM receives vault material, show the exact files or excerpts, provider, purpose, and sensitivity level. Record approval in the run evidence.

Suggested modes:

- `local-only`: no project content sent to remote providers.
- `review-before-remote`: show each context package for approval.
- `scoped-remote-context`: send only approved, task-relevant non-sensitive context and record a transfer manifest.

## Draft-first and operational writing

AI may create a new draft automatically when it is the direct result of a user request. After a plan of flight is approved, it may also update canonical operational facts that directly result from that spec: status, validation results, changed-file references, and evidence links.

It must not silently change canonical intent: vision, product rules, requirements, architecture, security decisions, or established lore. Those changes require a visible diff and explicit approval.

## Evidence and research

Research lives outside canon until reviewed. Important claims record a source, date, confidence, and status. Use `hypothesis`, `candidate`, `canonical`, and `deprecated` for knowledge maturity.

## Git and publishing

Before a commit or push, check the staged scope, secrets, personal data, draft-only content, and generated files. A plan of flight may allow automatic local commits on its isolated run branch. Always ask for the destination and explicit approval before merging, pushing, deploying, or publishing.

## Dependencies

The default policy is `allowlist-with-plan`. Atena may install a project-local dependency only if it is already allowlisted and named by an approved plan of flight. Any new dependency pauses the run for review; global installation always requires approval.

## Skills and agents

Record a skill opportunity after two similar procedures. Propose a skill after three with concrete examples, expected benefit, scope, permissions, alternatives, and validation. Do not create it without approval. Agents and multi-agents follow the same principle: recommend only when their bounded delivery or independent parallelism is demonstrable.

## Graph policy

Generate graph nodes and typed links from approved IDs and relations. Validation must flag broken links, duplicate IDs, unknown relation types, and specs lacking acceptance criteria. Do not let an inferred graph relation become canonical automatically.
