---
title: "Apresentação sobre Atena e ADD para vídeo"
status: "draft"
revision: 1
created: "2026-10-07"
spec_ref: "SPEC-006"
---

# Apresentação sobre Atena e ADD para vídeo

Storyboard DRAFT revisão 1. Formato aprovado pelo usuário: 10 slides, cerca de 20 minutos, explicação prática e um caso acompanhado do início ao fim. A apresentação será narrada em vídeo para YouTube. Diagramas simples e capturas dos arquivos reais devem mostrar a estrutura do método. O usuário fará a publicação; esta proposta delimita a criação local do deck.

O exemplo contínuo é “acrescentar um resumo de status” em um projeto. `example-project/` contém registros reais que mostram os dois caminhos do ADD. Na demonstração, a narração deve distinguir os registros históricos do exemplo de qualquer execução nova.

## Slide 1 Atena e ADD

- **Tempo:** 0:45.
- **Na tela:** título “Atena e ADD”; subtítulo “Como um pedido vira trabalho verificável”. Uma imagem ou composição simples ligada ao percurso do pedido, sem reproduzir a marca de voz da Atena sobre o conteúdo.
- **Visual:** abertura limpa com título grande. Manter área visual disponível para a narração do exemplo.
- **Narração:** apresentar a situação: um pedido simples pode gerar um arquivo, mas também precisa deixar claro por que ele existe, quais decisões respeitou e como foi conferido. Anunciar que o vídeo seguirá esse mesmo pedido até a evidência.
- **Fontes:** `ADD.md`, roteiro DRAFT revisão 2, bloco 1.

## Slide 2 Do pedido à memória do projeto

- **Tempo:** 1:30.
- **Na tela:** “Pedido → mudança → evidência → memória”; abaixo, “Arquivos locais preservam o contexto para a próxima decisão”.
- **Visual:** diagrama editável de quatro etapas, com conexão clara entre elas. É um esquema explicativo exigido pelo conteúdo.
- **Narração:** definir ADD como método local de colaboração sob direção humana. Explicar intenção durável, mudança delimitada e continuidade entre conversas. Introduzir o pedido “Acrescente um resumo de status”.
- **Fontes:** `ADD.md`, `README.md`, roteiro blocos 1–2.

## Slide 3 Quem decide e quem executa

- **Tempo:** 1:30.
- **Na tela:** “Você define a intenção e aprova decisões materiais”; “Atena estrutura e acompanha”; “Ferramentas executam verificações e edições delimitadas”.
- **Visual:** três papéis em uma leitura sequencial, sem cartões de interface. Uma ligação mostra o retorno do resultado ao usuário.
- **Narração:** explicar Atena como coordenação, ferramentas como operações e a proveniência de cada saída. Introduzir skills e agentes apenas como extensões que receberão uma definição posterior.
- **Fontes:** `ADD.md`, `INTERACTION.md`, roteiro bloco 2.

## Slide 4 A estrutura local do ADD

- **Tempo:** 2:30.
- **Na tela:** árvore editável de `.atena/` com `add.yaml`, `vault/canon`, `vault/drafts`, `vault/research`, `specs`, `evidence`, `generated` e `state/plan.yaml`; nota curta “AGENTS.md carrega as instruções”.
- **Visual:** árvore simples de pastas junto de uma captura legível da estrutura real de `example-project/.atena/`. A captura confirma o exemplo; a árvore mantém os nomes editáveis.
- **Narração:** explicar a pergunta respondida por cada pasta. Distinguir o pacote do método deste workspace de projeto. Explicar que Git pode replicar os arquivos locais e que `automation/` é opcional.
- **Fontes:** `CONTRACT.md`, `README.md`, `example-project/`, roteiro blocos 3–5.

## Slide 5 Quando uma ideia vira CANON

- **Tempo:** 2:00.
- **Na tela:** “DRAFT: proposta em revisão”; “CANON: intenção aprovada com ID e registro de revisão”; “Implementado e verificado são fatos posteriores”.
- **Visual:** progressão simples com captura de metadados de uma decisão canônica real; identificar o registro e evitar misturar dados de outra revisão.
- **Narração:** explicar pesquisa, draft e canon. Mostrar que a aprovação do trabalho de criar o deck não promove seu conteúdo ao canon. Fazer referência ao exemplo: uma regra para o resumo de status só vira intenção durável por aprovação específica.
- **Fontes:** `ADD.md`, `CONTRACT.md`, `POLICIES.md`, DEC-001/002, roteiro bloco 6.

## Slide 6 Dois caminhos para o mesmo pedido

