# Instalação local do ADD — distribuição 0.2.0 (DRAFT)

> Para a nova candidata com oito agentes nativos por padrão, consulte [Atena 0.5.0](NATIVE-AGENTS.md). Esta página preserva o procedimento histórico 0.2.0; não reconstruir o payload antigo com fontes novas.

> Evolução local aprovada: consulte [Atena portátil 0.3.0](PORTABLE.md) para as novas fontes, comandos e limites. Os procedimentos 0.2.0 abaixo são históricos preservados; não execute o gerador antigo na raiz para reconstruir essa versão com fontes novas.

> As instruções abaixo documentam a distribuição local 0.2.0 preservada. Para preparar a candidata 0.2.1 e atualizar outra máquina, siga [RELEASING.md](RELEASING.md). A nova build ocorre em cópia isolada; não regrave o payload 0.2.0 com fontes atuais. Publicação e adoção continuam sujeitas a autorização.

O pacote disponibiliza a metodologia sem clonar o GitHub. Requer Node.js >=20 e npm; não tem dependências de runtime. O nome atena-add é local: nenhuma disponibilidade em registro foi verificada e nada foi publicado.

## Gerar o arquivo instalável

Na raiz deste repositório:

```powershell
node tools/build-atena-package.cjs
npm.cmd pack ./packages/atena-add --offline --ignore-scripts --pack-destination ./dist
```

A pasta dist deve existir. O pacote usa allowlist; não leva a .atena do mantenedor, conhecimento pessoal ou perfil Marizverso. Os especialistas de jogos incluídos são fontes portáteis, sem instalação de runtime.

## Adotar em um projeto

Após autorizar a instalação local da dependência e a adoção no projeto escolhido, abra o terminal na pasta dele:

```powershell
npm.cmd install --offline --ignore-scripts --no-audit --no-fund --save-dev --save-exact C:\pacotes\atena-add-0.2.0.tgz
.\node_modules\.bin\atena-add.cmd preview .
.\node_modules\.bin\atena-add.cmd adopt . --apply
.\node_modules\.bin\atena-add.cmd status .
```

Em outros sistemas, use npm e o binário local node_modules/.bin/atena-add. Pode copiar o tgz para outro computador com Node/npm; Git não é necessário. O caminho do arquivo no package.json é local; conserve o arquivo em um caminho estável para futuras instalações. O pacote ainda não é um registro público para instalar apenas pelo nome.

preview não escreve. adopt exige --apply, acrescenta uma ponte ao AGENTS.md e copia a metodologia para .atena/methodology/0.2.0. Cria apenas configuração/estado ausentes e pastas do contrato; preserva configuração, canon e planos existentes. O assistente precisa ler AGENTS.md; a CLI não altera configurações do cliente. Instruções locais mais restritivas continuam válidas e conflitos devem ser apresentados.

A ponte carrega as frases de ativação e a identificação de especialistas com coruja. Apenas envolvidos reais aparecem; consulta, execução e revisão são distinguidas. Uma autorrevisão não é independente.

## Frases

| Frase | Ação do assistente |
| --- | --- |
| Ativar Atena no projeto | Inspecionar e preparar adoção; respeitar aprovação antes de escrever. |
| Atena, elabore um plano com suas recomendações | Evidências, recomendações, spec/plano e checkpoint. |
| Atena, me entreviste | Descoberta adaptativa e decisões DRAFT. |

`atena-add phrase "Atena, me entreviste"` consulta o registro inteiro, ignorando caixa/espaços externos. Não executa o fluxo. Citações, código e menções não são ativações. A correspondência não concede aprovação; o assistente interpreta a intenção real.

## Atualizar e recuperar

Instale um novo tgz revisado, execute preview e depois adopt --apply explicitamente. A nova versão recebe outro snapshot; a anterior permanece. Não editar snapshots: divergências na mesma versão ou no bloco gerenciado são recusadas.

Antes de alterar instruções/recibo, a CLI grava .atena/install-backups/<id>.json com os bytes anteriores em base64. Para recuperar, revise esse arquivo e restaure os campos agents em AGENTS.md e receipt em .atena/installation.json. null indica ausência anterior; remover algo exige avaliar autorização aplicável. Não restaure o plano usando um estado vazio e não apague canon. Recuperação é manual; após falha de I/O, examine backups e possíveis snapshots parciais antes de repetir.

Execute sem outros escritores concorrentes no projeto. A operação tem preflight e backup, mas não é transação atômica de todo o filesystem. Symlinks/junctions são recusados; neste ambiente a criação nativa de junction foi negada, então esse ramo foi exercitado com lstat simulado. Os testes determinísticos não provam obediência de modelos ou utilidade humana.

## Verificar

```powershell
node tools/test-atena-package.cjs
```

Os testes cobrem adoção nova/existente, prévia, repetição, conflitos, recuperação disponível e atualização simulada para 0.2.1. O pacote 0.2.0 foi instalado offline em fixture temporária; nenhum projeto externo foi adotado.

## Comando de atualização nas fontes atuais

"Atena, atualize-se para a versão mais recente." e "Atena, se atualize." acionam o mesmo [procedimento](UPDATING.md). O registro está nas instruções e nas fontes da próxima distribuição. Os snapshots/tgz 0.2.0 existentes não foram regravados; uma atualização de distribuição requer nova versão revisada e adoção autorizada. O registro da frase não executa instalação ou atualização por si só.
