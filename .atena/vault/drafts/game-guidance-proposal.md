# Proposta — trilha de criação de jogos no ADD

Proposta preparada antes da implementação e preservada como referência da revisão 1 aprovada por plano. As regras oficiais decorrentes estão em `GAMES.md` e nas integrações documentais; este arquivo não é uma fonte canônica concorrente. Consultar a spec e suas evidências para o estado de execução.

## Entrada e confirmação

Quando o usuário expressar intenção clara de criar um jogo, Atena sugere uma trilha estruturada e pede confirmação. Exemplo de convite: “Posso te guiar pela definição do jogo, bíblia visual, escopo e primeiro protótipo. Quer seguir essa trilha?”

Reconhecer a intenção pelo contexto, não somente pela palavra “jogo”. Uma correção em um jogo existente não inicia automaticamente a entrevista. Uma recusa encerra o convite e preserva o caminho de interação vigente. A confirmação escolhe o processo de descoberta; a implementação segue os checkpoints e aprovações do ADD.

## Entrevista adaptativa

Fazer rodadas curtas de até três perguntas relacionadas, aproveitando respostas anteriores e adaptando explicações à experiência demonstrada. O limite de três é um default recomendado para reduzir a carga da entrevista, não uma exigência fornecida pelo usuário.

Ao terminar cada rodada, resumir decisões, propor caminhos com razões e explicitar dúvidas relevantes. Perguntar apenas o que muda o resultado. Se o usuário já trouxer um conceito desenvolvido, preencher a estrutura com essa informação e investigar somente lacunas.

Gênero, estilo, dimensionalidade, plataforma e tamanho vêm da conversa. A experiência desejada pode ser discutida mesmo quando o usuário ainda não sabe nomear um gênero. Exploração pode voltar a etapas anteriores quando uma escolha revela uma restrição.

## Sequência de definição inicial

1. **Experiência e visão:** fantasia do jogador, público, sensações desejadas, referências, propósito e pilares.
2. **Design:** loop principal, ações, objetivos, desafios, feedback, controles, progressão e mundo/lore quando necessários.
3. **Escopo e produção:** plataformas desejadas, equipe, experiência, tempo, orçamento, quantidade de conteúdo e limitações.
4. **Bíblia visual:** direção de arte ligada à experiência e às condições de produção.
5. **Primeira entrega e prontidão:** hipótese do protótipo, recorte jogável, aceitação, pendências e playtest inicial.
6. **Recomendação técnica, por último:** engine, ferramentas e arquitetura justificadas pelo conjunto anterior.

A ordem estabelece que a recomendação técnica depende da definição do jogo e da bíblia visual. Informações podem ser refinadas durante a conversa. “Por último” significa o fim da definição inicial, antes da implementação; detalhes de todo o jogo não precisam estar completos para prototipar.

Se uma engine ou tecnologia já estiver decidida, registrar e considerar essa restrição. Evidenciar conflitos concretos e propor uma revisão quando necessária. Instalação local de Godot ou disponibilidade de plugins não determina a escolha.

## Bíblia visual

Construir uma bíblia visual inicial revisável antes da escolha de engine. Ela deve ser suficiente para justificar os requisitos visuais e técnicos do protótipo, podendo crescer por marcos.

Cobrir os tópicos aplicáveis:

- Intenção artística e relação com os pilares de experiência.
- Referências visuais comentadas, origem e condição de uso conhecida; distinguir inspiração de assets utilizáveis.
- Linguagem visual: 2D/3D quando já definido, estilização, formas, silhuetas, escala, paleta e materiais.
- Personagens, objetos e ambientes, conforme presentes no jogo.
- Câmera, composição, iluminação e legibilidade.
- Interface, tipografia, ícones e hierarquia visual.
- Animação, efeitos e feedback das ações.
- Legibilidade e acessibilidade relevantes, como não depender somente de cor para comunicar estados importantes.
- Limites de produção: quantidade e complexidade dos assets, habilidades disponíveis e recursos necessários.
- Critérios de revisão, referências aprovadas, hipóteses e pendências.

