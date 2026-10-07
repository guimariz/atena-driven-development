---
id: "SPEC-005"
title: "Roteiro explicativo da Atena e da estrutura do ADD"
status: "verified"
origin: "planned"
implementation_preceded_spec: false
created: "2026-10-07"
canonical_refs:
  - "DEC-001"
  - "DEC-002"
---

# Roteiro explicativo da Atena e da estrutura do ADD

## Objective

Entregar um roteiro em português que explique a Atena, as estruturas do ADD v0.2 e seus conceitos, conectando finalidade, arquivos e um exemplo de uso. A preparação entregou a proposta DRAFT revisão 1; o usuário aprovou o plano por inteiro em 2026-10-07.

## Context and evidence

- Pedido de 2026-10-07: “Atena, analise a estrutura do ADD e vamos fazer um roteiro para explicar cada estrutura e cada conceito envolvido na Atena.”
- Na descoberta não havia plano ativo; o estado foi validado como `idle` antes da aprovação.
- [Descoberta e fontes](../../evidence/SPEC-005-add-explanatory-script/discovery.md).
- [Proposta inicial](../../vault/drafts/roteiro-explicativo-add.md), DRAFT revisão 1, preparada durante descoberta.
- [DEC-001](../../vault/canon/DEC-001-game-guidance.md) e [DEC-002](../../vault/canon/DEC-002-visible-plan-and-visual-readiness.md) orientam a seção de jogos, especialistas e maturidade.
- SPEC-002 deste repositório permanece uma proposta separada não aprovada.

## Scope

- Explicar método, papéis, princípios, configuração, instruções, workspace e pacote distribuível.
- Explicar canon/drafts/research, specs, planos/tarefas/aceitação, evidência, estado e derivados.
- Explicar modos de interação, lacunas, aprovação, autonomia, gates, desvios, retomada e reconciliação.
- Explicar extensão por skills/agentes e aplicação opcional em jogos, incluindo prontidão visual e feedback humano.
- Desenvolver os 14 blocos propostos em falas, demonstrações e transições, com glossário e matriz de cobertura.
- Usar exemplos explicitamente ilustrativos e referências reais do projeto; verificar links e consistência documental.

## Non-goals

- Alterar regras, arquitetura, canon, configuração, dependências ou validadores do ADD.
- Implementar SPEC-002, instalar skills, iniciar especialistas ou construir jogo.
- Criar vídeo, deck, imagens ou publicação; esses formatos podem receber escopo próprio depois.
- Migrar projetos existentes, publicar, compartilhar externamente ou executar operações Git de escrita.
- Garantir adesão comportamental de modelos ou afirmar validação de runtime/playtests.

## Decisions

| Decision | Choice | Evidence / rationale | Status |
| --- | --- | --- | --- |
| Idioma | Português | Idioma do pedido e contexto da interação | default |
| Público | Introdução acessível com aprofundamento na demonstração | Público ainda não especificado; estrutura modular permite adaptação | default |
| Meio inicial | Roteiro textual local | Reutiliza workspace e permite revisão antes de escolher mídia | default |
| Ordem | Finalidade, papéis, estruturas, fluxo, aplicação | Ligar cada arquivo ao problema que resolve | proposta revisão 1 |
| Exemplo | Mudança pequena de documentação; exemplos reais de example-project | Evitar tecnologia ou dependência desnecessária | default |
| Maturidade | Roteiro DRAFT sem promoção | Explicação editorial não altera intenção canônica | delimitado |

## Gaps

### BLOCKING

- Nenhuma para o escopo textual proposto. Seleção de modo e aprovação são requisitos de autorização pendentes.

### RESOLVABLE

- Público/uso: pergunta opcional enviada sem resposta específica; aplicar o default introdutório com demonstração, ajustável a uma correção posterior.
- Duração: manter módulos sem fixar minutagem antes da escolha de mídia.
- Profundidade: cobrir todos os grupos conceituais com linguagem simples e reservar detalhes dos campos para consulta/demonstração.

### DEFERRED

- Vídeo, slides, narração gravada, identidade visual da apresentação e publicação.
- Piloto com público externo e avaliação do comportamento de assistentes.
- Revisão normativa de eventuais inconsistências do método encontradas na auditoria: registrar, sem corrigi-las neste escopo.

## Acceptance criteria

- [x] AC-1: Explicar cada estrutura obrigatória de CONTRACT.md, add.yaml, instruções e estrutura do pacote.
- [x] AC-2: Mapear os grupos de conceitos dos oito guias, distinguindo método, orquestração e execução.
- [x] AC-3: Diferenciar DRAFT/CANON, aprovação/implementação/verificação e planned/post-hoc.
- [x] AC-4: Percorrer Guided ADD e Direct Execution, lacunas, checkpoints, cursor, desvios, gates e reconciliação.
- [x] AC-5: Explicar habilidades/agentes e jogos como capacidades opcionais, sem afirmar ativação automática; preservar status de SPEC-002.
- [x] AC-6: Cada bloco desenvolvido contém fala, exemplo/demonstração e transição, com glossário e fontes locais válidas.
- [x] AC-7: Evidência registra cobertura, links, checks e limites; estado final é reconciliado sem alterar canon ou configuração.

## Impact

### Expected files/systems

- `.atena/vault/drafts/roteiro-explicativo-add.md`.
- Esta spec, plano, tarefas, aceitação e `.atena/evidence/SPEC-005-add-explanatory-script/`.
- `.atena/state/plan.yaml` apenas na execução posterior aprovada e para seu encerramento.

### Canonical impact

Nenhuma promoção ou revisão canônica. O roteiro explica o contrato e as decisões existentes. Aprovação editorial do roteiro não reescreve as regras do método.

## Plan of flight and validation

Ver [PLAN-005](plan.md), revisão 1. Comparar cobertura com os guias, verificar links/contrato, revisar exemplos e registrar ACs. A revisão documental não prova resultado de uma aula, adesão de IA ou experiência de jogo.

## Evidence and reconciliation

Preparação registrada em [discovery.md](../../evidence/SPEC-005-add-explanatory-script/discovery.md). Após aprovação, registrar resultado e checks, manter adiados explícitos e encerrar o cursor somente depois de documentar o resultado terminal.

## Risks

- Explicação excessiva: módulos e exemplo único ligam os detalhes à finalidade.
- Confundir proposta com funcionalidade: qualificar templates, derivados e SPEC-002 pelo estado real.
- Criar novas regras ao simplificar: manter matriz de fontes e preservar força/condições das afirmações.

## Completion

PLAN-005 revisão 1 concluído após a aprovação `per-plan`. O [resultado](../../evidence/SPEC-005-add-explanatory-script/result.md) documenta a entrega e a verificação do roteiro DRAFT revisão 2. Este status descreve a spec, sem promover o roteiro a CANON.

## Post-hoc disclosure

Não aplicável. Inspeção e proposta inicial são preparação; não houve execução do plano de desenvolvimento antes desta spec.
