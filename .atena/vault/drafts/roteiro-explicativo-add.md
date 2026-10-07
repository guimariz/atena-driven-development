---
title: "Roteiro para explicar a Atena e a estrutura do ADD"
status: "draft"
revision: 2
created: "2026-10-07"
spec_ref: "SPEC-005"
---

# Roteiro para explicar a Atena e a estrutura do ADD

O ADD organiza a intenção, o trabalho e a memória de um projeto para que uma pessoa e ferramentas de IA consigam avançar com limites claros e resultados verificáveis. Atena é a camada que conduz essa interação: interpreta o pedido, consulta o projeto, prepara o caminho, acompanha a execução autorizada e reconcilia os registros.

Este roteiro DRAFT revisão 2 está pronto para apresentação textual: cada bloco traz uma fala sugerida, uma ação na tela e a passagem para o bloco seguinte. O público considerado está conhecendo Atena; a explicação começa em linguagem comum e aprofunda os arquivos na demonstração. A duração e a mídia podem ser ajustadas sem mudar os conceitos. O plano de execução que autorizou o desenvolvimento é o PLAN-005 revisão 1; a revisão 2 aqui identifica a evolução editorial do conteúdo, sem promoção a CANON.

## Fio condutor da explicação

Usar uma mudança pequena em um projeto de anotações como exemplo ilustrativo: acrescentar um resumo de status. Acompanhar o pedido desde a intenção até a evidência e a reconciliação. Os nomes e resultados desse exemplo são didáticos; os registros reais em `example-project/` permitem mostrar os dois caminhos existentes, planejado e post-hoc, sem atribuir a esta apresentação uma nova execução.

Em cada bloco, responder: qual problema isso resolve, qual é o conceito, onde aparece no projeto e como funciona no exemplo. Apresentar primeiro a finalidade de uma estrutura e depois seu nome técnico.

## Bloco 1 O problema e a proposta do ADD

**Objetivo:** explicar por que o método existe.

**Mensagem central:** uma conversa ajuda a decidir e trabalhar, enquanto os arquivos preservam o que foi decidido, feito e verificado. ADD significa Atena Driven Development e estabelece esse contrato de colaboração sob direção humana.

**Fala sugerida:** “Imagine que hoje pedimos a uma IA um resumo de status do projeto. Ela pode criar o arquivo, mas amanhã precisamos saber por que ele foi criado, quais decisões respeitou e se o resultado foi conferido. O ADD dá um lugar para cada uma dessas respostas. Ele mantém a intenção, a mudança e suas evidências em arquivos do próprio projeto, para que o trabalho continue mesmo quando a conversa termina. A pessoa continua responsável pelas decisões importantes; Atena ajuda a transformar a intenção em uma mudança delimitada e verificável.”

Explicar intenção durável, mudanças delimitadas, rastreabilidade e continuidade entre conversas. Apresentar independência de tipo de projeto e de fornecedor de IA. Mostrar que um mesmo método pode organizar software, pesquisa, automação, jogos ou conteúdo.

**Demonstração:** abrir um pedido simples e identificar resultado desejado, restrições conhecidas e o que já existe.

**Na tela:** escrever “Quero um resumo de status” e destacar três perguntas: “Que resultado?”, “O que já existe?” e “Como saberemos que ficou certo?”. A anotação é ilustrativa; nenhuma alteração no projeto é necessária.

**Transição:** “Se o ADD organiza essas respostas, quem participa do trabalho e quem decide?”

**Base:** [definição](../../../ADD.md) e [visão geral](../../../README.md).

## Bloco 2 Atena e os participantes do trabalho

**Objetivo:** distinguir responsabilidades.

O usuário dirige a intenção e aprova decisões materiais. Atena organiza o trabalho dentro dessa autoridade. Ferramentas executam operações específicas; skills descrevem procedimentos; agentes recebem responsabilidades e entregas delimitadas quando autorizados.

**Fala sugerida:** “Pense na Atena como a coordenadora do processo. Você informa o objetivo e continua dono das decisões de produto e das mudanças materiais. Atena consulta arquivos e evidências, recomenda um caminho, prepara a execução autorizada e acompanha o resultado. Uma ferramenta lê, edita ou verifica algo específico. Uma skill descreve um procedimento que pode ser repetido; um agente recebe uma entrega delimitada quando houver motivo e autorização. Na conversa, a marca da Atena identifica a fala de coordenação. A saída de uma ferramenta e o documento produzido conservam suas próprias identidades.”

Explicar Atena Mark como identificação da voz de orquestração, preservando a proveniência de conteúdo produzido, ferramentas e agentes. O marcador de Atena pertence à conversa de coordenação; uma entrega mantém seu próprio título e formato.

**Demonstração:** diferenciar uma recomendação da Atena, a saída de um validador e o documento entregue.

