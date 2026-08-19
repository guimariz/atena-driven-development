# Atena Driven Development

## Definition

Atena Driven Development (ADD) is a local-first, human-approved process in which a canonical vault preserves a project's intent and an AI recommends and performs bounded work against that intent.

ADD is not a model, IDE, or code generator. It is a contract for coordinating a user, one or more AI tools, and a durable project memory.

## Goals

- Turn an idea or requested change into a visible, reviewable path to an outcome.
- Preserve product and knowledge intent beyond a single AI conversation.
- Allow AI assistance without handing it silent authority.
- Keep project information portable as folders, Markdown, and structured data.
- Make each meaningful change traceable to intent, approval, implementation, and evidence.

## Non-goals for v0.1

- Replacing the user's engineering judgment.
- Treating generated text or graph relations as canonical without review.
- Requiring a specific AI provider, graph database, or vault application.
- Automatically publishing to GitHub or using remote LLMs.

## Three artifact layers

### 1. Canonical vault

The vault contains durable knowledge: vision, constraints, decisions, capabilities, risks, glossary, architecture, accepted lore, timelines, and sourced research conclusions. Records have stable IDs and lifecycle status.

### 2. Change specs

A spec is a bounded unit of work: a feature, correction, research task, lore arc, consistency repair, or migration. It states what changes, why, acceptance criteria, impact on canonical records, and what must not change.

### 3. Derived artifacts

Graphs, context packs, indexes, manifests, and summaries are generated consumers of the first two layers. They are refreshed and validated; they are not edited as a competing source of truth.

## Canonicality

Content is canonical only when all apply:

1. It is stored in `vault/canon/`.
2. Its metadata status is `approved`, `implemented`, `verified`, or `superseded`.
3. It has an immutable ID and a review record.

Research and model output are evidence, not canon, until promoted by a user-approved proposal.

## Supported modes

ADD uses the same contract for both modes:

| Mode | Typical canonical records | Typical spec |
| --- | --- | --- |
| Project | vision, requirements, architecture, decisions, risks | feature, fix, migration, integration |
| Knowledge / lore | entities, locations, factions, events, timelines, rules, sources | research, new arc, contradiction repair, canon review |

## Human authority

The user approves intent, material changes, promotion to canon, execution scope, deletion/overwrite, publication, and remote-context transfer. AI may draft, inspect, validate, and recommend within the current task.
