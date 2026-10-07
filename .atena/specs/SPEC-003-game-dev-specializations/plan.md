---
id: "PLAN-003"
spec_id: "SPEC-003"
status: "completed"
approval:
  mode: "per-plan"
---

# Plan of flight — SPEC-003

## Plan mode

Origin: planned; reconstruction: false; revision: 3. Plano de entrega integrado, não um segundo cursor concorrente. Aprovação explícita da mesma mensagem que aprovou PLAN-004, sem herança de autorização anterior.

## Recommended approach

Executar fundamentos da SPEC-004 antes dos pacotes; criar dez pares, catálogo e templates; validar e reconciliar pelo cursor PLAN-004.

## Reuse

Contrato ADD v0.2, skills locais opcionais, runtime Node existente, formatos de plan/evidência.

## Implementation sequence

1. `S-001` — Verificar contrato/readiness implementados pelo PLAN-004 S-002/S-003.
2. `S-002` — Criar dez skills e dez briefs pelo PLAN-004 S-005.
3. `S-003` — Integrar catálogo por necessidade pelo PLAN-004 S-006.
4. `S-004` — Validar critérios pelo PLAN-004 S-007.
5. `S-005` — Reconciliar entrega pelo PLAN-004 S-008.

## Approval checkpoints

PLAN cobre esta entrega e sua integração no PLAN-004; um único cursor operacional, sem aprovação redundante.

## Expected changes

Dez diretórios de skill, dez briefs, duas referências, dois templates, catálogo/índice e orientação. Orçamento integrado de 55 arquivos oficiais, registros à parte.

## Validation

Frontmatter/names/referências, entradas/entregas/autoridade, readiness aplicável e diagnóstico de sprites. Runtime/human review ausentes são pendentes.

## Limits

Três reparos por check; sem installs/delegação/modelo/assets/publicação/alteração de outros projetos.

## Recovery

Preservar evidências e snapshots; restaurar somente arquivos deste escopo.

## Mandatory gates

A autorização atual cobre a biblioteca e integração local; adoção externa/global e publicação continuam fora do escopo.

## Approval record

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-07T17:21:47.123Z"
    approved_by: "user"
    scope_revision: 3
```

[Mensagem e escopo](../../evidence/SPEC-004-add-readiness-and-progress/approval.md).

## Completion record

Encerrado em 2026-10-07T17:39:20.963Z; execução integrada pelo PLAN-004. Resultado/evidência registrados; nenhum passo restante neste escopo.