**Na tela:** usar três cartões rotulados “decisão do usuário”, “orientação da Atena” e “resultado verificado”; associar uma saída real do validador ao terceiro cartão, sem colocar o marcador da Atena sobre essa saída.

**Transição:** “Agora que sabemos quem faz o quê, vamos ver onde o método está descrito e onde cada projeto guarda sua memória.”

**Base:** [identidade e princípios](../../../ADD.md), [voz e proveniência](../../../INTERACTION.md) e [autonomia](../../../AUTONOMY.md).

## Bloco 3 O pacote do método e o projeto que o adota

**Objetivo:** explicar a estrutura externa antes de entrar na memória do projeto.

**Fala sugerida:** “Este repositório mantém o próprio método. O README é a porta de entrada; ADD, INTERACTION, WORKFLOW, AUTONOMY, POLICIES e CONTRACT explicam princípios, conversa, ciclo de trabalho, limites, políticas e formato dos registros. GAMES e GAME-SPECIALISTS acrescentam uma aplicação opcional. Templates são pontos de partida copiáveis, schemas e tools verificam partes do contrato, e example-project mostra um projeto que o adotou. O AGENTS.md contém as instruções que o assistente precisa receber neste projeto. Dentro de um projeto adotante, a pasta .atena guarda a memória e o estado desse projeto.”

| Estrutura deste repositório | Função |
| --- | --- |
| `README.md` | Porta de entrada, adoção inicial e exemplos de interação |
| `ADD.md` | Definição, princípios e modelo de artefatos |
| `INTERACTION.md` | Invocação, lacunas, aprovações, desvios e comunicação |
| `WORKFLOW.md` | Ciclo de trabalho, prontidão e conclusão |
| `AUTONOMY.md` | Autoridade de execução, limites, pausas e qualidade |
| `POLICIES.md` | Memória, privacidade, dependências, Git e maturidade |
| `CONTRACT.md` | Estruturas, metadados e regras de validação |
| `GAMES.md` e `GAME-SPECIALISTS.md` | Orientação opcional de jogos e catálogo de especialistas |
| `AGENTS.md` | Instruções carregadas pelo assistente neste projeto |
| `templates/` | Fontes copiáveis e adaptáveis, incluindo specs, registros, jogos e automação |
| `schemas/` | Contrato legível por máquina para o estado do plano |
| `tools/` | Validadores locais e fixtures para verificações |
| `assets/` | Identidade gráfica da Atena |
| `example-project/` | Exemplo de adoção com mudança planejada e reconciliação post-hoc |
| `.atena/` deste repositório | Memória e operação do próprio projeto que mantém o ADD |

Explicar a diferença entre manter o método e adotá-lo em outro projeto. Os arquivos de produto e código continuam nas localizações próprias do projeto. O modelo de instruções precisa ser carregado pelo cliente de IA; uma pasta de memória sozinha não injeta comportamento.

**Demonstração:** comparar a raiz deste repositório com `example-project/.atena/`.

**Na tela:** começar na raiz do repositório, abrir README/CONTRACT e depois entrar em `example-project/.atena/`. Identificar o pacote de orientação e a aplicação do contrato sem sugerir que um template instala automaticamente um comportamento.

**Transição:** “Vamos abrir a pasta que acompanha o projeto no dia a dia.”

**Base:** [entrada](../../../README.md), [contrato](../../../CONTRACT.md) e [exemplo](../../../example-project/README.md).

## Bloco 4 A memória local em .atena

**Objetivo:** explicar cada estrutura obrigatória e suas relações.

**Fala sugerida:** “.atena é a memória local do projeto. add.yaml informa como o método é aplicado. No vault, canon guarda intenção durável aprovada, drafts guarda propostas, e research guarda investigação com suas fontes e hipóteses. Cada mudança delimitada fica em specs; o que observamos ao executá-la vai para evidence. generated guarda representações reconstruíveis, como índices ou grafos. state/plan.yaml guarda o ponto operacional para continuar uma execução. Podemos resumir o modelo em três camadas: intenção canônica, mudanças descritas por specs e artefatos derivados. Evidência e estado sustentam o ciclo. Os arquivos locais são a referência; uma cópia em Git pode ajudar a replicá-los.”

```text
.atena/
  add.yaml
  vault/
    canon/
    drafts/
    research/
  specs/
  evidence/
  generated/
  state/
    plan.yaml
```

| Estrutura | Pergunta que responde | Conteúdo típico |
| --- | --- | --- |
| `add.yaml` | Como este projeto usa o ADD? | Identidade, modos, políticas e limites |
| `vault/canon/` | Que intenção durável foi aprovada? | Visão, decisões, requisitos, regras e riscos |
| `vault/drafts/` | O que está sendo proposto? | Alternativas e conteúdo em elaboração |
| `vault/research/` | Que informação está sendo investigada? | Fontes, hipóteses e conclusões a revisar |
| `specs/` | Que mudança estamos delimitando? | Especificação, plano, tarefas e aceitação |
| `evidence/` | O que foi observado ou validado? | Descoberta, aprovações, resultados e verificações |
| `generated/` | O que foi derivado dos registros? | Índices, grafos, relatórios e artefatos auxiliares |
| `state/plan.yaml` | Em que ponto operacional estamos? | Plano ativo, cursor, checkpoint, suspensão e pedidos adiados |

