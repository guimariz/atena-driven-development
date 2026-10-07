---
id: "SPEC-006"
title: "Apresentação da Atena e do ADD para vídeo"
status: "superseded"
origin: "planned"
implementation_preceded_spec: false
created: "2026-10-07"
canonical_refs:
  - "DEC-001"
  - "DEC-002"
---

# Apresentação da Atena e do ADD para vídeo

## Objective

Entregar um PPTX editável de dez slides, com notas de narração para um vídeo prático de cerca de 20 minutos no YouTube. A apresentação parte do roteiro DRAFT revisão 2, acompanha um pedido pequeno até a evidência e usa diagramas simples e capturas legíveis de arquivos reais.

## Context and evidence

- O [roteiro concluído](../../vault/drafts/roteiro-explicativo-add.md) é DRAFT revisão 2, verificado documentalmente pela SPEC-005.
- O usuário aprovou a recomendação de dez slides e cerca de 20 minutos escrevendo `aprovado`.
- O usuário informou que gravará um vídeo para YouTube e escolheu tom prático, um caso contínuo, diagramas simples e capturas dos arquivos.
- O estado do projeto estava `idle` antes da ativação; após revisar o plano, o usuário escolheu aprovação `per-plan` para o PLAN-006 revisão 1.
- [Storyboard DRAFT revisão 1](../../vault/drafts/apresentacao-add-youtube.md) preparado a partir dessa decisão.

## Scope

- Produzir dez slides no total, incluindo abertura, com conteúdo em português e notas para narração gravada.
- Usar o resumo de status como exemplo contínuo, com demonstração breve de `example-project/`.
- Incluir estruturas obrigatórias, DRAFT/CANON, modos, spec, gaps, aprovação, cursor, gates, evidência/reconciliação e aplicações opcionais.
- Criar diagramas explicativos editáveis e capturas fiéis e legíveis dos arquivos locais pertinentes.
- Renderizar e inspecionar os dez slides, corrigindo cortes, sobreposição, legibilidade e afirmações imprecisas.
- Entregar o deck em `presentations/atena-add-youtube.pptx` e registrar evidência/aceitação em `.atena/evidence/SPEC-006-add-youtube-presentation/`.

## Non-goals

- Gravar, editar, publicar ou enviar vídeo/deck ao YouTube ou outro destino externo.
- Alterar o roteiro base, regras, canon, arquitetura, dependências ou código do ADD.
- Instalar ou iniciar especialistas, criar jogo, executar playtest ou avaliar entendimento do público.
- Incluir métricas, depoimentos ou fatos externos sem fonte.

## Decisions

| Decision | Choice | Evidence / rationale | Status |
| --- | --- | --- | --- |
| Formato | PPTX local editável com dez slides | Apresentação aprovada, disponível para gravação e edição | proposta delimitada |
| Uso | Vídeo narrado de cerca de 20 minutos | Resposta explícita do usuário | decidido |
| Tom | Explicação prática com um caso contínuo | Resposta explícita do usuário | decidido |
| Visual | Diagramas simples e capturas reais | Resposta explícita do usuário | decidido |
| Público | Pessoas conhecendo ADD no YouTube | Canal indicado e recomendação introdutória aprovada | default fundamentado |
| Tempo | Slides 1–10 totalizam aproximadamente 20 minutos, com demonstração no slide 9 | Adaptação da recomendação aprovada ao vídeo | default fundamentado |
| Design | 16:9, tipografia grande, layout limpo e sem cliques necessários | Legibilidade na gravação | default fundamentado |

## Gaps

### BLOCKING

- Nenhuma para produzir o deck local. O modo `per-plan` e o checkpoint PLAN da revisão 1 foram aprovados antes da execução. A diferença detectada na entrega está registrada em AC-4.

### RESOLVABLE

- Perfil exato dos espectadores: tratar como público introdutório, explicando termos no primeiro uso.
- Uso de template: nenhum indicado; usar direção visual simples escolhida pelo usuário. Picker de templates não está disponível neste ambiente.
- Identidade visual específica: usar o conteúdo e as capturas do projeto, sem aplicar a marca de voz da Atena ao material entregue.

### DEFERRED

- Roteiro completo da locução palavra por palavra além das notas.
- Gravação, trilha, legendas, thumbnail, metadados e publicação do vídeo.
- Teste com espectadores e revisão da apresentação após feedback real.

## Acceptance criteria

- [ ] AC-1: PPTX editável existe com exatamente dez slides, incluindo abertura, na ordem do storyboard.
- [ ] AC-2: Slides e notas cobrem os grupos centrais do roteiro, com fonte local e status DRAFT/CANON corretos.
- [ ] AC-3: O mesmo exemplo aparece ao longo da narrativa; a demonstração aponta registros reais e distingue exemplo histórico de nova execução.
- [ ] AC-4: Diagramas explicativos são editáveis; capturas são fiéis, legíveis e recortadas sem omitir contexto relevante.
- [ ] AC-5: Renderização dos dez slides não apresenta cortes/sobreposições materiais e preserva legibilidade para vídeo.
- [ ] AC-6: Notas identificam tempo aproximado, fala e troca para demonstração; o total previsto fica próximo de 20 minutos.
- [ ] AC-7: Evidência e estado são reconciliados; canon, roteiro base e SPEC-002 preservam seus estados; publicação permanece fora do escopo.

## Impact

### Expected files/systems

- `presentations/atena-add-youtube.pptx`.
- Storyboard em `vault/drafts/`, esta spec/plan/tasks/acceptance e evidências da entrega.
- `.atena/state/plan.yaml` durante execução aprovada e até o resultado terminal.

### Canonical impact

Nenhum. Aprovação para criar a apresentação não promove o storyboard, o roteiro ou conteúdo de slides a CANON.

## Plan of flight and validation

Ver [PLAN-006](plan.md). Inspecionar a renderização e as notas, conferir slide count/conteúdo/editabilidade e validar o estado ADD. A verificação do deck não equivale a teste do vídeo publicado ou compreensão dos espectadores.

## Evidence and reconciliation

Registrar escolhas, capturas usadas, renderizações, checks, limitações e resultado em `.atena/evidence/SPEC-006-add-youtube-presentation/`. Encerrar o cursor somente após o resultado terminal documentado.

## Risks

- Dez slides para muitos conceitos: manter textos curtos na tela e detalhes nas notas e no exemplo.
- Capturas ilegíveis no vídeo: escolher recortes de poucos campos e revisar a renderização em tamanho de apresentação.
- Confundir draft, aprovação de execução e canon: identificar estados com precisão.
- Sugerir publicação autorizada: limitar a entrega ao PPTX local.

## Post-hoc disclosure

Não aplicável. O storyboard é preparação após aprovação da ideia geral; o PPTX não foi criado antes da spec.
