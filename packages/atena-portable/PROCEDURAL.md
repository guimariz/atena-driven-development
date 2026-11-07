# Optional procedural integration — DRAFT r1 / ADD distribution 0.5.0

This is author-owned ADD code, not a bundled engine. It reads bounded data and prepares plans; it has **no runner, install, import or execution command**. Each setup/program/recipe action from unrecognized software still needs specific confirmation after reviewing identity, exact command/cwd, dependencies/sources, network, effects, outputs and isolation. A plan or metadata flag is not permission. Do not run vendor doctor/tests/builds or import recipes as a diagnostic shortcut.

```
atena-add procedural pilots --json
atena-add procedural inspect <explicit-install-root> --tool noct-2d --archive <approved-archive.zip>
atena-add procedural inspect <explicit-install-root> --tool noct-3d --archive <approved-archive.zip>
atena-add procedural plan <new-isolated-work-copy> --tool noct-2d --pilot P2D-001
atena-add procedural plan <new-isolated-work-copy> --tool noct-3d --pilot P3D-001
atena-add procedural verify <output-root> --manifest <output-contract.json>
```

`inspect` reads only an explicit root's package/build/requirements/license metadata. It never scans the machine, reads npm credentials, loads modules or runs interpreters from that root. Archive SHA-256/size can be compared with the approved attachment identities; matching archive bytes does not authenticate its publisher or prove the root was extracted from that archive. No archive was successfully materialized locally in SPEC-021 r2. The dependency/version/license facts in the registry came from the parent's separate static analysis, not a successful local engine check. Metadata presence is not proof of an authorized working installation.

The 2D attachment is NoctAssetForge 2.5, SHA-256 `016c2f170f36bac1ecfebdd33b02bb1ccc6297944bbbbc08f0729f5eb92b6ff0`. It must not be confused with the previously found local 1.0.0 checkout. Outputs are PNG/JPEG/atlas JSON; the bounded pilot contract here selects PNG/JSON, not editable SVG.

The 3D attachment is named v2 but reported package/build metadata is **1.0.0 dirty**. Identify it by SHA-256 `bbf566bd35bcffd0dd2ca00826800f076957becda0411aab2233e8da2a9589cc` until resolved. It reports GLB/BBModel/PNG, not a complete PBR pipeline. Python recipes execute code with inherited environment and no engine sandbox. Serialize generations: regenerating geometry can overwrite BBModel. Preserve old output references/hashes. Windows is documented; POSIX is not validated. Blockbench is optional and must not be launched without the applicable confirmation.

Licenses reported by the static audit permit outputs subject to terms/input rights, but restrict software redistribution and services. Never bundle engine/runtime/templates/viewers/corpus in ADD, the game or a public package. Each machine/account must obtain tools legitimately. No service/publication or cloud transfer is enabled by these commands.

## Pilots and readiness

`payload/procedural/pilots.json` contains author-created textual visual bibles, identity N/A reasons, scene, reference revisions and budgets. P2D-001 is a one-frame 64x64 generic ore icon plus atlas; P3D-001 is a generic crate (1 metre reference, <=1500 triangles) plus GLB/BBModel/PNG. Both are **DRAFT** technical tests, not game canon. The optional 2D-to-3D bridge uses only the reviewed PNG bytes/hash, never code or runtime. No real pilot output has been generated.

BLOCKING for engine execution: local readable source/extraction provenance, exact reviewed recipe entrypoint/bytes and per-action confirmation. Dependency install/browser download source details may also be unresolved. Plan commands explicitly retain null commands/placeholders as blocked; do not execute them. RESOLVABLE: explicit paths, dependency pins and isolated environment/write limits. DEFERRED: production integration, animations/rig and PBR-complete requirements, real Dot/cloud/other-machine/account validation. Next step is static source inspection and specific action approval, not engine invocation.

## Output contract

Supply schema 1, assetId, revision, state DRAFT, kind 2d/3d, toolId, approved sourceArchiveSha256, bible {id, revision, state, authorizedDraftUse when DRAFT}, identity {applicability, reason for N/A or reference/revision}, scene, rights {outputs: cleared, privacy: project-approved, evidence}, provenance {recipeSha256, executionEvidence}, budgets, explicit files [{path, role, sha256}] and review.

2D requires roles image (.png) and atlas (.json). The normalized ADD atlas has schema 1, image (exact declared PNG path), and frames [{x,y,w,h}]. Normalize only metadata in a reviewed handoff; do not assume the vendor atlas already uses this schema. 3D requires mesh (.glb), editable (.bbmodel), texture (.png). Arbitrary recipes/runtime/scripts or URI-based external dependencies are refused. Keep all source files; outputs alone are candidates for a later scoped import.

The validator checks file hashes and bounded PNG headers/chunks, atlas bounds, GLB v2 container/mesh count metadata and BBModel JSON. It does not decode pixels/check PNG CRC, fully validate glTF buffers, render images/meshes or run Blockbench. Complete technical validation needs separately approved tools and actual target evidence. It rejects oversized or structurally invalid outputs. It reports pending visual/human/target checks; supplied review locators are not authenticated acceptance. There is no staging/import command in this phase. A later import must review the actual technical/visual result, rights, destination and concurrency and receive its applicable authorization.

The existing safe cleanup flow remains separate. Preserve masters, originals, CANON, active output consumers and pending-license files. Show preview/hash/impact, use recoverable quarantine only under authorized scope and never infer unused status from age or a missing text link. No real artifact cleanup accompanies procedural inspection.
