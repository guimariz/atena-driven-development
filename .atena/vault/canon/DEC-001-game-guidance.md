---
id: "DEC-001"
type: "decision"
title: "Trilha guiada para criação de jogos"
status: "verified"
created: "2026-10-05"
reviewed: "2026-10-05"
relations: []
sources:
  - "../../evidence/SPEC-001-game-guidance/discovery.md"
  - "../../evidence/SPEC-001-game-guidance/result.md"
---

# Trilha guiada para criação de jogos

## Statement

ADD oferece uma trilha de jogos que Atena sugere quando reconhece a intenção de criar um jogo e ativa após confirmação. A entrevista adapta-se à experiência e às respostas do usuário. Visão, design, escopo, bíblia visual e objetivo da primeira entrega fundamentam a recomendação de engine e tecnologias, apresentada por último na definição inicial.

Antes do protótipo, Atena sempre apresenta as principais pendências e distingue bloqueios, decisões com defaults e itens adiados. Cada playtest tem objetivo, roteiro e critérios explícitos. Atena valida funcionamento e consistência; o usuário experimenta e avalia sensação, dificuldade e diversão.

## Rationale

ADD já admite jogos, lore, requisitos e evidências visuais, mas não oferece uma sequência de descoberta e templates específicos. O usuário confirmou a abordagem adaptativa e determinou a inclusão da bíblia visual antes da escolha de engine.

## Consequences

- Manter o contrato ADD v0.2 e usar templates opcionais para jogos.
- Preservar decisões existentes e recomendar tecnologia conforme as necessidades reais de cada jogo.
- Promover intenção e lore para o cânone somente após revisão e aprovação explícitas.
- Manter a confirmação da trilha separada da autorização de implementação.
- Registrar escolhas visuais ainda experimentais como hipóteses, não como intenção aprovada.

## Open questions

- Nenhuma dentro do escopo aprovado. Exemplos executáveis e integrações permanecem adiados na spec.

## Review record

- Proposed by: Atena, a partir da entrevista de 2026-10-05.
- Reviewed by: usuário confirmou os requisitos descritos no registro de descoberta e respondeu `1` à apresentação do plano.
- Approval decision: aprovação por plano registrada em [PLAN-001](../../specs/SPEC-001-game-guidance/plan.md), revisão 1, incluindo promoção deste registro ao cânone.

## Operational implementation record

- Implemented: 2026-10-05, em `GAMES.md`, cinco templates opcionais e quatro integrações documentais.
- Evidence: [resultado e reconciliação](../../evidence/SPEC-001-game-guidance/result.md).
- Verified: 2026-10-05, critérios documentais e verificação estrutural concluídos; sem execução de jogo ou avaliação de comportamento de modelos.
- Deferred: exemplos executáveis por engine, automação, produção de assets e integrações com provedores.
