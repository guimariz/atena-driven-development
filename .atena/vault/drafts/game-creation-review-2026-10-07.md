# Criação de jogos com Atena — diagnóstico e recomendações

Data: 2026-10-07, America/Sao_Paulo. Status: proposta, não canônica.

## Escopo e autoridade

Pedido: apresentar o que existe sobre criação de jogos e recomendar melhorias. Interação Guided ADD. O estado inspecionado tem `active_plan: null`; não há plano ativo a desviar ou substituir. A inspeção e a preparação de rascunhos atendem ao pedido; as mudanças oficiais propostas dependem de aprovação futura. A aprovação da SPEC-001 não autoriza esta extensão.

## Estrutura existente

A [decisão aprovada DEC-001](../canon/DEC-001-game-guidance.md) e o [guia GAMES](../../../GAMES.md) estabelecem uma trilha opcional, confirmada pelo usuário, dentro de ADD v0.2. Ela não define um gênero, engine ou arquitetura universal.

| Etapa | Conteúdo existente | Artefato |
| --- | --- | --- |
| Descoberta | Entrevista adaptativa, reaproveitamento de respostas, rodadas curtas e defaults fundamentados | Guia e visão |
| Visão | Fantasia do jogador, público, sensações, referências e pilares observáveis | [vision.md](../../../templates/game/vision.md) |
| Design | Loop, ações, controles, consequências, feedback, objetivos, progressão e lore aplicável | [design.md](../../../templates/game/design.md) |
| Produção | Plataforma, equipe, experiência, tempo, orçamento, escala e exclusões | Visão e design |
| Bíblia visual | Referências, linguagem visual, câmera, luz, UI, animação, acessibilidade e limites de produção | [visual-bible.md](../../../templates/game/visual-bible.md) |
| Prontidão | Hipótese, recorte jogável, aceitação e pendências BLOCKING, RESOLVABLE e DEFERRED | [prototype-readiness.md](../../../templates/game/prototype-readiness.md) |
| Tecnologia | Recomendação ao final da definição inicial; preservar escolhas existentes, comparar opções viáveis e verificar fatos atuais | Relatório de prontidão e spec |
| Evolução | Protótipo do loop, possível amostra integrada de qualidade, conteúdo, polimento e lançamento por marcos | Specs ADD |
| Playtest | Objetivo, build, participante, roteiro, observações, critérios e decisão posterior | [playtest.md](../../../templates/game/playtest.md) |
| Memória | Exploração em drafts/research, decisões aprovadas em canon, resultados em evidence, execução em state | `.atena/` existente |

Atena verifica funcionamento e consistência demonstráveis; pessoas avaliam sensação de controle, dificuldade e diversão. Feedback subjetivo ausente permanece pendente. O processo já está referenciado em README, INTERACTION, WORKFLOW e no template de instruções de projeto.

## Maturidade e limites

O [resultado da SPEC-001](../../evidence/SPEC-001-game-guidance/result.md) registra implementação e verificação documentais em 2026-10-05. Os seis cenários foram revisados textualmente pelo mesmo agente, sem executar um modelo em simulação e sem desenvolver ou jogar um jogo.

O repositório inspecionado contém metodologia, templates e um exemplo genérico de ADD; não contém um projeto de jogo executável. Exemplos por engine, automação, produção de assets e integrações com provedores foram explicitamente adiados. Portanto, a evidência sustenta a existência do processo escrito; sua eficácia em produção continua a ser demonstrada.

## Recomendações priorizadas

### 1. Tornar cada iteração um experimento com decisão

Reutilizar as hipóteses já presentes e acrescentar um registro curto: pergunta, menor recorte necessário, variável alterada, observações esperadas, limite de tempo/conteúdo, resultado e consequência. Definir como continuar, ajustar, repetir ou abandonar a hipótese antes de construir mais conteúdo. Os critérios devem ser proporcionais ao teste; um único relato não demonstra preferência de todo o público.

Exemplo ilustrativo: investigar se a ação central é entendida sem explicação. Registrar a build, as instruções fornecidas, onde o jogador hesitou e qual ajuste será testado na próxima versão. Esse exemplo não estabelece gênero nem uma métrica universal de sucesso.

### 2. Padronizar a entrega jogável de cada marco

Acrescentar um registro de entrega com versão identificável, plataforma, localização da build ou do projeto executável, instruções, controles, objetivo, limitações, verificações realizadas e playtest esperado. Exigir evidência de execução para critérios de funcionamento, mantendo separadas as avaliações humanas pendentes.

Selecionar verificações pertinentes: iniciar, executar a ação central, alcançar estados de sucesso/falha quando existirem e reiniciar; salvar/carregar, trocar de cena e pausar somente se fizerem parte do recorte. Uma captura isolada não demonstra todos esses comportamentos.

