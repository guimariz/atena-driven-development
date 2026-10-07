# Acceptance — SPEC-001

## Criteria

| ID | Criterion | Evidence | Result |
| --- | --- | --- | --- |
| AC-1 | A trilha é sugerida para intenção clara de criar um jogo e ativada após confirmação; recusa e ajustes em jogo existente preservam o fluxo pertinente. | GAMES: Purpose and activation; cenários 1/3 | pass |
| AC-2 | A entrevista adapta-se à experiência e às respostas, reutiliza informação e não fixa gênero, dimensionalidade ou engine. | GAMES: Adaptive interview; vision/design; cenário 2 | pass |
| AC-3 | A recomendação de engine e tecnologias aparece por último na definição inicial e cita requisitos de experiência, design, produção, bíblia visual e protótipo. | GAMES: sequência e recomendação técnica; prototype-readiness | pass |
| AC-4 | Existe bíblia visual inicial antes da recomendação técnica, com tópicos aplicáveis, referências, limites de produção, revisão e pendências. | GAMES: Visual bible before engine selection; visual-bible | pass |
| AC-5 | Antes do protótipo, o processo sempre apresenta principais pendências, efeito, próximo passo, classes de lacunas e declaração explícita quando não houver pendências. | GAMES: Always explain prototype readiness; cenário 5 | pass |
| AC-6 | Cada playtest explica previamente o que testar, objetivo, build, roteiro, observações, critérios, retorno e consequência. | GAMES: playtests; template playtest e exemplo | pass |
| AC-7 | Verificação técnica e avaliação humana são diferenciadas; diversão não é declarada comprovada sem playtest; retornos pendentes seguem a aceitação do marco. | GAMES e playtest; cenário 6 | pass |
| AC-8 | Visão, design, lore e direção visual permanecem em drafts até aprovação; o processo utiliza apenas o workspace e gates existentes. | GAMES: Records and templates; integração AGENTS/WORKFLOW | pass |
| AC-9 | Visão, design, bíblia visual, prontidão e playtest têm templates opcionais acessíveis a partir da documentação. | Cinco templates e referências de GAMES/README | pass |
| AC-10 | Referências locais adicionadas resolvem, IDs são únicos no workspace raiz e o estado obedece ao schema, incluindo ausência de plano ativo ao concluir. | Verificação final: 50 links locais, três IDs únicos, schema do estado ocioso | pass |
| AC-11 | Evidências e reconciliação registram o resultado real e os itens adiados, sem instalar ferramentas, selecionar engine arbitrariamente ou publicar. | Diff, result.md, DEC-001 e plano concluído | pass |

## Validation summary

- Preparação: entrevista consolidada e estrutura existente inspecionada.
- Implementação documental e revisão dos seis cenários concluídas; conferir [resultado](../../evidence/SPEC-001-game-guidance/result.md).
- Verificação estrutural ativa e conferência de encerramento passaram; estado final ocioso válido.
- Limitação: revisão de documentos e cenários verifica o contrato escrito; não mede adesão de modelos em execução.
- Exceptions accepted by user: nenhuma.

## Approval evidence

- Approval mode: `per-plan`.
- Checkpoints approved: `PLAN`, revisão 1, conforme plan.md.
- Pending checkpoints: nenhum.

## Reconciliation

- Canonical records updated: `DEC-001`, promoção aprovada.
- Operational facts updated: implementação verificada, tarefas concluídas, plano concluído e cursor limpo.
- Derived artifacts refreshed: nenhum necessário na preparação.
- Deferred items retained: exemplos executáveis, automação e integrações.

## Final state

`verified`