Registrar “não aplicável” com justificativa nos tópicos dispensáveis. Uma bíblia textual com referências pode bastar inicialmente. Produção de imagens, contratação, serviços pagos ou aquisição de assets entram somente se fizerem parte do escopo autorizado. Não escolher ferramentas antes de estabelecer os requisitos visuais.

## Pendências antes do protótipo

Atena sempre informa as pendências principais antes de iniciar o protótipo, inclusive quando não houver bloqueios. O relatório deve incluir:

- O que o protótipo pretende demonstrar e o recorte incluído.
- Pendências principais, motivo, efeito no início e decisão/ação necessária.
- `BLOCKING`: pendências que impedem execução correta ou segura; precisam ser resolvidas.
- `RESOLVABLE`: decisões para as quais há default fundamentado e explicitado.
- `DEFERRED`: conteúdo ou decisões fora deste protótipo, com motivo e momento de revisão.
- Estado da bíblia visual inicial e decisões necessárias para a recomendação técnica.
- Depois da recomendação técnica, estado das escolhas, ferramentas, autorizações e plano de implementação.
- Próximo passo concreto e indicação de prontidão após os checkpoints aplicáveis.

Se não houver pendências principais, dizer isso explicitamente. Não ocultar pendências porque um default existe, nem bloquear o protótipo por detalhes adiados que não afetam sua hipótese.

## Protótipo e marcos

Recomendar um protótipo pequeno do loop principal. Depois, avaliar se um vertical slice é adequado para demonstrar uma amostra integrada da qualidade e da produção. Planejar conteúdo, polimento e lançamento por marcos conforme o jogo, sem exigir a mesma sequência de todos os projetos.

O protótipo testa hipóteses; uma mudança descoberta durante os testes deve ser proposta e registrada. Regras canônicas aprovadas não são reescritas silenciosamente por um resultado de playtest.

## Playtests explícitos

Antes de cada playtest, Atena sempre informa o que deve ser testado. O plano registra:

- Build/versão e recorte do jogo.
- Pergunta ou hipótese a investigar.
- Quem joga, condições, tempo estimado e roteiro.
- Ações a realizar e situações a observar.
- Critérios observáveis, perguntas subjetivas e evidências esperadas.
- Resultado e consequência: continuar, ajustar, testar de novo ou rever uma decisão.

Atena valida o que puder demonstrar com verificações técnicas: funcionamento, consistência, falhas e comportamento observado. O usuário experimenta e avalia sensação, dificuldade e diversão. Métricas técnicas não comprovam diversão. Se ninguém jogou, o teste permanece pendente.

Exemplo ilustrativo, sem estabelecer um gênero padrão: “Neste teste, verificar se o jogador entende o objetivo sem explicação adicional, consegue executar a ação central e percebe o resultado dela. Registrar onde houve dúvida e pedir uma avaliação da sensação de controle.”

Os critérios de cada marco definem quando o retorno humano é necessário para sua aceitação. Não declarar um critério subjetivo validado por teste automático ou avaliação do modelo. Um teste pendente só impede avançar quando for necessário à aceitação ou a uma decisão do próximo marco.

## Registros e integração ADD

Reutilizar `.atena/vault/drafts/`, `.atena/vault/research/`, `.atena/vault/canon/`, specs, evidence e o cursor de plano existentes. Os templates de jogos são opcionais; não criam outro workspace nem um tipo obrigatório de projeto.

Manter visão, mecânicas, lore e direção visual em drafts durante exploração. Aprovação explícita identifica o conteúdo/revisão promovido ao cânone. Planos aprovados podem incluir essa promoção delimitada, evitando confirmações redundantes. Implementação e mudanças de intenção continuam sujeitas às regras ADD.

Documentar o processo em `GAMES.md` e integrar suas referências a `README.md`, `INTERACTION.md`, `WORKFLOW.md` e `templates/AGENTS.md`. Acrescentar templates de visão, design, bíblia visual, prontidão de protótipo e playtest em `templates/game/`.

## Limites desta mudança

Entregar documentação e templates. Não desenvolver um jogo, selecionar engine para um jogo inexistente, instalar ferramentas, gerar assets, usar serviços pagos ou publicar conteúdo. Os documentos oficiais permanecem em inglês, seguindo o repositório; exemplos de fala ao usuário podem usar português.