Apresentar as três camadas conceituais: memória canônica, specs de mudanças e artefatos derivados. Evidência sustenta as conclusões; estado permite retomar a execução. `.atena/automation/` é opcional até uma skill ou um agente serem aprovados; sua presença não garante descoberta automática pelo cliente.

Explicar local-first: os arquivos locais são a autoridade do projeto e Git pode ser uma réplica opcional. Armazenamento local e processamento por um modelo remoto são decisões distintas. A antiga `atena/` exige migração apresentada e aprovada.

**Demonstração:** localizar intenção, proposta, mudança, resultado e ponto de retorno no exemplo.

**Na tela:** apontar uma decisão em `vault/canon/`, uma proposta em `vault/drafts/`, uma spec, a evidência correspondente e `state/plan.yaml`. Mostrar que `example-project/.atena/` contém um estado ocioso. Mencionar `automation/` como pasta opcional, criada apenas quando a adoção fizer sentido.

**Transição:** “Com as pastas em mente, vamos entender quais regras mudam de um projeto para outro.”

**Base:** [contrato](../../../CONTRACT.md) e [políticas](../../../POLICIES.md).

## Bloco 5 Configuração e instruções

**Objetivo:** mostrar como o contrato se adapta ao projeto.

**Fala sugerida:** “add.yaml é o painel de configuração do projeto. A versão identifica o contrato; project dá identidade; interaction escolhe como reconhecer o pedido; specification registra regras de prontidão; policies e autonomy definem limites e nível de atuação. Há também configurações para Git, skills, artefatos derivados e um check opcional de RTK. AGENTS.md complementa essa configuração com instruções que o assistente realmente carrega. A pasta .atena sozinha não ativa o comportamento da Atena em qualquer cliente de IA. Nesta apresentação, vamos olhar o campo necessário para cada decisão, sem decorar o arquivo inteiro.”

Percorrer `add.yaml`: `add_version` identifica a versão; `project` identifica o projeto; `interaction` define os modos; `specification` define prontidão e lacunas; `bootstrap` registra checks iniciais; `policies` delimita ações; `autonomy` define perfil, relatórios e tentativas; `git` delimita operações; `skills` registra critérios de repetição; `graph` declara derivação e saída.

Explicar a complementaridade entre configuração e `AGENTS.md`: regras estruturadas e instruções efetivamente carregadas. Projetos podem estender a configuração sem ocultar gates obrigatórios. RTK é uma otimização opcional para saída de comandos; sua disponibilidade não determina a validade de um projeto ADD.

**Demonstração:** selecionar poucos campos relevantes, explicar seu efeito e deixar os demais disponíveis para consulta. Não alterar políticas durante a apresentação.

**Na tela:** destacar em `.atena/add.yaml` os campos `interaction`, `autonomy` e `policies`; ao lado, abrir `AGENTS.md`. Dizer que RTK economiza contexto em saídas de comandos e é opcional.

**Transição:** “A configuração diz como trabalhar. O vault registra aquilo que o projeto decidiu preservar.”

**Base:** [campos do contrato](../../../CONTRACT.md), [instruções copiáveis](../../../templates/AGENTS.md) e [configuração local](../../add.yaml).

## Bloco 6 Intenção durável e maturidade dos registros

**Objetivo:** explicar quando uma proposta passa a ter autoridade.

**Fala sugerida:** “Uma ideia pode nascer em drafts e continuar experimental por várias revisões. Para virar intenção durável, a pessoa aprova o conteúdo e a revisão exatos. O registro vai para canon com ID estável, tipo, status, fontes, relações e histórico de revisão. Assim conseguimos saber o que foi proposto, o que foi aprovado, o que foi implementado e o que foi verificado. Uma aprovação parcial atinge apenas o trecho identificado; permitir um teste com um draft não o promove. Research fornece evidência para decidir, mas uma hipótese investigada ainda precisa ser revisada. Quando uma decisão é substituída, o histórico continua rastreável.”

Um registro tem ID estável, tipo, título, status, datas, relações, fontes e histórico de revisão. Apresentar tipos de visão, restrição, decisão, capacidade, requisito e risco; entidades, locais, facções, eventos, cronologias, regras e afirmações de pesquisa se aplicam conforme o projeto.

DRAFT designa conteúdo proposto ou experimental. CANON exige conteúdo/revisão explicitamente aprovados, armazenamento em `vault/canon/`, metadados adequados, ID imutável e registro de revisão. Aprovar um teste de um draft mantém seu estado DRAFT. Uma aprovação parcial promove apenas o conteúdo identificado.

