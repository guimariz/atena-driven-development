> Histórico de proposta DRAFT, anterior à aprovação; não é regra vigente. O usuário retirou posição como requisito e aprovou a revisão integrada. Consulte [DEC-002 CANON](../canon/DEC-002-visible-plan-and-visual-readiness.md) e [aprovação](../../evidence/SPEC-004-add-readiness-and-progress/approval.md). O corpo antigo abaixo permanece como histórico.

# ADD: prontidão visual, andamento e estados dos registros

Data: 2026-10-07. Proposta em DRAFT; não é regra canônica nem autorização de execução.

## Diagnóstico verificado

| Pedido | Situação atual | Lacuna |
| --- | --- | --- |
| Bíblia visual antes do trabalho visual | GAMES, WORKFLOW, INTERACTION e templates/AGENTS exigem bíblia inicial antes da recomendação técnica | Não há um contrato único que impeça especialistas visuais de começar sem identidade, posição e contexto de cena |
| Aplicação em jogos novos | README exige copiar as instruções ao projeto; `.atena/` sozinha não injeta comportamento | As cópias locais de AGENTS de Nottgard Survivors e Eclipse Game Jam não contêm a seção atual de criação de jogos nem a exigência explícita da bíblia |
| Progresso sempre visível | Estado possui current_step, total_steps e cursor.next | Default exceptions-and-final não exige informar início/fim de cada etapa ou preparar a próxima |
| Por plano/lote/etapa | Regras e schema reconhecem os três modos | Schema verifica formato; não prova respeito ao checkpoint nem valida todas as referências cruzadas |
| Draft e canon explícitos | Política exige promoção aprovada e preserva fontes | Comunicação não padroniza status, revisão aprovada e alcance parcial da promoção em cada decisão |

O projeto que originou o relato ainda não foi identificado pelo usuário. A comparação das duas cópias é evidência de ausência dessas instruções nos arquivos inspecionados, não prova de qual contexto um chat passado carregou. Instruções de ancestrais/overrides e contexto manual podem afetar uma execução. A descoberta de raiz Git nesses jogos não pôde ser confirmada por acesso negado; nenhum arquivo desses projetos foi modificado.

## Contrato antes de qualquer especialista visual

Atena organiza a descoberta textual e os rascunhos. Produção, adaptação, animação e revisão visual por agentes/skills exigem, para o recorte da tarefa:

1. Bíblia visual identificada por caminho, revisão e estado.
2. Identidade do personagem/entidade: silhueta, proporções, paleta, materiais/acabamento, roupa/acessórios, traços e limites relevantes.
3. Posição e apresentação: pose, direção/orientação, perspectiva, câmera, enquadramento, âncora/pivô/escala aplicáveis.
4. Cena estruturada: propósito, composição, ambiente, luz, relações espaciais, contraste e contexto de uso.
5. Ação/resultado esperado, critérios e autorização da tarefa; nenhuma lacuna BLOCKING relevante.

Cena estruturada significa contexto e composição definidos, não uma cena de engine já construída. Usar o mínimo suficiente para a tarefa. UI, cenários sem personagens, jogos abstratos e outros casos registram não aplicável com motivo em vez de inventar personagens ou lore.

Antes da atuação, Atena mostra PRONTO ou BLOQUEADO, referências e pendências. Se faltar requisito, prepara a próxima ação de descoberta; não delega a produção/revisão visual. Placeholders produzidos por esses especialistas também seguem o requisito.

Uma referência pode ser CANON ou um DRAFT de revisão específica cujo uso experimental foi aprovado para o escopo. Aprovar uso de um draft não o promove automaticamente ao cânone. Para intenção estável e oficial, promover o conteúdo delimitado após aprovação. Isso permite protótipos sem esconder o status de hipóteses.

## Comunicação do plano

Propor o default step-updates-and-final, independente do modo de aprovação. Em cada início/retomada/transição de etapa e atualização significativa, apresentar plano/revisão, etapa atual, total, concluídas, restantes após a atual, atividade, modo/checkpoint e pendências pertinentes.

Exemplo de formato, sem afirmar execução real:

> PLAN-XXX, revisão 1 — etapa 3 de 7; 2 concluídas e 4 após esta. Agora: estruturar a cena e o enquadramento. Aprovação por plano; checkpoint aprovado. Bíblia visual: DRAFT revisão 2, em preparação.

No encerramento da etapa, informar evidência/resultado e o estado dos registros. Deixar a próxima etapa preparada com objetivo, entradas, entrega, critérios, ações e situação do checkpoint. Não marcar concluída uma etapa com critério obrigatório pendente.

