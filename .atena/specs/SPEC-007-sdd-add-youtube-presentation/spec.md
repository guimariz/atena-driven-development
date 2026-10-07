---
id: "SPEC-007"
title: "Revisão da apresentação SDD e Atena/ADD para YouTube"
status: "verified"
origin: "planned"
implementation_preceded_spec: false
created: "2026-10-07"
canonical_refs:
  - "DEC-001"
  - "DEC-002"
---

# Revisão da apresentação SDD e Atena/ADD para YouTube

## Objective

Substituir a narrativa da apresentação anterior por um PPTX editável para iniciantes, de até 15 minutos, que explique Spec Driven Development (SDD), a relação e as diferenças com ADD, o uso real dos vaults/graphs e cinco práticas concretas para usar Atena. Um pedido novo percorre spec, plano, checkpoint, execução, verificação e evidência.

## Context and evidence

- Pedido de reformulação classificado como `PLAN_CHANGE_REQUEST` sobre PLAN-006 revisão 1; [impacto documentado](../../evidence/SPEC-006-add-youtube-presentation/change-request-2026-10-07.md).
- Entrevista: vídeo para YouTube; público iniciante; até 15 minutos; simulação de pedido novo do início ao fim. Para exemplo e forma da demonstração, foram adotados os defaults recomendados no plano aprovado: resumo de status em miniprojeto local e alternância entre slides e arquivos reais.
- A primeira [apresentação](../../../presentations/atena-add-youtube.pptx) e seu resultado parcial ficam preservados como histórico; AC-4 da SPEC-006 não será retroativamente marcado como atendido.
- [Storyboard DRAFT revisão 2](../../vault/drafts/apresentacao-sdd-add-youtube.md). A revisão inclui vaults e graph após correção do usuário; [inspeção local](../../evidence/SPEC-007-sdd-add-youtube-presentation/vault-graph-discovery.md).
- Conceito externo: [SDD no GitHub Spec Kit](https://github.com/github/spec-kit/blob/main/docs/concepts/sdd.md), usado como fonte explicativa, sem tratar o toolkit como autoridade do ADD.

## Scope

- Escrever a narrativa, notas e storyboard de dez slides e total aproximado de 14:45.
- Preparar um miniprojeto local de demonstração dentro do repositório, com contrato `.atena/` válido, antes/depois e evidência real de uma mudança pequena; identificar a demonstração como preparada.
- Explicar o fluxo geral de SDD e mostrar onde ADD acrescenta vault local, estados DRAFT/CANON, Guided ADD/Direct Execution, aprovação e reconciliação.
- Explicar `canon`, `drafts` e `research` com arquivos reais; mostrar uma relação canônica existente e o papel do grafo derivado, deixando explícito que a saída configurada ainda não foi gerada neste projeto.
- Ensinar práticas de pedido, delimitação, revisão de decisões e conferência de evidências por meio do mesmo caso.
- Gerar novo PPTX em `presentations/atena-sdd-add-youtube-v2.pptx`, com diagramas editáveis e notas, preservando a versão 1.
- Renderizar e revisar todos os slides, validar conteúdo, links, pacote, tempo, demo e estado ADD.

## Non-goals

- Publicar ou enviar vídeo/deck, gravar ou editar o vídeo, criar thumbnail ou legendas.
- Alterar regras, canon, arquitetura ou implementação do ADD.
- Instalar Spec Kit, dependências novas ou ferramentas globais.
- Representar uma simulação como histórico espontâneo ou execução da conversa atual.
- Fazer um curso completo de SDD/ADD: cada estrutura recebe explicação breve no vídeo e detalhe nas notas.

## Decisions

| Decision | Choice | Basis |
| --- | --- | --- |
| Público | Iniciantes em IA e desenvolvimento | Resposta do usuário |
| Tempo | Até 15 minutos; alvo 14:45 | Resposta do usuário e storyboard |
| Narrativa | Pedido novo de ponta a ponta | Resposta do usuário |
| Formato | Dez slides 16:9 e notas | Pedido de explicar vaults/graphs sem sacrificar a demonstração |
| Graph | Relação canônica real + diagrama derivado ilustrativo; saída configurada ainda ausente | Inspeção do repositório, sem fabricar uso em produção |
| Referência SDD | Conceito geral apoiado em documentação primária do Spec Kit | Precisão; sem confundir ferramenta e método |
| Demonstração | Miniprojeto local e gravação de arquivos reais | Recomendação; segunda rodada da entrevista ainda pode ajustar |
| Saída | Novo arquivo v2, mantendo v1 | Recuperação e história verdadeira |

## Gaps

### BLOCKING

- Nenhum. O usuário aprovou PLAN-007 revisão 2 por plano; [registro](../../evidence/SPEC-007-sdd-add-youtube-presentation/approval-and-transition.md).

### RESOLVABLE

- Pedido exato da demonstração: resumo de status em miniprojeto local, default recomendado aceito na aprovação do plano.
- Forma de exibição: alternar slides e gravação de tela dos arquivos locais, default recomendado aceito na aprovação do plano.
- Estética: reutilizar a linguagem clara do deck anterior, com menos texto e sem nova dependência.

### DEFERRED

- Roteiro de locução palavra por palavra além das notas.
- Teste com espectadores, edição e publicação do vídeo.
- Aprofundamento separado de cada pasta e dos recursos opcionais de jogos/especialistas.

## Acceptance criteria

- [x] AC-1: Novo PPTX editável contém dez slides na ordem do storyboard e duração planejada de no máximo 15 minutos.
- [x] AC-2: SDD é explicado corretamente; o papel de Spec Kit como exemplo externo fica distinto do ADD local.
- [x] AC-3: Estruturas obrigatórias de `.atena/`, modos, estados, spec/plano/checkpoint/evidência/reconciliação aparecem com atribuições corretas.
- [x] AC-3a: `vault/canon`, `vault/drafts` e `vault/research` têm funções, estados e exemplos reais; o graph usa uma relação canônica existente e distingue saída configurada de arquivo gerado.
- [x] AC-4: Uma demonstração identificada como preparada mostra pedido, spec, plano, aprovação exemplificativa, mudança real, verificação e evidência sem fabricar histórico ou aprovação.
- [x] AC-5: Cinco práticas de uso da Atena são acionáveis e ilustradas pelo caso, com exemplo de prompt para iniciantes.
- [x] AC-6: Os dez slides e notas são legíveis, sem cortes materiais; trechos reais e diagramas têm proveniência e editabilidade claras.
- [x] AC-7: Validação estrutural, visual, links e estado passam; versão anterior, canon e SPEC-002 são preservados; nova evidência e reconciliação são registradas.

## Impact

Novos storyboard, miniprojeto de demonstração, PPTX v2, build e evidência da SPEC-007. Após aprovação, PLAN-006 será encerrado como substituído com AC-4 pendente registrado, e o cursor passará ao novo plano. Nenhuma alteração canônica ou publicação está prevista.

## Plan of flight and validation

Ver [PLAN-007](plan.md). O deck será revisto em prévias e no pacote PPTX; a demo terá critérios verificáveis. A checagem técnica não prova compreensão ou qualidade percebida do vídeo ainda não gravado.

## Evidence and reconciliation

Guardar fontes, resultado da demo, prévias, recibo, avaliação de critérios e transição de plano em `.atena/evidence/SPEC-007-sdd-add-youtube-presentation/`. Preservar o histórico da SPEC-006 sem aceitá-la retroativamente.

## Risks

- Excesso de conceitos em 15 minutos: dedicar slides próprios a vaults e graph, manter as outras estruturas concisas e deixar pormenores nas notas.
- Superestimar o graph: o arquivo de saída está configurado, mas ausente; mostrar relação real e explicar uso previsto, sem dizer que o JSON foi gerado.
- Confundir SDD e ADD: deixar explícito o que é conceito geral, exemplo de ferramenta e regra local.
- Confundir simulação e histórico: rotular preparo e mostrar apenas arquivos/checagens realmente produzidos.
- Repetir a lacuna de capturas: decidir previamente se a demonstração será gravação de tela ou trechos identificados no deck.
