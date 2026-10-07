# Descoberta para o roteiro explicativo

Data: 2026-10-07. Pedido explicitamente dirigido à Atena; Guided ADD. Não há plano ativo nem desvio a resolver. A preparação entrega análise, proposta DRAFT revisão 1 e plano proposto; não autoriza sua execução.

## Inspeção

- Lidos AGENTS.md, RTK.md aplicável, add.yaml e state/plan.yaml.
- Lidos README, ADD, CONTRACT, INTERACTION, WORKFLOW, AUTONOMY, POLICIES, GAMES e GAME-SPECIALISTS.
- Lidos DEC-001/002, templates de canon/spec/plano/tarefas/aceitação/automação, exemplo e registros relevantes de SPEC-002/004.
- Inventariados arquivos locais incluindo workspace, schemas, validadores, templates e exemplo.
- Estado validado pelo validador de leitura: valid=true, executionReady=false, state=idle.
- RTK 0.48.0 disponível; rtk gain executou sem dados de tracking. Não houve instalação/configuração global. O status unknown de add.yaml foi preservado: disponibilidade observada não é nova preferência aprovada.
- Estado Git inicial limpo; usado apenas para inspecionar mudanças, sem escrita Git.

## Análise estrutural

O pacote do método é distinto do workspace de cada projeto. As três camadas são canon, specs e derivados; evidência comprova resultados e estado preserva continuidade operacional. Instruções precisam ser carregadas pelo cliente. Um template não instala um agente, e estado válido não concede aprovação.

A explicação precisa distinguir local-first de inferência local; DRAFT de CANON; aprovação de implementação/verificação; origem planned de post-hoc; perfil de autonomia de modo de checkpoint; orientação opcional de jogos do contrato geral. Os dez pares de especialistas estão entregues como fontes portáveis. O grafo é um derivado previsto pelo método, sem presumir geração disponível. SPEC-002 continua draft não aprovado.

## Preparação

- Proposta: [roteiro DRAFT revisão 1](../../vault/drafts/roteiro-explicativo-add.md), 14 blocos e glossário.
- Spec: [SPEC-005](../../specs/SPEC-005-add-explanatory-script/spec.md).
- Plano: [PLAN-005 revisão 1](../../specs/SPEC-005-add-explanatory-script/plan.md), três etapas; modo unconfigured.
- Público/uso: pergunta opcional enviada; default introdutório com demonstração, sem minutagem fixa.
- Sem BLOCKING para o escopo textual. Aprovação pendente é um checkpoint de autoridade.

## Limites

Somente descoberta e documentos de preparação criados. Nenhuma promoção, mudança do método, implementação de SPEC-002, execução de agente, runtime de jogo ou ação externa. Validação documental não prova compreensão do público nem adesão comportamental de modelos.

## Verificação da preparação

[Checks](checks.json): seis documentos conferidos, oito caminhos obrigatórios presentes, 56 links locais resolvidos, 14 blocos e termos essenciais presentes; estado idle válido. A primeira tentativa de checagem falhou por quoting da chamada inline no shell, antes de escrever o resultado. A chamada corrigida passou. Aceitação do roteiro desenvolvido permanece pending. Escritas novas limitadas a esta spec/evidência e ao roteiro DRAFT; configuração, canon, estado e SPEC-002 preservados.

## Próxima decisão

Escolher aprovação por plano, lote ou etapa e aprovar o escopo concreto da revisão 1. Após isso, registrar aprovação e cursor antes de iniciar S-001.
