# Install ADD 0.4.0 locally

Use Node.js >=20 already installed. Read the source and verify the package hash through the approved delivery channel. A hash detects changed bytes; it does not authenticate an unknown publisher.

From a reviewed checkout containing this proposal, run node packages/atena-portable/bin/atena-add.cjs help. Create or select your project, then run install <project> for preview and install <project> --apply to adopt. Paths with spaces must be quoted. No npm dependencies are needed.

For a reviewed local atena-add-0.4.0-r1.tgz, inspect its paths and extract into a NEW local directory. The archive contains package/. From that directory run node package/bin/atena-add.cjs install <project> and then the same command with --apply. Do not extract over another installation. No remote package registry release is claimed.

status <project> --details --json reports installedVersion, source/integrity and runtime uncertainty. help identifies CLI version 0.4.0; --version is not implemented. --source accepts a verified local package DIRECTORY, not a TGZ/URL. Core installation does not install clients, model agents, Node, npm, browsers or asset engines. A new account authenticates its own services; never copy maintainer credentials or approvals.

The optional command node tools/build-atena-portable.cjs <new-output-directory> exports the verified frozen package from this checkout. It needs no maintainer vault or build dependencies, refuses existing destinations and does not rebuild changed sources under the same release identity.