Explicar os estados `draft`, `proposed`, `approved`, `implemented`, `verified` e `superseded` dos registros. Aprovação de intenção, implementação e verificação representam fatos diferentes. `superseded` preserva a história de algo substituído. Pesquisa pode registrar maturidade `hypothesis`, `candidate`, `canonical` ou `deprecated` quando aplicável; ela precisa de revisão para sustentar canon.

**Demonstração:** comparar um draft com uma decisão canônica e seu histórico de aprovação.

**Na tela:** abrir `DEC-001` ou `DEC-002` e apontar ID, status, fontes e review record. Comparar com este roteiro, identificado DRAFT revisão 2. A aprovação do PLAN-005 autorizou escrever o roteiro, enquanto uma promoção ao canon exigiria aprovação explícita do conteúdo.

**Transição:** “Como uma solicitação atravessa esse sistema? Há dois caminhos de entrada.”

**Base:** [canonicidade](../../../ADD.md), [metadados](../../../CONTRACT.md), [maturidade](../../../POLICIES.md), [DEC-001](../canon/DEC-001-game-guidance.md) e [DEC-002](../canon/DEC-002-visible-plan-and-visual-readiness.md).

## Bloco 7 Dois caminhos para solicitar trabalho

**Objetivo:** explicar Guided ADD e Direct Execution com frases concretas.

**Fala sugerida:** “Se você disser ‘Atena, acrescente um resumo de status’, o endereço explícito ativa o caminho guiado. Atena analisa, prepara spec e plano, resolve bloqueios e pede o nível de aprovação antes da execução planejada. Se disser ‘Acrescente um resumo de status’, uma execução local comum pode seguir diretamente dentro do pedido; depois se propõe a reconciliação do que realmente foi feito. Os limites de segurança, dados, dependências e publicação continuam valendo nos dois caminhos. Caso a spec seja escrita depois da implementação, ela se identifica como post-hoc e informa que a implementação veio antes. Essa marca evita inventar uma aprovação passada.”

| Pedido ilustrativo | Caminho | Consequência |
| --- | --- | --- |
| “Atena, acrescente um resumo de status.” | Guided ADD | Inspeção, spec, plano e aprovação precedem a execução planejada |
| “Acrescente um resumo de status.” | Direct Execution | Trabalho local comum pode ser executado dentro do pedido; reconciliação é proposta depois |
| “Atena, reconcilie a mudança feita.” | Guided ADD para reconciliação | Reconstruir os registros a partir da implementação e evidência reais |

Uma menção a Atena dentro de conteúdo citado não ativa automaticamente o modo guiado. Execução direta preserva gates de segurança, privacidade, dependências, ações materiais e publicação.

Explicar os marcadores `origin: planned` e `implementation_preceded_spec: false`; quando a implementação precedeu a spec, usar `origin: post-hoc` e `implementation_preceded_spec: true`. Um plano reconstruído descreve a implementação e não prova uma aprovação anterior.

**Demonstração:** mostrar os dois exemplos de `example-project/`, distinguindo seu histórico do exemplo narrativo da apresentação.

**Na tela:** abrir `SPEC-001-guided-status-summary/spec.md` e `SPEC-002-post-hoc-project-note/spec.md` do exemplo. Destacar `origin` e `implementation_preceded_spec`, explicando que são registros históricos de exemplo.

**Transição:** “No caminho guiado, como a intenção vira uma mudança com começo e fim?”

**Base:** [protocolo](../../../INTERACTION.md), [workflow](../../../WORKFLOW.md) e [exemplos](../../../example-project/README.md).

## Bloco 8 Uma mudança delimitada e seus quatro arquivos

**Objetivo:** explicar o contrato da spec.

**Fala sugerida:** “A spec é a unidade de mudança. spec.md define objetivo, escopo, o que fica de fora, decisões, lacunas, critérios e impactos. plan.md organiza as etapas, o que muda, como verificar, os limites e a recuperação. tasks.md acompanha o trabalho concreto; acceptance.md liga cada critério ao resultado observado. IDs estáveis permitem apontar para uma spec, um plano, uma etapa e uma evidência sem depender da conversa. Uma spec planejada avança de draft para pronta, aprovada, implementada e verificada conforme os fatos aparecem. Uma spec post-hoc preserva a sequência real dos acontecimentos.”

| Arquivo | Conteúdo e finalidade |
| --- | --- |
| `spec.md` | Objetivo, contexto, escopo, não objetivos, decisões, lacunas, critérios e impactos |
| `plan.md` | Plano de voo: ordem, caminhos, checks, limites, recuperação e aprovação |
| `tasks.md` | Acompanhamento das tarefas e suas evidências |
| `acceptance.md` | Critérios, evidência, resultado, exceções e reconciliação |

Explicar IDs de `SPEC-XXX`, `PLAN-XXX`, `S-XXX`, `B-XXX` e critérios de aceitação. Uma spec referencia canon existente ou declara que cria o registro inicial. Cada mudança define seus próprios critérios de qualidade. O plano torna explícitos o que muda, como testar, os limites e como recuperar.

