---
id: "PLAN-004"
spec_id: "SPEC-004"
status: "completed"
approval:
  mode: "per-plan"
---

# Plan of flight — SPEC-004

## Plan mode

Origin: planned; reconstruction: false; revision: 2. Execução integrada da SPEC-003 revisão 3, autorizada pela mesma mensagem, sem herdar autorização anterior.

## Recommended approach

Contrato/readiness antes dos especialistas; biblioteca portável e recomendação por necessidade; validar fatos documentais sem alegar runtime.

## Reuse

DEC-001, estado/schema v2, templates existentes, Node local; nenhuma dependência nova.

## Implementation sequence

1. `S-001` — Registrar revisão e aprovação.
2. `S-002` — Estruturar prontidão visual e adoção.
3. `S-003` — Implantar progresso e estados draft/canon.
4. `S-004` — Validar semântica dos planos.
5. `S-005` — Criar skills e agentes.
6. `S-006` — Integrar recomendação por necessidade.
7. `S-007` — Verificar critérios e pacotes.
8. `S-008` — Reconciliar evidências e encerrar.

## Approval checkpoints

PLAN cobre S-001 a S-008 e DEC-002 revisão 2. Modos por lote/etapa continuam disponíveis para outros planos.

## Expected changes

Até 55 arquivos oficiais, DEC-002 e registros operacionais enumerados na spec.

## Validation

Validar referências e autorização nos três modos, persistência PENDING, contagem pela ordem real, readiness aplicável, dez pacotes/briefs e links/contrato.

## Limits

Três reparos por falha; nenhum custo/provedor/instalação/global/remote write.

## Recovery

Snapshots anteriores à implementação preservados na evidência; reverter somente este escopo.

## Mandatory gates

Nenhuma ação além da aprovação registrada; publicação/dependências/arquitetura externa permanecem fora do escopo.

## Approval record

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-07T17:21:47.123Z"
    approved_by: "user"
    scope_revision: 2
```

[Origem e interpretação da aprovação](../../evidence/SPEC-004-add-readiness-and-progress/approval.md).

## Prepared step details

| Step | Objective | Inputs | Deliverable | Checks | Authority |
| --- | --- | --- | --- | --- | --- |
| S-001 | Registrar escopo/aprovação | Propostas e mensagem | Revisões e DEC-002 | Limites e origem real | PLAN aprovado |
| S-002 | Estruturar readiness/adoção | DEC-001/002, auditoria | Guias/templates | Aplicabilidade e ausência de gate posição | PLAN aprovado |
| S-003 | Progresso e maturidade | Contrato atual | Defaults e instruções | Modos preservados e draft/canon explícitos | PLAN aprovado |
| S-004 | Semântica de plano | Schema v2 e auditoria | Validador/fixtures | Referências/checkpoints e persistência | PLAN aprovado |
| S-005 | Criar especialistas | Requisitos e readiness | Dez skills/briefs, refs/templates | Escopo/entradas/entregas | PLAN aprovado |
| S-006 | Recomendação por necessidade | Pacotes e regras | Catálogo e adoção | Roteamento documental | PLAN aprovado |
| S-007 | Validar entrega | Todos os arquivos | Resultados e reparos necessários | Fixtures, pacotes, links e critérios | PLAN aprovado |
| S-008 | Reconciliar e fechar | Checks da S-007 e aprovação | Evidência, critérios, estado inativo | Contrato final e nenhuma pendência do escopo | PLAN aprovado |

Tabela detalhada persistida durante S-007, antes de S-008; não se apresenta sua criação como anterior às etapas já realizadas.

## Completion record

Encerrado em 2026-10-07T17:39:20.963Z; execução integrada pelo PLAN-004. Resultado/evidência registrados; nenhum passo restante neste escopo.