Por plano: continuar dentro do escopo aprovado sem nova confirmação por etapa. Por lote: continuar dentro do lote e parar antes do próximo pendente. Por etapa: preparar a próxima e aguardar sua aprovação. Uma nova spec ou mudança material fora do escopo exige sua própria aprovação. Preparar continuidade não cria execução agendada nem autoriza trabalho futuro por conta própria.

Sem plano ativo, dizer isso e identificar a preparação como preparação, sem fabricar progresso de implementação. Alterações na sequência revisam o total; não fingir que o número original continua válido.

## Draft, aprovação e canon

- **DRAFT:** hipótese/proposta, caminho e revisão; dizer o que falta decidir e o próximo passo.
- **Uso de draft aprovado:** indicar o conteúdo/revisão e o escopo experimental. Continua DRAFT.
- **CANON:** ID, caminho, revisão/conteúdo aprovado, autoria da aprovação e evidência. Só após promoção explícita.
- **Mudança parcial:** listar o que passou ao cânone e o que permanece draft. Aprovação de um parágrafo não aprova o documento misto inteiro.
- **Implementação/validação:** approved, implemented e verified são estágios distintos. Um registro pode ser canônico e aprovado sem estar implementado ou validado.
- **Sucessão:** preservar a história e o registro substituído; não sobrescrever intenção sem revisão/sucessor aprovado.

## Agentes e skills para diferentes jogos

| Papel recomendável | Skill/procedimento | Entrada | Entrega delimitada |
| --- | --- | --- | --- |
| Design de jogo/sistemas | Estruturar core loop, regras e experimentos | Visão, público, restrições | Mecânica/hipótese, critérios e playtest |
| Engenharia de gameplay | Implementar comportamento e estados | Spec da mecânica e escolha técnica | Mecânica executável com verificações |
| Fases/mundo/câmera | Organizar espaço, progressão e legibilidade | Design, restrições espaciais e direção aplicável | Uma fase/layout/câmera com teste |
| Conteúdo/narrativa, quando aplicável | Preservar lore, relações e progressão | Canon relevante e escopo de conteúdo | Conteúdo proposto com continuidade verificada |
| UI e acessibilidade | Estados, navegação, leitura e inputs | Fluxos, requisitos de acesso e identidade visual | Uma interface testável; requisitos visuais antes da produção |
| Áudio e feedback | Eventos, ritmo e sincronização | Ações e objetivos sensoriais | Conjunto de feedback e avaliação; efeitos visuais respeitam o gate |
| QA e playtests | Cenários e evidência de aceitação | Build/spec e perguntas de teste | Reprodução, regressões, pendências e resultado |
| Desempenho e entrega | Medir, otimizar e preparar execução | Cenário, plataforma e orçamento | Comparação mensurável ou build/instruções; publicação separada |

Papéis são opções proporcionais ao jogo. Criar/invocar quando houver tarefa concreta e caminhos autorizados; Atena integra resultados. Não implementar todos nessa primeira mudança. Papéis mistos precisam do contrato visual antes da parte visual.

## Adoção em projetos

Adicionar bootstrap verificável: instruções carregáveis na raiz, referências locais, caminhos ADD, revisão da metodologia adotada e readiness da trilha. Uma cópia antiga não se atualiza quando o repositório da Atena muda. Para Codex, verificar a cadeia AGENTS/overrides e reabrir uma execução com instruções atualizadas quando necessário; [documentação oficial](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

Pacotes em templates são distribuíveis, mas não ficam ativos automaticamente. Codex descobre skills nas localizações próprias, incluindo .agents/skills; [documentação oficial](https://learn.chatgpt.com/docs/build-skills). Instalação/admissão e mudanças nos jogos existentes ficam fora desta primeira implementação local.

## Proposta de execução

Primeiro implementar o contrato ADD transversal em [SPEC-004](../../specs/SPEC-004-add-readiness-and-progress/spec.md); depois implementar a [SPEC-003](../../specs/SPEC-003-game-dev-specializations/spec.md), revisada para depender desse gate. SPEC-002 continua separada. Aprovação de uma não autoriza as outras.

Na preparação atual não há plano ativo. O modo da futura implementação é unconfigured e o checkpoint está pendente. Há zero BLOCKING para o escopo upstream delimitado; identificar o jogo afetado é necessário apenas para seu diagnóstico específico e eventual migração, ambos adiados.
