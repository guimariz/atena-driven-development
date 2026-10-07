---
id: "PLAN-001"
spec_id: "SPEC-001"
status: "completed"
approval:
  mode: "per-plan"
---

# Plan of flight — SPEC-001

## Plan mode

- Origin: `planned`.
- Reconstruction: `false`.
- Revision: 1.
- Execution: checkpoint `PLAN` aprovado; implementação local e reconciliação concluídas. Resultado em [result.md](../../evidence/SPEC-001-game-guidance/result.md).

## Recommended approach

Implementar a [proposta](../../vault/drafts/game-guidance-proposal.md) como documentação e cinco templates opcionais dentro do ADD v0.2. Recomendar `per-plan` para este escopo local e delimitado.

## Reuse

Reutilizar contrato `.atena/`, entrevista Guided ADD, classes de lacunas, gates, metadados canônicos, specs, plano persistente e evidências existentes. Não introduzir perfil obrigatório nem dependência.

## Implementation sequence

1. `S-001` — Registrar aprovação, promover a decisão delimitada e ativar o cursor.
2. `S-002` — Criar `GAMES.md` com ativação, entrevista, bíblia visual, recomendação técnica, protótipo e playtests.
3. `S-003` — Criar os cinco templates de jogos.
4. `S-004` — Integrar referências a README, interação, workflow e instruções copiáveis.
5. `S-005` — Revisar contrato, links, cenários e critérios de aceitação.
6. `S-006` — Registrar evidências, reconciliar fatos operacionais e encerrar o cursor.

## Approval checkpoints

- `per-plan`: `PLAN` cobre `S-001` a `S-006`.
- Se escolhido `per-batch`: `B-001` cobre `S-001` a `S-003`; `B-002` cobre `S-004` a `S-006`.
- Se escolhido `per-step`: um checkpoint para cada `S-XXX`.
- A seleção do modo não é, por si só, aprovação de execução.

## Expected changes

Dez arquivos oficiais: `GAMES.md`, quatro pontos de integração e cinco templates. Acrescentar o cânone aprovado e atualizar os artefatos operacionais desta spec. Não modificar assets, schema, exemplos existentes ou dependências.

## Validation

- Revisão dos onze critérios em [acceptance.md](acceptance.md).
- Exercitar por leitura seis cenários documentados: nova ideia, conceito desenvolvido, recusa, engine preexistente, pendência bloqueante, playtest sem retorno humano.
- Verificar presença do contrato, estado conforme o schema existente, IDs e destinos dos links locais adicionados.
- Revisar o diff para escopo, consistência entre documentos e preservação dos gates.
- Registrar resultados concretos; cenários de revisão textual não constituem prova de comportamento de qualquer modelo em runtime.

## Limits

- Max retries: 3 para cada falha de validação.
- Changed-file budget: 20 arquivos substantivos na implementação, excluindo os rascunhos de preparação já criados.
- Somente arquivos locais listados no escopo; custo externo zero.
- Sem commits, push, instalação, geração de assets ou publicação.

## Recovery

Preservar rascunhos e histórico da spec. Corrigir ou desfazer somente as alterações atribuíveis a este plano, por patches revisáveis; nunca resetar o workspace. Registrar uma revisão sucessora se a intenção aprovada mudar.

## Mandatory gates

- Aprovação explícita cobre a mudança nas regras documentadas e a promoção delimitada de `DEC-001`.
- Qualquer nova ação destrutiva, dependência, integração, custo ou publicação requer análise e aprovação fora deste escopo.

## Approval record

```yaml
mode: "per-plan"
checkpoints:
  - id: "PLAN"
    status: approved
    approved_at: "2026-10-05T12:17:33Z"
    approved_by: "user"
    scope_revision: 1
```

O usuário respondeu `1` à apresentação da proposta e à seleção de aprovação. No contexto da solicitação, a resposta foi interpretada como escolha de `per-plan` e aprovação do escopo apresentado, incluindo a mudança documental e a promoção de `DEC-001`. O horário acima registra esta aprovação no workspace; não presume o horário exato do envio da mensagem. As confirmações anteriores de requisitos na entrevista não são apresentadas como aprovação anterior de execução.
