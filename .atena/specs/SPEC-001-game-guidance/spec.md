---
id: "SPEC-001"
title: "Trilha guiada para criação de jogos"
status: "verified"
origin: "planned"
implementation_preceded_spec: false
created: "2026-10-05"
canonical_refs:
  - "DEC-001"
---

# Trilha guiada para criação de jogos

## Objective

Definir uma trilha opcional do ADD que orienta a criação de um jogo a partir da conversa, com bíblia visual anterior à recomendação técnica, prontidão explícita do protótipo e playtests com objetivos conhecidos.

## Context and evidence

- [Entrevista e inspeção](../../evidence/SPEC-001-game-guidance/discovery.md).
- [Proposta concreta](../../vault/drafts/game-guidance-proposal.md).
- [Decisão aprovada](../../vault/canon/DEC-001-game-guidance.md).
- `ADD.md` declara o método independente do tipo de projeto; `CONTRACT.md` já admite registros de visão, regras, entidades e lore.
- `INTERACTION.md`, `WORKFLOW.md` e os templates de specs já definem entrevista, aprovação, evidências e reconciliação.
- A mudança cria o registro canônico inicial `DEC-001` deste workspace após a aprovação registrada no plano.

## Scope

- Documentar entrada por sugestão e confirmação, entrevista adaptativa, descoberta e produção por marcos.
- Construir o modelo de bíblia visual inicial antes da recomendação de engine e tecnologias.
- Exigir comunicação das principais pendências do protótipo e do objetivo de cada playtest.
- Fornecer cinco templates opcionais e integrar o processo às instruções copiáveis e ao fluxo ADD.
- Promover a decisão proposta ao cânone se incluída na aprovação explícita deste plano.

## Non-goals

- Construir um jogo ou exemplo executável.
- Prescrever gênero, engine, tecnologias ou arquitetura para todos os jogos.
- Instalar dependências, alterar permissões, criar agentes/skills, gerar assets ou usar serviços pagos.
- Publicar, compartilhar externamente, fazer commits, merge ou push.
- Alterar o schema, os modos de interação ou a semântica de aprovação do ADD v0.2.

## Decisions

| Decision | Choice | Evidence / rationale | Status |
| --- | --- | --- | --- |
| Ativação | Sugerir e confirmar | Primeira resposta da entrevista | confirmado pelo usuário |
| Tecnologia | Recomendar por último na definição inicial, com base em todas as decisões relevantes | Primeira resposta da entrevista | confirmado pelo usuário |
| Escopo da ajuda | Ideia, visão, primeira entrega, specs, produção, playtests e evidências; trilhas complementares opcionais | Recomendação aceita | confirmado pelo usuário |
| Canonicalidade | Drafts durante exploração; promover decisões estáveis após aprovação | Recomendação aceita | confirmado pelo usuário |
| Tipo de jogo | Definido na conversa, sem gênero padrão | Primeira resposta da entrevista | confirmado pelo usuário |
| Experiência do criador | Adaptar orientação a iniciantes e experientes | Segunda resposta da entrevista | confirmado pelo usuário |
| Bíblia visual | Construir antes da escolha de engine | Segunda resposta da entrevista | confirmado pelo usuário |
| Prontidão | Sempre informar pendências principais antes do protótipo | Segunda resposta da entrevista | confirmado pelo usuário |
| Playtests | Atena verifica funcionamento/consistência; usuário avalia experiência; sempre explicar o que testar | Segunda resposta da entrevista | confirmado pelo usuário |
| Integração | Documentação e templates opcionais no contrato existente | Arquitetura mínima, compatível com ADD v0.2 | default aprovado no plano |

## Gaps

### BLOCKING

- Nenhuma. Modo `per-plan` selecionado e checkpoint `PLAN` aprovado conforme o registro do plano.

### RESOLVABLE

- Tamanho das rodadas: recomendar até três perguntas relacionadas para facilitar a entrevista.
- Profundidade da bíblia: inicial suficiente para orientar o protótipo, refinada por marcos.
- Participação humana: obrigatória para comprovar critérios subjetivos definidos pelo marco; outros checkpoints dependem da spec do jogo.
- Tecnologia em projeto existente: preservar decisões já estabelecidas e propor revisão apenas quando houver conflito demonstrável.
- Idioma: manter documentação oficial em inglês, conforme o repositório, com exemplos de interação em português.

### DEFERRED

- Exemplos executáveis por engine, automação de validação do método, produção de assets e integrações com provedores.
- Identidade visual completa de qualquer jogo: pertence à trilha aplicada a um jogo real.

## Acceptance criteria

Consultar [acceptance.md](acceptance.md); os onze critérios documentais foram verificados, com evidências e limites registrados no relatório de resultado.

## Impact

### Expected files/systems

- `GAMES.md`, `README.md`, `INTERACTION.md`, `WORKFLOW.md`, `templates/AGENTS.md`.
- `templates/game/vision.md`, `design.md`, `visual-bible.md`, `prototype-readiness.md`, `playtest.md`.
- Registros desta spec, evidências, estado e o registro inicial em `.atena/vault/canon/` após aprovação.

### Canonical impact

Criação aprovada de `DEC-001`, promovido de drafts ao cânone. Aprovação abrange a intenção delimitada nesta spec.

## Risks

- Entrevista excessiva: reutilizar respostas, apresentar defaults e limitar rodadas.
- Bíblia visual bloquear exploração por perfeccionismo: exigir versão inicial suficiente e explicitar pendências adiadas.
- Tecnologia influenciar o conceito cedo demais: determinar necessidades antes da recomendação técnica.
- Confundir confirmação da trilha com autorização de execução: manter os checkpoints ADD explícitos.
- Afirmar diversão sem jogar: separar verificações técnicas de avaliações humanas.

## Post-hoc disclosure

Not applicable. Bootstrap, descoberta e rascunhos precederam a aprovação; implementação documental ocorre após o checkpoint registrado no plano.