Percorrer os estados de uma spec: `draft`, `ready-for-approval`, `approved`, `implemented`, `verified` e `superseded`. A spec planejada depende de lacunas bloqueantes resolvidas e modo de aprovação escolhido para ficar pronta.

**Demonstração:** mostrar a mesma mudança nos quatro arquivos e ligar um critério à evidência correspondente.

**Na tela:** navegar pelos quatro arquivos de `example-project/.atena/specs/SPEC-001-guided-status-summary/`; localizar o critério “o arquivo informa .atena/” e seu resultado. Evitar apresentar os arquivos como quatro etapas cronológicas obrigatórias para toda edição direta.

**Transição:** “Antes de aprovar esse plano, precisamos entender o que ainda está incerto.”

**Base:** [contrato](../../../CONTRACT.md), [templates de spec](../../../templates/spec/spec.md) e [plano](../../../templates/spec/plan.md).

## Bloco 9 Lacunas recomendações e aprovação

**Objetivo:** mostrar como Atena reduz incerteza e delimita autoridade.

**Fala sugerida:** “Atena classifica as lacunas por seu efeito. BLOCKING precisa ser resolvida antes da aprovação; RESOLVABLE recebe uma escolha padrão fundamentada; DEFERRED fica visível e fora da entrega atual. Com o escopo pronto, você escolhe aprovar o plano inteiro, cada lote ou cada etapa. Esse modo pertence ao plano específico. Enquanto ele estiver unconfigured, a execução planejada não começa. A aprovação registra qual revisão e qual checkpoint foram autorizados. Uma pausa obrigatória por segurança ou por ação material continua independente desse modo.”

`BLOCKING` impede a execução correta ou segura e deve ser resolvido. `RESOLVABLE` recebe um default fundamentado e visível. `DEFERRED` fica explicitamente fora do escopo e mantém um ponto de retomada. Zero bloqueios não autoriza atravessar um checkpoint pendente.

Relacionar recomendações a evidência, reutilização e arquitetura mínima suficiente. Apresentar aprovação por plano, por lote e por etapa; `unconfigured` representa escolha ainda pendente e impede execução. A aprovação identifica escopo, revisão, aprovador e momento.

**Demonstração:** escolher o nome de um título como default resolvível; deixar uma exportação fora do escopo; identificar uma regra de acesso indefinida como bloqueante em uma mudança que envolvesse acesso.

**Na tela:** mostrar três cartões: título padrão sugerido, exportação adiada e regra de acesso a resolver. Em seguida, apontar o checkpoint `PLAN` aprovado no PLAN-005 como exemplo real de uma única aprovação para três etapas.

**Transição:** “Depois da aprovação, o projeto precisa lembrar exatamente onde a execução parou.”

**Base:** [lacunas e aprovação](../../../INTERACTION.md), [autonomia](../../../AUTONOMY.md) e [contrato](../../../CONTRACT.md).

## Bloco 10 Execução retomada e novos pedidos

**Objetivo:** explicar continuidade operacional.

**Fala sugerida:** “O caminho guiado começa por entender e inspecionar o projeto, passa por recomendação, spec, lacunas e plano, e só entra em execução no checkpoint aprovado. state/plan.yaml guarda o plano ativo, a etapa atual e a próxima. Isso permite retomar sem adivinhar pelo histórico do chat. Se você fizer um pedido novo enquanto há um plano ativo, Atena classifica se ele já cabe no plano, se é um desvio temporário ou se muda o plano. Um desvio pode salvar o cursor, executar o trabalho paralelo autorizado e voltar; também pode virar um pedido pendente DEV. Uma mudança de plano exige avaliar impacto e aprovar a revisão. A cada etapa Atena relata resultado, evidência, trabalho restante e próximo objetivo preparado.”

Percorrer o fluxo guiado: bootstrap, entendimento, inspeção, recomendação, spec, lacunas, plano, modo e checkpoint de aprovação, cursor ativo, execução, verificação, evidência e reconciliação.

Em `state/plan.yaml`, explicar `version`, `active_plan`, `plan_cursor`, `suspension` e `deferred_requests`; no plano ativo, mostrar identidade, spec, etapa atual, total, estado e checkpoint. O cursor registra atual e próxima. Estado ocioso tem plano/cursor/suspensão nulos. Estado e aprovação documental cumprem funções diferentes.

Classificar pedidos durante um plano ativo: `IN_PLAN` continua o escopo; `PLAN_DEVIATION` exige decidir entre fazer e voltar ou registrar `DEV-XXX` pendente; `PLAN_CHANGE_REQUEST` exige análise de impacto e nova aprovação. Na primeira rota de desvio, salvar e suspender antes do trabalho paralelo; restaurar o cursor depois. Pedido adiado não vira execução automática.

