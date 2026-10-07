# Pedido de mudança para a apresentação

Classificação: `PLAN_CHANGE_REQUEST` sobre PLAN-006 revisão 1. O usuário pediu refazer a apresentação, acrescentando explicação de Spec Driven Development (SDD), melhores práticas de uso da Atena, recomendação, plano e entrevista. O plano atual continua ativo em S-003; nenhuma substituição ou nova execução foi autorizada ainda.

## Evidência da entrevista

- Destino: vídeo para YouTube (decisão anterior).
- Público principal: iniciantes em IA e desenvolvimento.
- Duração: até 15 minutos, em lugar dos aproximadamente 20 minutos da revisão 1.
- Demonstração: simular um pedido novo do início ao fim, em lugar de apenas percorrer registros históricos.
- Tom: explicação prática e diagramas simples (decisões anteriores preservadas).
- Pedido e forma da demonstração: segunda rodada da entrevista em andamento.

## Impacto no plano vigente

| Área | Revisão 1 aprovada | Mudança solicitada |
| --- | --- | --- |
| Escopo | ADD em dez slides, cerca de 20 minutos | SDD + relação com ADD + boas práticas, até 15 minutos |
| Exemplo | Resumo de status histórico do `example-project/` | Novo pedido simulado de ponta a ponta, claramente identificado como demonstração |
| Decisões | Diagrama e capturas reais de registros antigos | Demonstração nova, com formato visual ainda em definição |
| Etapas | S-001/S-002 concluídas; S-003 ativa | Novo storyboard, material da demonstração, novo deck e nova revisão |
| Aceitação | AC-4 pendente por capturas não incorporadas | Critérios novos devem cobrir precisão do SDD, método ADD, prática, legibilidade, tempo e proveniência |
| Evidência | Deck e prévias já produzidos | Preservar o PPTX e recibo da revisão 1 como histórico; registrar versão nova separadamente |
| Recuperação | Regerar deck a partir do build anterior | Manter a revisão 1 intacta até aprovação e criar saída nova, sem apagar arquivos |

## Recomendação preliminar

Usar SDD como conceito de entrada: intenção e critérios primeiro; plano e tarefas depois; implementação seguida de verificação. Em seguida, mostrar como o ADD deste projeto mantém memória local, distingue DRAFT/CANON, oferece Guided ADD e Direct Execution, registra checkpoints e reconcilia evidências. Evitar apresentar Spec Kit como sinônimo ou dependência do ADD. Referências: [conceito de SDD no Spec Kit](https://github.com/github/spec-kit/blob/main/docs/concepts/sdd.md), [fluxo do Spec Kit](https://github.github.com/spec-kit/reference/agentic-sdd.html), `ADD.md` e `INTERACTION.md` locais.

Formato revisado após a observação do usuário sobre vaults e graphs: dez slides, aproximadamente 14:45, com dois slides específicos sobre memória do projeto e relações derivadas, além do caso que atravessa pedido, spec, plano, autorização, mudança e evidência. Os detalhes do caso e da exibição serão fechados após a entrevista. A revisão anterior não será declarada verificada retroativamente; o AC-4 continua registrado como pendente enquanto o plano estiver ativo.

## Próxima decisão

Fechar as escolhas da demonstração, preparar uma proposta completa de substituição (escopo, não objetivos, aceitação, etapas, verificações e aprovação), submetê-la ao usuário e só então trocar o cursor operacional. A aprovação `per-plan` da revisão 1 não abrange a substituição.
