---
id: "SPEC-003"
title: "Biblioteca de especialistas para desenvolvimento de jogos"
status: "verified"
origin: "planned"
implementation_preceded_spec: false
created: "2026-10-07"
canonical_refs:
  - "DEC-001"
  - "DEC-002"
---

# Biblioteca de especialistas para desenvolvimento de jogos

## Objective

Revisão 3 aprovada: criar dez skills portáveis e dez definições de agentes, com recomendação por necessidade. O problema inicial de sprites 2D, Godot + ChatGPT, continua atendido por dois especialistas dedicados.

## Context and evidence

[Descoberta](../../evidence/SPEC-003-game-dev-specializations/discovery.md), [pesquisa](../../vault/research/game-animation-sources-2026-10-07.md), [revisões anteriores](revision-notes.md), [aprovação explícita integrada](../../evidence/SPEC-004-add-readiness-and-progress/approval.md). Propostas anteriores estão preservadas nos snapshots pré-execução da SPEC-004.

## Scope

Design/sistemas, gameplay, level/mundo/câmera, conteúdo/narrativa, UI/acessibilidade, áudio/feedback, QA/playtests, performance/entrega, sprite-fit e revisão de animação 2D. Cada skill tem gatilho discriminante, workflow e saída; cada brief tem responsabilidade, entradas/entrega, caminhos/autoridade da tarefa e handoff. Duas referências detalham diagnóstico de sprites; dois templates registram contrato e revisão temporal. Catálogo integra recomendação e adoção.

## Non-goals

Instalar globalmente ou em outros projetos; configurar runtime/modelos ou iniciar agentes; gerar/adquirir/editar assets, executar jogo/provedor, mudar dependências/arquitetura/canon de jogos ou publicar. SPEC-002 continua separada.

## Decisions

Antes da atuação visual: bíblia, identidade aplicável e contexto de cena estruturados, identificados e autorizados. Posição não é pré-requisito. Preparação textual cabe a Atena; tarefas não visuais não herdam bloqueios irrelevantes. Aplicar DEC-002 e distinguir DRAFT/CANON de implementação/verificação.

## Gaps

BLOCKING: nenhum no escopo aprovado; contrato comum implantado pelas primeiras etapas do PLAN-004. RESOLVABLE: pacotes locais autossuficientes, briefs independentes de framework, ferramentas opcionais existentes. DEFERRED: piloto real, avaliação humana de assets/movimento, adoção em outros projetos, instalação global e publicação.

## Acceptance criteria

[Critérios](acceptance.md): dez pacotes/briefs, diagnóstico 2D, readiness sem posição, autoridade, evidência, preservação de descoberta e validação estrutural.

## Impact

Biblioteca em templates/automation/game, catálogo GAME-SPECIALISTS.md, templates de sprites e orientação de Atena, dentro do orçamento integrado de 55 arquivos oficiais da SPEC-004.

## Plan of flight and validation

Execução integrada pelo [PLAN-004 revisão 2](../SPEC-004-add-readiness-and-progress/plan.md); sem segundo plano ativo. Pacotes/links/metadados, fixtures/readiness e cenários documentais. Verificação não comprova comportamento de um modelo, qualidade de arte ou fluidez real.

## Evidence and reconciliation

Registrar checks reais, critérios e pendências ao encerrar o cursor único. Aprovação registrada antes de implementação.

## Risks and recovery

Não confundir fontes portáveis com skills instaladas ou agentes rodando. Reverter somente alterações desta entrega; preservar originais, drafts e evidências.

## Post-hoc disclosure

Não aplicável: apenas pesquisa/proposta precederam a aprovação; implementação posterior.
