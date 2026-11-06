# Artifact lifecycle — DRAFT r1

No broad automatic cleanup is enabled. Inventory uses an explicitly scoped JSON review manifest, hashes and bounded reference files. Original/source files, CANON or canonical evidence, current deliverables, active dependencies, uncertain rights, unknown ownership and changed bytes are protected. No age, filename or absence of text links is enough to select an artifact.

```
atena-add cleanup inventory <project> --manifest <review.json>
atena-add cleanup preview <project> --manifest <review.json>
atena-add cleanup quarantine <project> --manifest <review.json> --preview-hash <reviewed-hash> --apply
atena-add cleanup restore <project> --run <quarantine-id>
atena-add cleanup restore <project> --run <quarantine-id> --apply
atena-add cleanup canon-check <project> --manifest <review.json>
atena-add cleanup canon-copy <project> --manifest <review.json> --preview-hash <reviewed-hash> --apply
```

The command invocation must be covered by real user authorization; manifest claims never grant permission. Apply is bound to the reviewed preview hash and rechecks source/reference changes under the common project lock. Quarantine first copies and verifies bytes under `.atena/quarantine/<id>/files`, then removes only the selected derivative paths. Its manifest stays pending on interruption; restore refuses overwriting new work and retains quarantine copies. There is no permanent deletion command, expiry deletion or automatic lock removal. Stop other writers for the reviewed scope; the lock only coordinates writers that honor it, not every external process.

Manifest shape (illustrative, replace the review metadata and compute actual SHA-256):

```json
{
  "schema": 1,
  "project": "<exact absolute project root>",
  "reviewEvidence": "<locator for the actual scoped review>",
  "referenceFiles": ["README.md", "current-build-index.html"],
  "items": [{
    "path": "output/tests/old-preview.html",
    "kind": "derived",
    "state": "obsolete-test",
    "provenance": {"origin": "<source/build revision>"},
    "expectedHash": "<actual sha256>",
    "rights": "cleared",
    "active": false,
    "ownership": "exclusive-task",
    "reviewedUnused": true,
    "reason": "<evidence that this derivative is obsolete and is not a current deliverable>",
    "references": []
  }]
}
```

Other eligible state: `unused-generated`. Every path is project-relative and traversal/symlinks are refused. Explicit references, sourcePath/provenance consumers and dependency declarations protect sources. Text search is conservative and bounded; binary/runtime/external consumers need actual review. Missing reference scope fails rather than implying nothing uses the files. Sensitive locations are not read as cleanup candidates.

For an explicitly canonical image, use `canonical: true`, `state: "CANON"`, a real `canonEvidence` locator, `privacy: "project-approved"`, cleared rights, expected hash, an in-project `sourcePath`, exclusive task ownership and the intended project `path`. `canon-check` reports missing/mismatched copies and absent references. `canon-copy` creates only missing matching copies, preserves the source and refuses destination conflicts. At least one reviewed reference must already point to the intended canonical path; it does not rewrite documents silently. External intake and reference corrections require their own bounded task. Metadata does not promote content to CANON.

Large files are inventoried by actual size; no Git add, LFS configuration, push or remote sharing is performed. Resolve the project's large-file/rights policy before publication. This flow does not redistribute sources, dependencies or optional procedural tools.
