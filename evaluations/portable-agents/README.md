# Three-condition agent evaluation — DRAFT r1, PLAN-021

Compare the **same cases** in three conditions: A generic native executor without specialist instructions; B specialist instructions executed sequentially; C a native executor with the same specialist instructions, task brief and bounded handoff. A native lifecycle is not itself domain knowledge. Do not reuse results from PLAN-020 or change its state.

Sources of the specialist candidate: `templates/automation/marizverso/skills/marizverso-stanley/SKILL.md` and `marizverso-prometeus/SKILL.md`, their linked reviewed local notes, and the ADD handoff/asset-lifecycle contract. Knowledge remains DRAFT. No V05/V07 transcript or candidate Blender guidance is assumed reviewed.

Before running, freeze task/instruction bytes and runtime/model/build/effort, applicable authorization and budget. Give executors only their case and permitted input, not condition labels, grading or other outputs. Demonstrate fresh context, no cross-arm memory or rubric reads, bounded tools and output capture. Native delegation available in the parent does not prove a controlled isolated evaluator. If these cannot be demonstrated, leave runs pending and report the precise missing capability; never substitute a self-authored expected response.

Use `cases.json` for the shared tasks and `rubric.json` only for assessment. Run three repeats per condition initially (4 cases x 3 conditions x 3 repeats = 36 outputs); randomize/balance condition order and freeze it before collection. Compare quality, correction count, duration and actual usage/cost when exposed; report unknown costs rather than estimates without a tariff. Judge continuity/canon, specific pending gaps and evidence honestly. Keep per-task paired results; do not call repeats independent tasks or claim that a small text pilot validates art quality.

Logs: case ID, condition, repeat, input/instruction SHA-256, observed executor configuration, start/end/duration, actual tool calls/reads, output path/hash, usage/cost or unknown, assessor provenance and criterion results with locators. Store only task-scoped synthetic data in this evaluation. No credentials, imported private corpus, live project edits, generation spending or publication.

Mechanical readiness tests can verify case IDs and links. They cannot measure model behavior. Human review remains required for actual HQ rhythm, final readability and asset aesthetics; runtime operations need actual evidence.

## Current readiness

NOT RUN. This session exposes native delegation but no verified tool-read isolation or blind same-runtime A/B/C harness. The earlier PLAN-020 preflight also records isolation/watchdog limitations; its approvals and cursor do not authorize a new experiment. Sources/cases/rubric are prepared here; no behavioral scores or model usage are fabricated. Next action: establish an explicitly bounded evaluator with deny tests for rubric/cross-arm access, then freeze model/cost/config and collect the pilot.
