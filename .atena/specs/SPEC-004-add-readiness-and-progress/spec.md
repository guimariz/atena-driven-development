---
id: "SPEC-004"
title: "Prontidão visual, progresso e biblioteca de especialistas"
status: "verified"
origin: "planned"
implementation_preceded_spec: false
created: "2026-10-07"
canonical_refs:
  - "DEC-001"
  - "DEC-002"
---

# Prontidão visual, progresso e biblioteca de especialistas

## Objective

Implantar o contrato aprovado e dez pares skill/agente recomendáveis conforme a necessidade de qualquer jogo. Revisão 2: remove apenas a exigência de posição e incorpora a entrega da SPEC-003 revisão 3.

## Context and evidence

[Descoberta](../../evidence/SPEC-004-add-readiness-and-progress/discovery.md), [auditoria do schema](../../evidence/SPEC-004-add-readiness-and-progress/schema-audit.json) e [aprovação exata](../../evidence/SPEC-004-add-readiness-and-progress/approval.md). As propostas originais estão preservadas nos snapshots da evidência.

## Scope

Bíblia visual, identidade aplicável e contexto de cena estruturados antes da atuação visual; progresso por etapa com próxima etapa preparada; clareza de draft/canon e autorização; validação semântica do estado; ativação e adoção local; dez skills e dez briefs com catálogo por necessidade. Promover DEC-002 revisão 2.

## Non-goals

Instalação global, outros projetos, credenciais, permissões, dependências, live delegation, execução de modelo/jogo/provedor, produção de assets ou publicação. Não implementar SPEC-002 nem mudar o schema de estado.

## Decisions

Posição não é pré-requisito. Uso de draft autorizado não é promoção. Aprovação por plano cobre este escopo; reportar progresso não cria novas aprovações. Agentes são definições reutilizáveis; runtime/delegação não são configurados nesta entrega.

## Gaps

BLOCKING: nenhum no escopo aprovado. RESOLVABLE: mínimos aplicáveis, formatos locais suportados e templates portáveis. DEFERRED: migração de jogos existentes, avaliação comportamental de modelos, piloto real de sprites, instalação global e publicação.

## Acceptance criteria

[Critérios](acceptance.md), incluindo agora dez skills/briefs e recomendação conforme necessidade.

## Impact

Até 55 arquivos oficiais: guias ADD, root/template AGENTS, três configurações, templates de plano/readiness/sprites, catálogo, dez pacotes e briefs, validadores e fixtures. Além de DEC-002 e registros delimitados das SPEC-003/004. Schema e histórico preservados.

## Plan of flight

[PLAN-004](plan.md), oito etapas integrando a entrega autorizada da SPEC-003.

## Validation

Fixtures de modos/referências/cursor, readiness sem posição, pacotes/links/metadados e cenários documentais. Validação estrutural não comprova comportamento em chats passados nem qualidade de animações reais.

## Evidence and reconciliation

Registrar critérios, resultados reais, limitações e evolução das etapas antes de encerrar o cursor.

## Risks and recovery

Evitar bloqueio circular de descoberta: Atena estrutura texto antes da produção visual. Não confundir catálogo portável com instalação automática. Restaurar apenas alterações desta execução a partir dos snapshots/patches.

## Post-hoc disclosure

Não aplicável: implementação posterior à aprovação; preparação e auditoria foram anteriores.
