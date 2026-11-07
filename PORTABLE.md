> Marco OP3: receita original preparada e exportador executado uma vez; falhou com ERR_NETWORK_ACCESS_DENIED ao navegar no loopback (zero outputs). Sem retry ou validacao visual. [Evidencia OP3](.atena/evidence/PILOT-procedural-2d-windows-op3-20261105/README.md).

> Marco posterior: OP2 concluida em 05/11/2026, Playwright instalou Chromium/Headless Shell 1243, FFmpeg 1011 e WinLdd 1007 no cache exclusivo (exit 0), sem abrir browser ou executar motor. OP3 continua separadamente nao autorizada. Ver [evidencia OP2](.atena/evidence/PILOT-procedural-2d-windows-op2-20261105/README.md).

> Atualizacao posterior em 05/11/2026: a tentativa oficial com require_escalated instalou as dependencias 2D (npm exit 0; oito manifests conferidos). OP1 concluida, sem executar motor ou Chromium. Os relatos de falha/cache abaixo sao historicos anteriores a essa tentativa. Consulte a [evidencia da retomada](.atena/evidence/PILOT-procedural-2d-windows-op1-official-retry-20261105/README.md).

> Estado reconciliado em 05/11/2026: esta pagina descreve candidatas locais preservadas, nao uma instalacao de runtime. O 2D foi encontrado em Downloads, teve hash e staging verificados, mas npm ci falhou (ENOTFOUND); o diagnostico DNS posterior recebeu Acesso negado. Cache offline insuficiente, sem nova tentativa. O piloto 3D direto no cloud foi relatado separadamente, com limites; nao valida a integracao ADD. Chromium/execucao 2D e validacao real Dot/outra conta continuam pendentes. Consulte [prontidao atual](.atena/evidence/SPEC-021-portable-atena/readiness-20261105.md). Os paragrafos historicos abaixo descrevem o marco da construcao das candidatas.

> Nova candidata local 0.5.0: [oito agentes nativos por padrão](NATIVE-AGENTS.md). As versões históricas e os relatos abaixo permanecem preservados; a biblioteca genérica não inclui o perfil pessoal Marizverso, conhecimento privado ou aprovações.

# Atena portátil 0.3.0 — DRAFT r1

> Revisão autoral r2: fontes atuais 0.4.0 incluem [integração procedural estática](packages/atena-portable/PROCEDURAL.md), contratos de outputs e pilotos DRAFT. A 0.3.0 r3 abaixo permanece preservada. Nenhum motor/receita/setup dos anexos foi executado; cada ação exige confirmação específica. Materialização dos dois anexos falhou pela rota oficial local; comandos reais de receitas continuam indeterminados. Nova candidata e evidências ficam separadas em SPEC-021/r2.

Fontes novas em [packages/atena-portable](packages/atena-portable/README.md); [adaptadores](packages/atena-portable/adapters/CONTRACT.md); [avaliação de agentes](evaluations/portable-agents/README.md). O pacote antigo e os arquivos 0.2.0/0.2.1 continuam preservados. Esta versão é candidata local, não uma publicação ou migração de projetos em uso.

Construir em destino novo:

```powershell
node tools/build-atena-portable.cjs release-staging/add-0.3.0-review/package
node release-staging/add-0.3.0-review/package/bin/atena-add.cjs help
node tools/test-atena-portable.cjs
```

`install`, `update`, `repair` e `recover` mostram prévia; `--apply` aplica somente o escopo local escolhido. `status --details` mostra integridade, fonte local, identidade e capacidades desconhecidas/relatadas. `doctor` não instala nada. `--ascii` atende terminais sem emoji. Os comandos também aceitam `--json` para automação. A fonte é um diretório de pacote verificado, não uma URL ou comando; nenhuma “última versão pública” foi inventada.

Camadas: núcleo ADD e contrato 0.2; distribuição CLI 0.3.0; identidade r1/olhos v2; perfis de domínio opcionais; conhecimento por consulta; adaptadores por ambiente; dados/autorizações do projeto separados. O pacote genérico não leva perfis pessoais, cofre privado ou aprovações de chats. Instalar arquivos não registra cliente nem instala agentes.

Stanley/Prometeus são fontes portáteis DRAFT revisadas, não runtimes ativados. A avaliação de três condições está preparada, mas exige isolamento e configuração comparável comprovados antes de coletar resultados. Procedural continua pendente de confirmação da ferramenta e licença; NoctAssetForge não faz parte da distribuição. Dot local/cloud e outra máquina/conta permanecem sem validação real enquanto não houver acesso e evidência próprios.

Para distribuição futura, revisar payload, checksums, licenças e fonte de confiança; obter aprovação específica de destino/publicação. Não transportar credenciais ou aprovações executáveis. Um hash local não autentica a origem externa. Recuperação preserva snapshots/dados de bootstrap e nunca limpa lock de outro processo automaticamente.

Extensão A001: [limpeza revisada de artefatos](packages/atena-portable/CLEANUP.md), com inventário, quarentena recuperável, restauração e verificação de imagens explicitamente canônicas no projeto. Nenhuma limpeza ampla foi ativada e nenhuma exclusão permanente foi implementada. Prévia/hashes, origem/derivados, referências, direitos, estado atual e concorrência determinam os impedimentos; idade e ausência de links não bastam.
