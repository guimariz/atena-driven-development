# atena-add 0.2.0 — local distribution

Requires Node >=20 and npm. No runtime dependencies, install hooks or network operations in the CLI. The package is private to prevent accidental registry publication.

Install an explicitly approved local archive with `npm.cmd install --offline --ignore-scripts --no-audit --no-fund --save-exact D:\path\atena-add-0.2.0.tgz`.
Then use the local binary (`node_modules/.bin/atena-add.cmd` on Windows):
`atena-add preview .`, followed by `atena-add adopt . --apply` when adoption is authorized.
Do not use npx with a remote package name.

The CLI appends an owned AGENTS.md block, snapshots the methodology under .atena/methodology/0.2.0 and initializes only missing workspace files. Existing canon, plans and configuration remain authoritative. Unmodified snapshots and blocks are required for idempotence/updates; conflicts fail before ordinary writes. An I/O interruption may leave partial output: do not blindly retry after a failure; inspect the backup and snapshot.

Updates: install a reviewed newer archive explicitly, preview and adopt again. Old snapshots remain. Before overwriting instructions/receipt the CLI stores their exact prior bytes as base64 in .atena/install-backups/<id>.json. Recover by reviewing/restoring those two fields; a null means the file did not exist. Do not delete project content or reset state to recover. This release does not automate rollback or remote upgrades.

Phrases only guide a capable assistant that reads the project instructions. No global phrase registration, model, independent agents or client integration is installed. Methodology source is DRAFT distribution 0.2.0; adopting it does not promote project intent to CANON.
