# Atena Driven Development — portable CLI 0.4.0

Local-first methodology and CLI for adopting ADD in a project. Node.js >=20 is required. No runtime dependencies, install hooks, global installation or private vault are required. This tree contains the source and payload of portable distribution 0.4.0 r1. Repository publication and an npm registry release are separate events.

Use a reviewed checkout that contains this package:

```sh
git clone https://github.com/guimariz/atena-driven-development.git
cd atena-driven-development
node packages/atena-portable/bin/atena-add.cjs help
node packages/atena-portable/bin/atena-add.cjs install ../my-project
node packages/atena-portable/bin/atena-add.cjs install ../my-project --apply
node packages/atena-portable/bin/atena-add.cjs status ../my-project --details --json
```

The target project must already exist. Review the preview before --apply. There is no npm install, npx download, personal SSH alias, global setup or account-specific path in this procedure. Verify the intended commit SHA against the selected remote ref before relying on a checkout. Pin the reviewed commit; no release tag or npm registry release is implied.

See [installation](INSTALL.md), [upgrade and recovery](UPDATING.md), [publication limits](RELEASING.md), [CLI details](packages/atena-portable/README.md), [cleanup](packages/atena-portable/CLEANUP.md), and [adapter contracts](packages/atena-portable/payload/adapters/CONTRACT.md).

Files installed in a project do not prove an AI client loaded them. Start a new conversation in that project and verify the adopted instruction revision. Dot local/cloud and another machine/account need their own runtime evidence. Personal specialists/knowledge, conversation approvals and procedural engines are excluded. Procedural program use is deferred; do not install or run engines to use ADD.

Optional sources: see [knowledge availability](KNOWLEDGE.md). Missing vault material is reported as unavailable; it is never fetched or silently fabricated.

Local source checks: node tools/test-distribution.cjs uses only Node and new synthetic fixture directories. It does not install tools or start a model/client. Optional --previous <reviewed-0.3-package> and --tgz <reviewed-local-archive> add explicit prior-version/archive checks; they are not private runtime dependencies.

## License

Use, adapt, and version this package in the project repository that adopts it.
