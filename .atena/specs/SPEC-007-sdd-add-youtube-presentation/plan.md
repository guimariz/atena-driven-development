---
id: "PLAN-007"
spec_id: "SPEC-007"
status: "completed"
approval:
  mode: "per-plan"
---

# Plano de voo da apresentação revisada

## Plan mode

- Origin: `planned`; reconstruction: `false`; revision: 2.
- Substitui PLAN-006 revisão 1, preservado com resultado parcial e AC-4 não atendido.
- Approval mode: `per-plan`; checkpoint PLAN aprovado para S-001 a S-004.

## Recommended approach

Dez slides em 14:45, com um miniprojeto de demonstração local e um caso que percorre SDD/ADD inteiro. Explicar SDD em linguagem comum; mostrar vaults com arquivos reais e a relação canônica que pode alimentar um graph derivado, identificando que a saída configurada ainda não foi gerada. Usar a Atena para mostrar memória, aprovação, execução delimitada e evidência. O deck usa diagramas editáveis e notas; a gravação de tela dos arquivos reais é a recomendação de demonstração.

## Reuse

- Roteiro DRAFT revisão 2, deck v1 e sua fonte de build como base editorial/visual, sem reutilizar como evidência da nova demo.
- Documentação local do ADD, vaults reais, relação DEC-002/DEC-001 e contrato `.atena/` para o miniprojeto.
- Runtime de apresentações já disponível; nenhuma dependência nova.
- Documentação oficial do GitHub Spec Kit apenas como referência de conceito SDD.

## Implementation sequence

1. `S-001` — Fechar entrevista, roteiro e storyboard de dez slides; conferir cobertura de vaults/graph, fontes e soma dos tempos.
2. `S-002` — Preparar miniprojeto e pedido de demonstração; registrar antes/depois, spec/plano/exemplo de checkpoint, validação e evidência sem fabricar autorizações históricas.
3. `S-003` — Produzir PPTX v2 editável, notas e materiais da demonstração; renderizar prévias.
4. `S-004` — Revisar os dez slides, notas, demonstração e critérios; corrigir problemas; registrar evidência e reconciliar estado.

## Approval checkpoints

- `per-plan`: um checkpoint PLAN-007 cobre S-001 a S-004.
- `per-batch`: B-001 cobre S-001/S-002; B-002 cobre S-003/S-004.
- `per-step`: S-001 a S-004 são checkpoints separados.
- O usuário selecionou `per-plan` especificamente para esta revisão 2; o modo antigo não foi herdado automaticamente.

## Expected changes

- `.atena/vault/drafts/apresentacao-sdd-add-youtube.md` e arquivos da SPEC-007/evidência.
- `presentations/demo-add-status/` com contrato ADD local e mudança pequena demonstrável.
- `presentations/atena-sdd-add-youtube-v2.pptx` e artefatos de build/render na evidência.
- Registro terminal honesto da SPEC-006 e troca do cursor somente após aprovação do plano novo.

## Validation

- Conferir dez slides, ordem, notas, fontes e duração planejada de no máximo 15 minutos.
- Conferir a proveniência dos exemplos de canon/drafts/research, a relação DEC-002/DEC-001 e a ausência/presença real da saída do graph na data da produção.
- Inspecionar cada prévia, pacote PPTX, editabilidade dos diagramas, trechos e notas.
- Validar o contrato ADD do miniprojeto, links, estado e evidência real da demo.
- Comparar AC-1 a AC-7 e fazer revisão independente de precisão SDD/ADD, origem dos arquivos, escopo e afirmações.

## Limits

- Até três tentativas por falha de geração/render, com resultado explícito se a limitação persistir.
- Escritas restritas à proposta, miniprojeto, deck v2, evidência e transição operacional de estado aprovada.
- Sem instalação, canon, publicação, push, merge ou envio remoto de material sensível.

## Recovery

Preservar deck v1 e PLAN-006 como histórico. Fonte do build, storyboard e demo tornam o v2 reproduzível. Se houver falha, manter a última versão válida sem apagar a anterior e registrar o critério não atendido.

## Mandatory gates

O plano novo recebeu aprovação própria por plano. Mudança canônica, dependência, publicação e demais ações materiais continuam sujeitas aos gates independentes. A simulação não substitui uma aprovação real do usuário para qualquer outra ação.

## Approval record

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-07T19:13:15Z"
    approved_by: "user"
    scope_revision: 2
```

[Origem da aprovação e transição](../../evidence/SPEC-007-sdd-add-youtube-presentation/approval-and-transition.md). O horário marca o registro nesta execução, não o instante exato da mensagem.

## Step progress and prepared handoff

Revisão 2. Quatro etapas concluídas. Nenhuma etapa planejada restante. Checkpoint PLAN aprovado e executado. [S-001](../../evidence/SPEC-007-sdd-add-youtube-presentation/content-review.md), [S-002](../../evidence/SPEC-007-sdd-add-youtube-presentation/step-2.md), [S-003](../../evidence/SPEC-007-sdd-add-youtube-presentation/step-3.md) e [S-004](../../evidence/SPEC-007-sdd-add-youtube-presentation/result.md) concluídas.

| Step | Objective | Inputs | Deliverable | Checks | Status |
| --- | --- | --- | --- | --- | --- |
| S-001 | Fechar conteúdo/tempo/fontes | Storyboard DRAFT r2, entrevista, documentos locais e SDD oficial | [Revisão de conteúdo](../../evidence/SPEC-007-sdd-add-youtube-presentation/content-review.md) | Cobertura, precisão, 14:45 | concluído |
| S-002 | Criar demo local | Conteúdo fechado, contrato ADD | [Miniprojeto e evidência](../../evidence/SPEC-007-sdd-add-youtube-presentation/step-2.md) | História verdadeira, antes/depois, links | concluído |
| S-003 | Criar PPTX v2 | Storyboard e demo | [Deck e prévias](../../evidence/SPEC-007-sdd-add-youtube-presentation/step-3.md) | 10 slides, notas, editabilidade | concluído |
| S-004 | Validar e reconciliar | Deck e critérios | [Resultado terminal](../../evidence/SPEC-007-sdd-add-youtube-presentation/result.md) | Visual, estrutura, estado | concluído |