### 3. Definir um limite para a descoberta inicial

Preservar a bíblia visual antes da recomendação técnica, usando a versão mínima que esclareça câmera, legibilidade, linguagem visual e necessidades do primeiro teste. Dimensionar entrevista e documentação ao risco e à primeira entrega, reaproveitando dados existentes. O guia já admite essa simplificação; exemplos preenchidos ajudariam a aplicá-la.

Após a definição inicial e a escolha técnica aprovada, investigar primeiro o risco de maior impacto: controle, câmera, física, quantidade de entidades, uma plataforma ou uma exigência visual específica. O recorte deve demonstrar esse risco antes de expandir a produção.

### 4. Controlar ajustes e balanceamento

Registrar valores importantes, justificativa, intervalo autorizado pelo marco e observações por build. Permitir que o plano delimite ajustes locais de parâmetros para reduzir confirmações repetidas. Revisões de pilares, regras materiais, experiência pretendida ou lore continuam a exigir aprovação explícita.

### 5. Organizar a produção e admissão de assets

Criar um manifesto opcional com finalidade, origem, condição de uso conhecida, estado de revisão, destino no projeto e requisitos pertinentes: escala, pivô, colisão, animações, tamanho de textura, quantidade/complexidade e áudio quando aplicáveis. Distinguir referência, placeholder, candidato e asset admitido. Termos desconhecidos permanecem pendentes; geração de um arquivo não comprova sua adequação ao jogo.

Os recursos apresentados no catálogo desta sessão incluem produção e admissão de assets pelo Game Development Studio, diagnóstico visual e otimização por telemetria; Tripo para 3D; ImageGen para imagens. São rotas disponíveis para investigar quando um jogo justificar seu uso. Não representam integração implementada com ADD, credenciais verificadas, custos aceitos ou execução validada nesta análise.

### 6. Criar validação técnica repetível após escolher a engine

Definir um procedimento por projeto que registre engine/versão, cenário, entradas, duração, logs, execução visual pertinente e métricas necessárias. Começar com mecanismos já disponíveis, acrescentando dependências somente quando justificadas e aprovadas.

O Godot local respondeu `4.7.2.stable.official.ed1daf0bf` em `D:\Godot\godot.exe --version`. A documentação oficial descreve execução sem janela e duração limitada na [linha de comando](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html), além de [debugger e profilers](https://docs.godotengine.org/en/stable/tutorials/scripting/debug/debugger_panel.html). Isso fundamenta um possível adaptador futuro. A consulta à versão não valida importação, exportação, comportamento ou renderização de um jogo; execução sem janela não substitui inspeção visual.

### 7. Demonstrar o método em um jogo piloto

Depois da extensão documental, aplicar a trilha em um jogo pequeno escolhido com o usuário. Medir tempo até a primeira entrega, decisões refeitas, defeitos detectados e utilidade do feedback. Escolher engine a partir dos requisitos ou preservar uma escolha existente. O piloto deve produzir build jogável, playtest humano e reconciliação real.

Só depois das repetições observadas avaliar uma skill reutilizável ou automação especializada, conforme a política de oportunidades após duas repetições e propostas após três. Não há necessidade demonstrada de agentes adicionais nesta etapa.

### 8. Detalhar qualidade final conforme a plataforma

Quando o jogo atingir esse marco, cobrir áudio e feedback, acessibilidade, desempenho no dispositivo alvo, controles, empacotamento e entrega. Publicação pertence a um escopo aprovado com destino explícito. Antecipar apenas requisitos que mudem o protótipo ou sua viabilidade.

## Primeira evolução proposta

A [SPEC-002](../../specs/SPEC-002-game-production-loop/spec.md) propõe uma extensão documental delimitada: registro de experimentos, manifesto de assets e registro de entrega jogável, ligados ao guia, à prontidão e ao playtest. Os modelos serão opcionais, evitando multiplicar documentos sem necessidade.

Ordem recomendada: extensão documental curta; jogo piloto aprovado separadamente; procedimento técnico por engine; automação somente após demonstrar repetição e benefício. Esta ordem é uma recomendação, não uma execução autorizada.

## Evidência e confiança

- Alta confiança na estrutura presente: leitura direta do guia, dos cinco templates, da decisão e das evidências anteriores.
- Alta confiança na resposta de versão local do Godot; capacidade de exportar e rodar um jogo não verificada.
- Recomendações são propostas derivadas das lacunas observadas, sem validação de eficácia em um jogo.
- Fontes externas consultadas em 2026-10-07; as páginas `stable` são referências móveis e precisam ser conferidas contra a versão de um eventual projeto.
- Consulta externa limitada a termos genéricos de documentação Godot; nenhum arquivo ou trecho local foi incluído nas buscas.