Explicar relatórios de etapa, resultado e próxima entrega preparada. A contagem acompanha a ordem real, com restantes após a etapa atual; comunicar progresso não cria novos gates.

**Demonstração:** simular um pedido de documentação dentro do plano, um pedido paralelo e uma alteração do resultado esperado, sem ativar plano real durante a apresentação.

**Na tela:** desenhar `S-001 → S-002 → S-003`; mover um cursor ilustrativo. Mostrar `suspension` como ponto salvo na rota de desvio e `deferred_requests` como fila visível sem execução automática. Usar o estado real apenas para demonstrar sua forma, sem alterar o cursor por causa da apresentação.

**Transição:** “Ter um plano ativo não dá autoridade irrestrita. Quais são os limites?”

**Base:** [workflow](../../../WORKFLOW.md), [contrato](../../../CONTRACT.md), [progresso](../../../INTERACTION.md) e [schema](../../../schemas/plan-state.schema.json).

## Bloco 11 Autonomia políticas e fronteiras

**Objetivo:** explicar o que permite avançar e o que exige decisão humana.

**Fala sugerida:** “O perfil guarded-autopilot permite executar o escopo aprovado e prestar contas nas transições. Existem perfis mais supervisionados ou restritos. Em paralelo, o modo por plano, lote ou etapa determina a frequência dos checkpoints normais. Algumas ações exigem aprovação própria: mudar intenção canônica, arquitetura ou segurança; lidar com dados materiais, credenciais ou contexto sensível; adicionar dependências novas; publicar, enviar ou implantar. A política de dependências usa uma lista previamente aceita e o plano para limitar instalações locais. Com modelos remotos, local-first descreve onde a memória é autoritativa; o envio de conteúdo depende da política de privacidade e da sensibilidade. Git pode registrar cópias locais, enquanto merge e publicação exigem autorização explícita.”

Apresentar `guarded-autopilot`, `supervised` e `restricted` como perfis de autonomia. O perfil governa comportamento geral e o modo de aprovação governa checkpoints do plano. Mostrar pausas por lacuna material, falha além do limite, conflito canônico ou necessidade fora do escopo.

Explicar gates independentes para intenção canônica, arquitetura material, segurança, credenciais, permissões, ações materiais/destrutivas, dependências, contexto sensível e publicação. `allowlist-with-plan` delimita dependências locais previamente aprovadas e previstas no plano; novas ou globais exigem revisão.

Explicar `local-only`, `review-before-remote` e `scoped-remote-context`. Contexto remoto aprovado deve ser delimitado e ter manifesto; conteúdo sensível recebe aprovação específica. Operações locais de Git obedecem à política e ao plano; merge, push, release, deploy e compartilhamento externo exigem aprovação explícita.

**Demonstração:** distinguir escrever um documento no escopo aprovado de publicar esse documento ou transferir pesquisa privada.

**Na tela:** apresentar três ações no exemplo: escrever o resumo, enviar o arquivo para um serviço externo e publicar no remoto. Associar cada uma ao checkpoint e aos gates aplicáveis, sem realizar qualquer envio.

**Transição:** “Agora falta provar o resultado e atualizar a memória do projeto.”

**Base:** [autonomia](../../../AUTONOMY.md) e [políticas](../../../POLICIES.md).

## Bloco 12 Validação evidência e reconciliação

**Objetivo:** explicar quando é possível afirmar que algo está concluído.

**Fala sugerida:** “Primeiro verificamos o contrato: arquivos, IDs, links, formato e coerência do plano. Depois executamos os checks definidos pela mudança e comparamos resultados com os critérios de aceitação. Evidence guarda o que de fato aconteceu, incluindo limites e pendências. Uma avaliação do próprio modelo não basta para demonstrar um resultado observável. Na reconciliação, Atena atualiza fatos operacionais permitidos, propõe revisões de intenção que dependam da sua aprovação e renova artefatos derivados exigidos. O cursor só é encerrado depois de registrar o resultado terminal. Grafos, índices e relatórios são reconstruções dos registros de referência; uma relação inferida no grafo precisa de revisão antes de ter autoridade canônica.”

Validação estrutural confere formato; validação semântica confere referências e coerência do estado. Os validadores disponíveis verificam recortes específicos; um schema válido sozinho não prova autorização, aceitação ou qualidade do produto.

Evidência registra observações, checks, resultados, limites e pendências. Comparar critérios de aceitação com essa evidência e realizar uma revisão de escopo e regressões. Confiança de um modelo não substitui evidência observável.

Reconciliação aproxima memória e realidade: registrar resultado terminal, atualizar fatos operacionais permitidos, propor revisão de intenção quando necessária, preservar adiados e atualizar derivados exigidos. Encerrar o cursor depois de documentar o resultado. Exceções aceitas precisam ser explícitas.

