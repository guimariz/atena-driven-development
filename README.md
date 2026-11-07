# Atena Driven Development — portable CLI 0.4.0

> Nova candidata local: [Atena 0.5.0 com oito agentes nativos](NATIVE-AGENTS.md). A biblioteca padrão inclui Atena, Indiano, Odin, Miyazaki, Prometeus, Stanley, Zeus e Tolkien; projetos existentes precisam de atualização explícita. Não transporta conhecimento pessoal nem instala runtimes independentes.

ADD is an open, local-first method for structuring projects and durable project memory with AI under human direction. Its default autonomy profile is **Autopilot Guarded**.

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

## Specialist library and visible plans

[Game specialist catalog](GAME-SPECIALISTS.md) contains ten portable skills and ten bounded agent briefs, recommended by Atena for concrete project needs. [Visual readiness](templates/game/visual-readiness.md) requires bible, applicable identity and scene context, with no position prerequisite.

The default reports current stage, remaining work and prepared next stage; [DRAFT/CANON transitions](POLICIES.md#explicit-content-maturity) are explicit. [Read-only semantic validation](tools/validate-add-state.cjs) complements the state schema. Repository templates require scoped local adoption; existing games/global configuration are not automatically migrated.


## Optional Marizverso coordination profile

Use the [coordination guide](AGENT-COORDINATION.md) for needs-based routing, specialist briefs, knowledge curation and proportional documentation. Portable sources do not install a runtime. Generic ADD does not require this profile. Copying this template alone does not adopt referenced files: resolve paths during adoption. Existing gates remain effective.

## Local installable distribution

See [installation guide](INSTALL.md) for the versioned local npm archive, explicit project adoption, activation phrases, specialist headers and recovery. No registry publication or client runtime is included.

See [release and machine-update guide](RELEASING.md) for isolated versioned builds, source selection, integrity checks, explicit GitHub publication and a controlled pilot. A published release does not automatically update another machine or an already-open chat.
