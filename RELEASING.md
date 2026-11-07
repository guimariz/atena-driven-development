# Distribuir e atualizar o ADD — DRAFT r1

O repositório local é autoritativo. GitHub é réplica e canal de distribuição. Uma release não atualiza máquinas, projetos ou chats por si só. O ADD genérico não inclui conhecimento pessoal, estado dos chats do mantenedor ou o perfil Marizverso.

## Preparar uma candidata local

Requer Node >=20, npm e Git já disponíveis. Não instala ferramentas ou publica em registro npm. A distribuição 0.2.0 existente é preservada; a candidata atual é 0.2.1, mantendo o contrato de workspace ADD 0.2.

```powershell
node tools/audit-add-release.cjs release-staging/audit.json
node tools/prepare-add-release.cjs 0.2.1 release-staging/add-0.2.1-r1
```

A preparação recusa destino existente e seleciona fontes explicitamente. Cria `source/`, manifesto de fontes e registro dos arquivos preservados. O gerador antigo roda somente dentro dessa cópia. Não executar `build-atena-package.cjs` na raiz para reconstruir 0.2.0 com fontes novas.

Na candidata, executar os testes e empacotar sem scripts de instalação:

```powershell
node release-staging/add-0.2.1-r1/source/tools/test-atena-package.cjs
node release-staging/add-0.2.1-r1/source/tools/validate-add-state.cjs --fixtures release-staging/add-0.2.1-r1/source/tools/fixtures/add-state.json
node release-staging/add-0.2.1-r1/source/tools/fixtures/chat-state.cjs
npm.cmd pack ./release-staging/add-0.2.1-r1/source/packages/atena-add --offline --ignore-scripts --pack-destination ./release-staging/add-0.2.1-r1
node tools/verify-add-release.cjs release-staging/add-0.2.1-r1
```

O verificador gera evidência, notas, roteiro piloto e `SHA256SUMS.txt` depois de testar o arquivo empacotado e atualizar uma fixture realmente instalada a partir do tgz 0.2.0. Ele pode rodar apenas em candidata ainda não finalizada; não altera releases publicadas. O teste é local e não comprova atualização em outra máquina.

## Revisar antes de enviar

Revisar inventário de fontes e conteúdo derivado, diff, histórico alcançável, achados de privacidade/segredos e condições de redistribuição. Um scan por padrões é evidência parcial. A ausência de .atena nova no pacote não remove registros históricos já rastreados no Git. `.gitignore` não desrastreia arquivos existentes.

`source-manifest.json` fixa o conteúdo de entrada; `publication-files.json` registra os bytes finais selecionados para uma alteração Git. O payload gerado fica no tgz e não precisa ser commitado. O estado local `.atena/`, o conhecimento privado, temporários e arquivos antigos não entram em novos commits por conveniência. O `AGENTS.md` publicável deriva do template portátil; o arquivo local do mantenedor permanece intacto. O guia de coordenação distribuído declara que o perfil pessoal está ausente.

Antes de push/tag/release, obter aprovação explícita do destino, visibilidade atual, arquivos/commits selecionados, tag e ativos finais. O modo por plano não elimina esse gate. Não alterar a visibilidade, reescrever histórico, sobrescrever tags ou usar force-push. Se um dado indevido já estiver no histórico, parar e definir contenção com o usuário.

Destino proposto: `guimariz/atena-driven-development`. Visibilidade e estado remoto precisam de verificação autorizada. A publicação inclui o pacote `atena-add-0.2.1.tgz`, manifesto do payload, manifesto de fontes, notas, roteiro piloto e checksums. A tag deve apontar para o commit revisado contendo as fontes da candidata; gerar metadados finais com esse commit antes do envio.

## Atualizar uma máquina piloto

1. Identificar sistema, Node/npm, projeto, recibo `.atena/installation.json`, fontes de instrução e adaptações existentes. Adoções manuais sem recibo exigem comparação própria; não presumir caminho de atualização da CLI.
2. Selecionar uma release explicitamente aprovada na fonte oficial. Obter tgz, manifesto e hash esperado; comparar SHA-256 do arquivo baixado com a candidata aprovada. Hash sem fonte identificada não comprova autenticidade.
3. Antes de instalar a dependência local ou escrever no projeto, aprovar destino e escopo. Preservar bytes/versões dos arquivos de dependências, instruções, recibo e dados locais; parar escritores concorrentes. Copiar o tgz para caminho estável.
4. Instalar o tgz revisado com `npm.cmd install --offline --ignore-scripts --no-audit --no-fund --save-dev --save-exact <arquivo-local.tgz>`. Essa operação pode modificar package.json, lockfile e node_modules. Se o projeto já tiver dependências, verificar o cache necessário; falha offline não autoriza rede ou novas dependências.
5. Rodar o binário local `atena-add.cmd preview .`, comparar o escopo e só então `atena-add.cmd adopt . --apply`. Usar `node_modules/.bin/atena-add` nos outros sistemas. Não usar npx remoto.
6. Conferir `status .`, versão do recibo, snapshot e manifesto; comparar configuração, canon, conhecimento e estado dos chats antes/depois. Abrir nova conversa que carregue AGENTS.md e registrar quais instruções foram lidas. Copiar arquivos não prova que uma conversa antiga os carregou.
7. Guardar evidência real do operador: versão anterior/resultante, SO, projeto, hash, preview, status, preservação e pendências. Só depois considerar outras máquinas.

Recuperação: revisar os bytes anteriores em `.atena/install-backups/` e os snapshots preservados; restaurar somente instruções/recibo e arquivos de dependências realmente afetados sob escopo autorizado. Em interrupção de I/O, inspecionar a saída parcial antes de repetir. Nunca recuperar apagando canon ou substituindo planos por estado vazio. O procedimento completo está em [UPDATING.md](UPDATING.md).