Explicar grafos e relações tipadas, índices e context packs como derivados. Referências quebradas, IDs duplicados e relações desconhecidas são problemas de consistência; inferências de grafo precisam de revisão para virar canon. A configuração de uma saída de grafo não garante que haja gerador ou arquivo de grafo já entregue.

**Demonstração:** abrir evidência real do exemplo e mostrar a associação entre um critério e seu resultado. Executar somente verificações de leitura autorizadas.

**Na tela:** mostrar `example-project/.atena/evidence/SPEC-001-guided-status-summary/result.md` junto de `acceptance.md`. Exibir um resultado de validação de estado e explicar que “válido” indica coerência estrutural/semântica daquele estado, enquanto “autorizado” depende do checkpoint registrado.

**Transição:** “Esse núcleo serve para muitos projetos. Procedimentos e especialistas entram quando uma tarefa concreta pede.”

**Base:** [conclusão](../../../WORKFLOW.md), [validação](../../../CONTRACT.md), [grafo](../../../POLICIES.md) e [validador de estado](../../../tools/validate-add-state.cjs).

## Bloco 13 Skills agentes e especialistas

**Objetivo:** explicar extensão e responsabilidade sem sugerir ativação automática.

**Fala sugerida:** “Quando um procedimento se repete e é estável, pode virar uma skill: ela descreve quando usar, quais entradas ler, quais passos seguir, qual entrega produzir e onde parar. Um agent brief define a responsabilidade e o handoff de alguém especializado. Atena recomenda um especialista porque há uma necessidade observada, com caminho e checks delimitados. No catálogo de jogos há dez pares de skill e papel, cobrindo design, gameplay, níveis, narrativa, interface, áudio, QA, performance, encaixe de sprites e animação. Eles são fontes portáveis; escolher um par é uma decisão de adoção, e executá-lo depende do projeto e da autorização aplicável. Vários agentes só ajudam quando as entregas podem ser separadas e alguém integra os resultados.”

Skill registra um procedimento repetível com gatilho, entradas, passos, saídas, checks e limites. Agent brief delimita objetivo, caminhos, responsabilidade, entrega e handoff. Multiagentes fazem sentido para frentes independentes com responsável pela integração e autorização aplicável.

Explicar oportunidade de skill após duas execuções semelhantes e proposta após três, com benefício e escopo demonstrados. Recomendação não concede execução ou instalação. Um pacote em `templates/` é fonte portável; descoberta e adoção dependem das instruções e recursos do projeto de destino.

Apresentar as dez especialidades de jogos em grupos: design; gameplay; níveis/mundo; narrativa; UI/acessibilidade; áudio/feedback; QA/playtests; performance/entrega; encaixe de sprites; animação 2D. Escolher conforme uma necessidade real, com entradas, saída, caminhos, checks e responsável pela integração.

**Demonstração:** relacionar um problema de proporção do sprite ao pacote de encaixe e um problema de movimento à revisão de animação, sem iniciar agentes.

**Na tela:** localizar no catálogo os dois problemas e apontar a skill, o brief, a entrega e a verificação prevista. Dizer explicitamente que nenhum agente é iniciado por essa demonstração.

**Transição:** “Para fechar, vamos aplicar o mesmo raciocínio a um caso onde direção criativa e teste humano importam muito.”

**Base:** [automação](../../../AUTONOMY.md), [catálogo](../../../GAME-SPECIALISTS.md), [template de skill](../../../templates/automation/skill.md) e [brief](../../../templates/automation/agent.md).

## Bloco 14 A aplicação em jogos e o início de uso

**Objetivo:** concluir com uma aplicação opcional e um caminho de adoção.

**Fala sugerida:** “Quando alguém quer criar um jogo, Atena oferece uma trilha de descoberta e pede confirmação para iniciá-la. A conversa define experiência, ações centrais, escopo e uma bíblia visual inicial antes de recomendar engine e ferramentas. Essa bíblia relaciona intenção artística, referências, linguagem visual, câmera, interface, feedback, legibilidade e limites de produção. Antes de trabalho visual especializado, Atena organiza a identidade relevante e o contexto da cena; uma descrição textual pode bastar. Antes do protótipo, mostra as principais pendências e seus efeitos. O protótipo testa uma hipótese pequena do core loop. Cada playtest informa o que testar e registra o que aconteceu. Funcionamento pode ser verificado tecnicamente; sensação, dificuldade e diversão precisam de quem jogou.”

**Fala de encerramento:** “Para usar ADD em outro projeto, começamos com a estrutura .atena, adaptamos as instruções do projeto e sua configuração, e passamos a registrar intenção, mudanças e evidências conforme o trabalho real. Hoje você já consegue localizar uma decisão, entender uma spec, conferir um checkpoint e perguntar: ‘Qual evidência sustenta que isso está concluído?’ Essa pergunta é o elo entre a conversa e a memória durável.”

