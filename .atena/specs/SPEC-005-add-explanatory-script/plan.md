---
id: "PLAN-005"
spec_id: "SPEC-005"
status: "completed"
approval:
  mode: "per-plan"
---

# Plano de voo do roteiro explicativo

## Plan mode

- Origin: `planned`
- Reconstruction: `false`
- Revision: 1
- Conteúdo de trabalho: DRAFT revisão 1.
- Aprovação `per-plan` recebida para revisão 1; S-001 a S-003 autorizadas.

## Recommended approach

Desenvolver o roteiro em português a partir dos 14 blocos propostos, mantendo um exemplo e explicando finalidade antes dos nomes técnicos. O usuário escolheu aprovação por plano.

## Reuse

Reutilizar guias existentes, contrato, DEC-001/002, templates e exemplos. Não criar dependências, novas regras ou agentes.

## Implementation sequence

1. `S-001` — Fechar a matriz de cobertura e adaptar o roteiro ao público/uso definido.
2. `S-002` — Desenvolver falas, exemplos, ações de demonstração, transições e glossário no roteiro.
3. `S-003` — Revisar conceitos e links, verificar aceitação, registrar evidência e encerrar estado.

## Approval checkpoints

Modo selecionado: `per-plan`. As outras rotas eram alternativas apresentadas antes da escolha:

- `per-plan`: checkpoint `PLAN` abrange S-001 a S-003.
- `per-batch`: `B-001` abrange S-001/S-002; `B-002` abrange S-003.
- `per-step`: checkpoints S-001, S-002 e S-003, um antes de cada etapa.

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-07T18:10:03Z"
    approved_by: "user"
    scope_revision: 1
```

## Expected changes

- Roteiro existente em vault/drafts: revisão desenvolvida e fontes/matriz de cobertura.
- Spec/plan/tasks/acceptance: aprovação, progresso, checks e resultado.
- Evidence desta spec: registros de aprovação, cobertura e resultado.
- Estado: cursor durante execução aprovada e retorno a idle após resultado terminal.

## Validation

- Comparar cada grupo conceitual e estrutura com os guias e a matriz.
- Verificar links locais e metadados dos arquivos deste escopo.
- Executar o validador local de estado antes de avançar e ao encerrar.
- Revisão editorial de clareza, transições, termos e exemplos fictícios.
- Conferir todas as ACs e limites das afirmações; preservar SPEC-002 e canon.

## Limits

- Max retries: 3.
- Escritas limitadas ao roteiro, SPEC-005, evidence correspondente e estado durante execução.
- Sem dependências, serviços, agentes, alterações normativas ou operações externas.

## Recovery

Preservar a revisão preparada antes de desenvolvê-la. Se surgir conflito, registrar a pendência e manter evidência e ponto de retorno. Qualquer descarte destrutivo exige autorização; não modificar registros históricos ou canon para acomodar a narrativa.

## Mandatory gates

O escopo proposto não inclui ações adicionais sujeitas a gates. Uma expansão para canon, dependências, instalação, dados materiais ou publicação exige análise e autorização específicas.

## Approval record

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-07T18:10:03Z"
    approved_by: "user"
    scope_revision: 1
```

[Origem e interpretação da aprovação](../../evidence/SPEC-005-add-explanatory-script/approval.md). O horário acima registra a decisão nesta execução; não afirma o instante exato de envio da mensagem.

## Step progress and prepared handoff

Revision: 1. Sequência de três etapas, três concluídas. Nenhuma etapa resta no plano aprovado. Checkpoint PLAN aprovado e execução encerrada.

| Step | Objective | Inputs | Deliverable | Actions/checks | Checkpoint/status |
| --- | --- | --- | --- | --- | --- |
| S-001 | Fechar cobertura e público | Guias, draft r1 e default de público | [Matriz e recorte editorial](../../evidence/SPEC-005-add-explanatory-script/coverage.md) | Cobertura de arquivos/conceitos | PLAN aprovado; concluído |
| S-002 | Desenvolver explicação | Matriz, recorte e exemplo | [Roteiro DRAFT revisão 2](../../vault/drafts/roteiro-explicativo-add.md) | Falas, demonstrações e transições | PLAN aprovado; concluído |
| S-003 | Verificar e reconciliar | Roteiro desenvolvido, ACs e evidências | [Resultado](../../evidence/SPEC-005-add-explanatory-script/result.md) | Links, contrato, estado e ACs | PLAN aprovado; concluído |

## Completion record

Resultado terminal registrado antes de limpar o cursor. S-001 a S-003 concluídas; roteiro DRAFT revisão 2 entregue e verificado documentalmente. Nenhum conteúdo promovido a CANON. Próxima decisão, se houver: escolher mídia ou público para uma adaptação futura com escopo próprio.
