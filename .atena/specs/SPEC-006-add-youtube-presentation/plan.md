---
id: "PLAN-006"
spec_id: "SPEC-006"
status: "superseded"
approval:
  mode: "per-plan"
---

# Plano de voo da apresentação para vídeo

## Plan mode

- Origin: `planned`.
- Reconstruction: `false`.
- Revision: 1.
- Storyboard DRAFT revisão 1; `per-plan` selecionado e checkpoint PLAN aprovado para a revisão 1.

## Recommended approach

Criar um PowerPoint editável de dez slides, seguindo [o storyboard](../../vault/drafts/apresentacao-add-youtube.md). Usar a narração para explicar os detalhes e os slides para mostrar relações, trechos de arquivos e o fluxo do exemplo. O usuário escolheu `per-plan` para o escopo local delimitado.

## Reuse

Roteiro DRAFT revisão 2, guias e `example-project/` como fontes. Usar o runtime de apresentações já disponível, sem instalar dependências. Não usar templates de outros projetos nem dados externos.

## Implementation sequence

1. `S-001` — Fechar conteúdo, notas e fontes de cada slide conforme storyboard e respostas do usuário.
2. `S-002` — Produzir o PPTX editável e capturas locais fiéis; gerar renderização para revisão.
3. `S-003` — Inspecionar cada slide e nota, corrigir problemas, validar aceitação, registrar resultado e encerrar cursor.

## Approval checkpoints

- `per-plan`: `PLAN` cobre S-001 a S-003.
- `per-batch`: `B-001` cobre S-001 e S-002; `B-002` cobre S-003.
- `per-step`: S-001, S-002 e S-003 são checkpoints individuais.

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-07T18:28:12Z"
    approved_by: "user"
    scope_revision: 1
```

## Expected changes

- Storyboard DRAFT revisado caso ajustes editoriais sejam necessários.
- `presentations/atena-add-youtube.pptx` e artefatos temporários de build/render na evidência da spec.
- Registros desta spec e cursor do plano enquanto ativo.

## Validation

- Conferir exatamente dez slides, notas e tempos aproximados.
- Verificar fontes, status dos registros e fidelidade das capturas.
- Renderizar o PPTX, inspecionar em tamanho consistente e corrigir problemas de leitura/layout.
- Conferir editabilidade dos diagramas e funcionamento do arquivo.
- Validar links, ADD state e critérios AC-1 a AC-7.

## Limits

- Max retries: 3 por falha de geração/render.
- Escritas limitadas ao deck, storyboard, SPEC-006/evidência e estado durante execução.
- Nenhuma instalação global, serviço pago, publicação, envio remoto de contexto sensível ou mudança canônica.

## Recovery

Preservar storyboard e fonte do build para regeração. Corrigir o deck dentro do escopo e registrar falhas. A reprodução não depende de alterar canon ou de publicar arquivos.

## Mandatory gates

O plano local não inclui publicação. Se surgir necessidade de ação material, segurança, dependência nova ou envio remoto de conteúdo sensível, apresentar escopo e autorização próprios antes dessa ação.

## Approval record

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-07T18:28:12Z"
    approved_by: "user"
    scope_revision: 1
```

[Origem e interpretação da aprovação](../../evidence/SPEC-006-add-youtube-presentation/approval.md). O horário identifica o registro nesta execução, sem atribuir instante exato à mensagem.

## Step progress and prepared handoff

Revision: 1. Três etapas, duas concluídas. Atividade: S-003, inspeção e reconciliação; zero etapas após a atual. Checkpoint PLAN aprovado. AC-4 depende de decisão sobre os trechos editáveis.

## Terminal replacement record

Em 2026-10-07, o usuário aprovou por plano a revisão 2 de PLAN-007 para refazer a apresentação. PLAN-006 foi substituído antes do fechamento de S-003. O deck v1, as etapas S-001/S-002 e a revisão visual de S-003 permanecem como histórico; AC-4 ficou sem capturas incorporadas, e AC-7 não foi concluído nesta versão. Não há aceitação retroativa da exceção. [Transição registrada](../../evidence/SPEC-007-sdd-add-youtube-presentation/approval-and-transition.md).

| Step | Objective | Inputs | Deliverable | Actions/checks | Checkpoint/status |
| --- | --- | --- | --- | --- | --- |
| S-001 | Fechar mensagem/notas/fontes | Roteiro r2, storyboard r1 e respostas do usuário | [Revisão de conteúdo](../../evidence/SPEC-006-add-youtube-presentation/content-review.md) | Precisão, fontes e tempo | PLAN aprovado; concluído |
| S-002 | Criar deck editável | Conteúdo aprovado e arquivos locais | [PPTX e renderizações](../../evidence/SPEC-006-add-youtube-presentation/step-2.md) | Slide count, fontes, notas; capturas pendentes | PLAN aprovado; concluído com diferença documentada |
| S-003 | Verificar e reconciliar | Deck, renderizações, critérios | Entrega validada e evidência | Inspeção visual, ACs e estado idle | PLAN aprovado; ativo |