A trilha de jogos é oferecida quando há intenção de criar um jogo e começa após confirmação. A entrevista adapta-se ao contexto. Visão, design/core loop, escopo de produção, bíblia visual e objetivo do primeiro protótipo/playtest precedem a recomendação de engine, ferramentas e arquitetura.

Explicar a bíblia visual: intenção artística, referências e condições de uso conhecidas, linguagem visual, entidades aplicáveis, câmera/luz, interface, animação/feedback, legibilidade/acessibilidade e limites de produção. Preparar identidade aplicável e contexto de cena antes de especialistas visuais; contexto pode ser textual e posição não é requisito universal. N/A exige razão.

Prontidão de protótipo apresenta pendências e efeito sobre começar. Protótipo de core loop testa uma hipótese; vertical slice é um recorte integrado quando útil. Cada playtest informa build, objetivo, procedimento, observações, critérios e feedback esperado. Checks técnicos demonstram funcionamento e consistência; avaliação humana sustenta sensação, dificuldade e diversão. Teste não realizado fica pendente.

Apresentar os oito templates de jogos disponíveis: visão, design, bíblia visual, prontidão de protótipo, playtest, prontidão visual, contrato de sprite e revisão de movimento. Registros adicionais de experimento/assets/entrega propostos pela SPEC-002 deste repositório continuam DRAFT não aprovado.

Encerrar a demonstração com a adoção: copiar o exemplo `.atena/`, adaptar `AGENTS.md`, configurar identidade/políticas, verificar referências, detectar legado e fazer o bootstrap. Adoção deve preservar regras e canon locais. Atualização deste repositório não migra automaticamente projetos que copiaram seus templates.

**Demonstração:** retomar o exemplo completo e pedir ao público que localize intenção, spec, checkpoint, resultado e próximo passo. Para jogos, identificar qual hipótese o playtest avaliaria.

**Na tela:** percorrer `GAMES.md` e um template de bíblia visual; localizar a decisão DEC-001, um plano, uma evidência e o estado. Apontar os templates como apoio opcional. Explicar que SPEC-002 deste repositório continua uma proposta DRAFT, enquanto a biblioteca de dez especialidades já foi entregue como fontes portáveis.

**Transição para perguntas:** “Podemos escolher um pedido real seu e localizar juntos intenção, plano, checkpoint e evidência.”

**Base:** [jogos](../../../GAMES.md), [templates](../../../templates/game/vision.md), [catálogo](../../../GAME-SPECIALISTS.md) e [adoção](../../../README.md).

## Glossário para acompanhar a demonstração

| Termo | Explicação curta |
| --- | --- |
| ADD | Método local de colaboração e memória sob direção humana |
| Atena | Camada de interação e coordenação do método |
| Local-first | Projeto e workspace locais como autoridade |
| Vault | Conjunto de registros de conhecimento e intenção |
| Canon | Intenção durável aprovada com registro de revisão |
| Draft | Proposta ou experiência sem autoridade canônica |
| Spec | Unidade delimitada de mudança |
| Escopo e não objetivos | O que a mudança inclui e o que deixa fora |
| Plano de voo | Caminho de execução, verificação, limites e recuperação |
| Checkpoint | Fronteira de aprovação para o escopo correspondente |
| Cursor | Ponto persistente para continuar ou retomar |
| Gap | Lacuna bloqueante, resolvível ou adiada |
| Aceitação | Critério e evidência para reconhecer o resultado |
| Evidência | Registro do que foi realmente observado |
| Reconciliação | Atualização dos registros para refletir o resultado real |
| Post-hoc | Registro construído depois da implementação, com origem explícita |
| Derivado | Artefato gerado a partir dos registros de referência |
| Relação tipada | Ligação com significado declarado entre IDs |
| Context pack | Seleção de contexto pertinente à tarefa |
| Skill | Procedimento documentado e reutilizável |
| Agent brief | Responsabilidade e entrega delimitadas de um agente |
| Handoff | Passagem de resultado, insumos e próximos checks |
| Fixture | Caso preparado para verificar o comportamento de um validador |
| Bíblia visual | Direção visual e referências que orientam produção e leitura |
| Core loop | Ciclo central de ações, desafios e retorno do jogo |
| Protótipo | Recorte pequeno para testar uma hipótese |
| Vertical slice | Amostra integrada e representativa quando útil ao projeto |
| Playtest | Experiência de jogo com objetivo, observação e feedback humano |

## Desenvolvimento proposto do roteiro

As falas, ações na tela e transições estão desenvolvidas acima. A [matriz de cobertura](../../evidence/SPEC-005-add-explanatory-script/coverage.md) liga conceitos, estruturas e fontes. A duração depende da mídia escolhida e pode ser dividida em módulos, preservando a sequência que liga intenção, trabalho e memória.

O [PLAN-005](../../specs/SPEC-005-add-explanatory-script/plan.md) revisão 1 autorizou o desenvolvimento textual. O conteúdo do roteiro está DRAFT revisão 2; nenhum trecho foi promovido a CANON.
