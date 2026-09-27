---
id: "DEC-001"
type: "decision"
title: "Use .atena as the ADD workspace"
status: "approved"
created: "2026-09-27"
reviewed: "2026-09-27"
relations: []
sources: []
---

# Use .atena as the ADD workspace

## Decision

The project uses `.atena/` as its only canonical ADD workspace.

## Consequence

A legacy `atena/` directory is treated as a migration signal, not as a second source of truth.
