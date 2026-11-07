# Atena ADD portable 0.5.0 — local candidate

Requires Node >=20. No runtime dependencies, install hooks, network access or global setup. The CLI adopts files in an existing project; it does not install an AI client, agent runtime, Node, npm or optional tools.

Build from the maintainer repository using `node tools/build-atena-portable.cjs <new-output-directory>`. Run `node <output>/bin/atena-add.cjs help`. A packaged local tgz may be installed only in an explicitly selected project after reviewing dependency-file changes; no public registry release is claimed.

```
node <output>/bin/atena-add.cjs install <test-project>
node <output>/bin/atena-add.cjs install <test-project> --apply
node <output>/bin/atena-add.cjs update <test-project> --source <reviewed-local-package>
node <output>/bin/atena-add.cjs update <test-project> --source <reviewed-local-package> --apply
node <output>/bin/atena-add.cjs repair <test-project> --source <exact-installed-package>
node <output>/bin/atena-add.cjs status <test-project> --details
node <output>/bin/atena-add.cjs status <test-project> --json
node <output>/bin/atena-add.cjs agents <test-project> --json
node <output>/bin/atena-add.cjs doctor <test-project> --adapter dot-cloud --json
node <output>/bin/atena-add.cjs recover <test-project>
```

Install/update/repair/recover are previews unless `--apply` is explicit. `preview` and `adopt --apply` remain compatibility aliases for installation; update existing installations with `update`. `--ascii` provides a text header. `--source` accepts a local **package directory**, not an archive, URL or command. It verifies all manifest files. Integrity hashes detect changed bytes; choosing a trusted source remains the operator's responsibility.

`status` reports an update only when the selected, verified local candidate is newer than the receipt. Public latest remains unknown: no public channel was configured or queried. A package version is distinct from ADD workspace contract 0.2, profile revision, identity revision and client recognition. Details include those distinctions and pending integrations.

`repair` restores missing files of the exact owned version and a missing owned instruction block. Changed bytes, extra snapshot files and malformed/unknown ownership stop before writes; they require a reviewed migration or recovery, never a force overwrite. Existing config, canon, knowledge, conversation states and local instruction text are preserved. Old snapshots are retained. A repeat healthy install/update/repair is a byte-for-byte no-op.

Writes use an exclusive project lock, a backup under `.atena/install-backups/`, a pending `.atena/operation.json` journal and per-file atomic replacement. This is not a whole-filesystem atomic transaction. Compliant writers must honor the lock; editors outside the CLI are checked before each target write but cannot be universally locked. On failure, inspect status and journal before retrying. `recover --apply` restores only instruction/receipt bytes matching the recorded before/after state, retains snapshots/bootstrap data/backups, and refuses concurrent/custom changes. A stale lock is never removed automatically: verify the recorded process/host and absence of a writer before a separately authorized manual removal. Do not reuse a journal from another project or transport executable approvals.

For runtime diagnostics, `--adapter codex|dot-local|dot-cloud|generic` selects a capability contract. An optional `--observation <file>` must contain schema 1, adapter, exact absolute project path, observedAt, evidence and capabilities mapping names to observed/unavailable/unknown. This is operator-reported evidence, not authentication, authorization or automatic client registration. Unknown capabilities stay unknown. Files copied locally do not prove a cloud session loaded them.

Identity is in `payload/identity/manifest.json`; adapter contracts in `payload/adapters/`. Generic packaging excludes personal profiles, vaults, credentials and chat approvals. The [native agent library](agents/README.md), DRAFT r1 with authorized implementation, is bundled by default: Atena, Indiano, Odin, Miyazaki, Prometeus, Stanley, Zeus and Tolkien. Briefs and procedures are generic and self-contained; no personal Marizverso profile is needed. The optional [procedural adapter](PROCEDURAL.md) adds static inspection, output contracts and prepared DRAFT pilots. It has no engine runner. Each setup/program/recipe invocation requires specific confirmation; no NoctAssetForge software, runtime, templates, viewer or vendor instructions are embedded. Earlier distributions remain preserved.

New installations receive all eight role procedures and an explicit AGENTS.md bridge to the catalog. Existing installations receive them only through an approved `update --source <reviewed-0.5.0-package> --apply`; older snapshots, local instructions, canon, knowledge and conversation state are preserved. `agents` and `status` inspect the installed version, not the selected candidate: an old 0.4.0 install reports `not-bundled` even while a 0.5.0 update is available. An unhealthy snapshot reports `conflict` rather than a healthy role library. `doctor` includes the same role availability. All diagnostics are read-only.

To use a role, ask Atena for its domain or name the specialist. The assistant reads that role's procedure on demand and can execute it sequentially; installation does not launch eight independent processes. Independent delegation requires actual client support and authorization. Client recognition stays `unverified` until observed in that environment. The package is portable to supported Node environments, but tests in local fixtures do not prove adoption on another PC, OS, account or cloud client. Transfer the reviewed package rather than a maintainer workspace; there is no automatic memory synchronization.

The [artifact lifecycle](CLEANUP.md) adds `cleanup inventory|preview|quarantine|restore|canon-check|canon-copy`. It requires explicit reviewed candidates and hashes, protects originals/CANON/current builds, and uses recoverable quarantine rather than permanent deletion. No real project cleanup is activated by installation.