- **Tempo:** 2:00.
- **Na tela:** coluna 1 “Atena, acrescente um resumo de status” e seu fluxo guiado; coluna 2 “Acrescente um resumo de status” e a execução direta com reconciliação posterior.
- **Visual:** comparação editável de dois percursos, com captura pequena dos campos `origin` e `implementation_preceded_spec` nas duas specs de `example-project/`.
- **Narração:** dizer o que muda na ordem de planejamento e implementação. Explicar `planned` e `post-hoc` como marcações honestas do histórico. Lembrar que os gates de segurança e publicação valem em ambos.
- **Fontes:** `INTERACTION.md`, `WORKFLOW.md`, `example-project/.atena/specs/`, roteiro bloco 7.

## Slide 7 A mudança planejada em quatro arquivos

- **Tempo:** 2:30.
- **Na tela:** `spec.md` define a mudança; `plan.md` organiza etapas/checks/limites; `tasks.md` acompanha execução; `acceptance.md` compara critérios e evidências. Fecho: “BLOCKING resolvido; aprovação por plano, lote ou etapa”.
- **Visual:** quatro faixas editáveis ligadas a uma evidência real do exemplo. Evitar ocupar a tela com conteúdo integral dos arquivos.
- **Narração:** percorrer objetivo, escopo, não objetivos e critério do resumo de status. Explicar BLOCKING, RESOLVABLE e DEFERRED. Mostrar o checkpoint como autorização de um escopo e revisão específicos.
- **Fontes:** `CONTRACT.md`, `INTERACTION.md`, templates de spec, roteiro blocos 8–9.

## Slide 8 Execução com ponto de retorno

- **Tempo:** 2:00.
- **Na tela:** “Plano ativo: etapa atual, próxima etapa e checkpoint”; “Pedido novo: no plano, desvio ou mudança do plano”; “Ações materiais exigem aprovação própria”.
- **Visual:** diagrama editável de três etapas com cursor destacado. Uma anotação discreta identifica `state/plan.yaml` como registro operacional.
- **Narração:** explicar retomada, suspensão e pedidos adiados. Distinguir modo de checkpoint de perfil de autonomia. Dar um exemplo de ação normal no escopo e um exemplo que exigiria decisão própria, sem insinuar autorização automática.
- **Fontes:** `WORKFLOW.md`, `AUTONOMY.md`, `CONTRACT.md`, roteiro blocos 10–11.

## Slide 9 Evidência e reconciliação

- **Tempo:** 3:15, incluindo uma demonstração breve de arquivos.
- **Na tela:** “Critério → verificação → evidência → reconciliação”; pergunta final “O que prova que o pedido foi atendido?”.
- **Visual:** captura legível de `example-project/.atena/evidence/SPEC-001-guided-status-summary/result.md` e referência à aceitação da mesma spec. O percurso permanece editável.
- **Narração:** alternar para o projeto por aproximadamente dois minutos. Localizar a decisão, a spec e o resultado do exemplo. Explicar que um check válido prova apenas o que mediu, e que derivados como grafos/índices refletem os registros aprovados.
- **Fontes:** `WORKFLOW.md`, `POLICIES.md`, `CONTRACT.md`, `example-project/`, roteiro bloco 12.

## Slide 10 Aplicações e primeiro uso

- **Tempo:** 1:45.
- **Na tela:** “ADD serve a projetos diferentes”; “Jogos: visão, bíblia visual, protótipo e playtest”; “Skills e agentes entram por necessidade”; “Comece com um pedido pequeno e evidência clara”.
- **Visual:** composição simples com um caminho de adoção curto e uma captura do exemplo. Manter a leitura limpa para o encerramento.
- **Narração:** citar a trilha opcional de jogos, com engine escolhida depois de visão/design/bíblia visual e feedback humano para experiência. Explicar que templates de especialistas são fontes portáveis. Fechar convidando o espectador a localizar no próprio projeto intenção, mudança e evidência.
- **Fontes:** `GAMES.md`, `GAME-SPECIALISTS.md`, `README.md`, roteiro blocos 13–14.

## Direção de design e produção

- Deck local editável em PPTX, com dez slides incluindo abertura; notas de narração com as falas e o momento de troca para a demonstração.
- Proporção 16:9. Fundo claro ou neutro, tipografia grande e contraste forte. Títulos curtos, pouco texto na tela e explicações nas notas.
- Diagramas necessários mantidos como objetos editáveis. Capturas derivadas apenas de arquivos reais deste repositório, com recortes legíveis, sem dados privados.
- Sem animações dependentes de clique para que a gravação de tela seja previsível.
- A publicação no YouTube é uma ação futura do usuário, fora deste escopo local.

## Pendências e autoridade

Este storyboard é DRAFT revisão 1, preparado após a aprovação da estrutura geral da apresentação. O [PLAN-006](../../specs/SPEC-006-add-youtube-presentation/plan.md) revisão 1 recebeu aprovação `per-plan` para produzir o PPTX local. Esta aprovação não promove o storyboard a CANON.
