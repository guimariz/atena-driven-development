---
title: "SDD e Atena/ADD em um pedido prático"
status: "draft"
revision: 2
created: "2026-10-07"
spec_ref: "SPEC-007"
---

# SDD e Atena/ADD em um pedido prático

Storyboard DRAFT revisão 2, autorizado como insumo de PLAN-007 revisão 2, sem promoção a CANON. Público: iniciantes em IA e desenvolvimento. Vídeo narrado para YouTube, no máximo 15 minutos. Um pedido novo é demonstrado do início ao fim: acrescentar um resumo de status a um miniprojeto local, alternando slides e arquivos reais. A revisão 2 acrescenta a função e o uso atual dos vaults e do grafo.

| Slide | Tempo | Mensagem na tela | Narração e visual |
| --- | --- | --- | --- |
| 1. Um pedido, várias decisões | 0:30 | “Como transformar uma ideia em mudança verificável?” | Abrir com o pedido pequeno e prometer acompanhar decisão, implementação e prova. |
| 2. O que é SDD | 1:15 | Intenção e critérios → plano → tarefas → implementação → verificação | Explicar Spec Driven Development em linguagem simples: a spec explicita o que/por quê e o que contará como pronto; o plano descreve como. Distinguir o conceito geral do exemplo de ferramenta Spec Kit. |
| 3. O que a Atena acrescenta | 1:15 | SDD + memória local + autoridade humana + evidência | Definir ADD v0.2 e seus dois caminhos: Guided ADD como trilha da demonstração; Direct Execution como caminho rápido que requer reconciliação honesta. |
| 4. Vaults: o que fica e por quê | 2:00 | `vault/canon`: intenção aprovada; `vault/drafts`: propostas; `vault/research`: fontes e hipóteses | Mostrar arquivos reais: DEC-001/DEC-002 no canon, storyboard DRAFT e uma pesquisa local. Explicar a promoção explícita para canon, os IDs e fontes; situar `add.yaml`, `specs/`, `evidence/` e `state/plan.yaml` em torno do vault. |
| 5. Graphs: relações derivadas | 1:15 | `DEC-002 → DEC-001` → grafo derivado em `generated/` | Mostrar a relação real de `DEC-002` com `DEC-001`. Explicar que nós e ligações devem derivar de IDs/relações aprovados, para navegar dependências e checar links; inferências não viram canon. O projeto configura `generated/graph.production.json`, mas esse arquivo ainda não existe: apresentar o diagrama como ilustração do vínculo, não como exportação executada. |
| 6. O pedido vira spec | 1:45 | “Atena, acrescente um resumo de status…” → escopo, não objetivos, critérios | Mostrar o prompt recomendado, o contexto mínimo, os gaps e um trecho real da spec do miniprojeto de demonstração. DRAFT e CANON são estados diferentes de aprovação. |
| 7. Plano e checkpoint | 1:40 | Etapas pequenas → aprovação por plano/lote/etapa → cursor | Mostrar o plano, os limites e uma decisão explícita. A aprovação cobre o escopo nomeado; ações materiais têm gates próprios. |
| 8. Mudança, teste e evidência | 2:00 | Antes → depois → verificação → resultado | Executar a mudança pequena na demonstração, conferir os critérios e mostrar evidência registrada. Não atribuir ao teste conclusões que ele não mede. |
| 9. Cinco práticas para usar Atena | 2:20 | Resultado; contexto; critérios; revisão; evidência | Dar um modelo curto de pedido: objetivo, restrições, fonte do estado atual, definição de pronto e decisões pendentes. Recomendar escopo pequeno, revisão de canon/checkpoints e leitura do resultado. |
| 10. Fecho: repita o ciclo | 0:45 | “Pedido claro → mudança delimitada → prova verificável” | Retomar SDD e ADD, convidar a começar por uma mudança pequena e indicar que o próximo vídeo pode aprofundar estruturas específicas. |

Total: **14:45**. A demonstração cruza os slides 6–8 e será explicitamente identificada como exemplo preparado para o vídeo; nenhum arquivo histórico será apresentado como se tivesse sido criado durante a gravação.

## Direção de produção

- PPTX 16:9 editável, tipografia grande, dez slides, diagramas como objetos de apresentação e notas de narração por slide.
- Imagens de interface ou arquivos só se vierem do miniprojeto real e forem legíveis; trechos editáveis serão identificados como trechos, nunca chamados de capturas.
- Gravação, edição, thumbnail e publicação ficam fora do escopo. A apresentação incluirá marcas de troca para gravação de tela.
- Para caber em 15 minutos, as estruturas obrigatórias recebem função breve no vídeo e detalhe nas notas/roteiro. O slide 5 distingue grafo planejado/ilustrado de artefato efetivamente gerado.

## Fontes e estados

- SDD: [conceito do GitHub Spec Kit](https://github.com/github/spec-kit/blob/main/docs/concepts/sdd.md) e [referência do fluxo](https://github.github.com/spec-kit/reference/agentic-sdd.html), consultados em 2026-10-07. Spec Kit é referência externa, não dependência do ADD.
- ADD: `ADD.md`, `INTERACTION.md`, `WORKFLOW.md`, `CONTRACT.md`, `POLICIES.md` e `AUTONOMY.md` deste projeto.
- O roteiro anterior é DRAFT revisão 2; este storyboard é DRAFT revisão 2. Nenhum deles foi promovido a CANON.
- Vaults e graph: `ADD.md` (três camadas), `POLICIES.md` (grafo derivado), `.atena/add.yaml` (saída configurada) e `.atena/vault/canon/DEC-002-visible-plan-and-visual-readiness.md` (relação real com `DEC-001`). [Inspeção local](../../evidence/SPEC-007-sdd-add-youtube-presentation/vault-graph-discovery.md).
