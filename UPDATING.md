# Upgrade and recover

Run the NEW reviewed package's CLI against the existing project:

```sh
node packages/atena-portable/bin/atena-add.cjs status ../my-project --details --json
node packages/atena-portable/bin/atena-add.cjs update ../my-project
node packages/atena-portable/bin/atena-add.cjs update ../my-project --apply
node packages/atena-portable/bin/atena-add.cjs status ../my-project --details --json
```

The candidate source defaults to this package. Public latest remains unknown; GitHub publication is not an automatic update channel. Review versions, changes, source hashes and local rules. Unknown/manual adoptions need their own comparison. Same version with different managed bytes is a conflict, not an update. Downgrades are blocked.

Project canon, knowledge, conversation plans, local configuration and text outside the managed AGENTS block are preserved. Prior version snapshots remain. Custom edits INSIDE managed files or the managed block stop the operation; plan a reviewed migration rather than forcing overwrite. This candidate was tested from real preserved 0.3.0 r3; no claim is made that arbitrary forks migrate automatically.

After interrupted I/O, inspect status and the project journal/backups before retrying. recover <project> previews scoped recovery; recover <project> --apply restores only eligible instruction/receipt bytes. Snapshot/bootstrap data and backups remain. Recovery refuses concurrent changes and active locks; never remove a lock without verifying the owning process and obtaining the applicable authorization. repair <project> with the exact installed package can restore missing owned files; modified bytes require review. Do not restore an empty plan or delete canon.

No installation in another OS/account or automatic Dot/cloud loading is implied by local tests. Reauthorize target actions in each environment.
