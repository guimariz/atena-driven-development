# Descoberta — SPEC-001

Data: 2026-10-05, conforme o contexto do usuário (America/Sao_Paulo).

## Pedido

O usuário dirigiu-se à Atena para propor uma mudança no ADD: oferecer estrutura para pessoas que desejam criar jogos. Solicitou entrevista e recomendações. A interação segue Guided ADD.

## Primeira rodada

- Sugerir a trilha e confirmar antes de ativá-la.
- Manter independência de engine; recomendar engine e tecnologias por último, fundamentadas no que foi decidido sobre o jogo.
- Aceitar ajuda da ideia à visão, primeira entrega jogável, specs, produção por marcos, playtests e evidências; arte, áudio e publicação podem ter trilhas complementares conforme o escopo.
- Manter conteúdo em drafts durante exploração e promover decisões estáveis após aprovação.
- Definir o jogo pela conversa, sem escolher um gênero padrão para a metodologia.

## Segunda rodada

- Acrescentar a construção da bíblia visual antes da escolha da engine.
- Aprovar a adaptação da orientação à experiência do usuário.
- Exigir que Atena sempre informe as principais pendências para iniciar o protótipo.
- Aprovar a divisão: Atena valida funcionamento/consistência; usuário experimenta e avalia sensação, dificuldade e diversão.
- Exigir que Atena sempre informe o que cada playtest deve testar.

## Defaults propostos, não apresentados como respostas do usuário

- Rodadas de até três perguntas, ajustáveis ao contexto.
- Bíblia visual inicial suficiente para decidir tecnologia e protótipo, com refinamento posterior.
- Protótipo do loop antes de avaliar um vertical slice.
- Retorno humano necessário para comprovar critérios subjetivos; avanço condicionado aos critérios do marco.
- Preservar engine já estabelecida em projetos existentes, propondo revisão apenas com motivo concreto.
- Documentação oficial em inglês e templates opcionais no contrato ADD v0.2 existente.

## Inspeção local

- Raiz contém ADD.md, README.md, INTERACTION.md, WORKFLOW.md, AUTONOMY.md, POLICIES.md, CONTRACT.md, schemas, templates, assets e example-project.
- Antes da preparação, não havia `.atena/` nem `atena/` na raiz; a `.atena/` de example-project pertence ao exemplo, não a este workspace.
- Nenhum plano ativo na raiz a classificar. Esta é uma nova proposta Guided ADD, não uma alteração de plano ativo.
- Status inicial do Git não listou alterações; houve avisos de acesso negado ao ignore global. Git não é requisito para esta mudança.
- Contrato atual suporta projetos de jogos e lore, sem trilha específica de criação de jogos.
- Templates de specs, registros e estado existentes podem ser reutilizados.

## RTK

- `rtk --version`: versão 0.48.0.
- `rtk gain`: falhou ao criar/acessar o banco de histórico em AppData, por acesso negado.
- Comandos diretos com filtros do RTK também reportaram falha de configuração; `rtk proxy` permitiu inspeção.
- Verificação de ganhos não confirmada; status `unknown`. Nenhuma instalação ou configuração global realizada. Esta limitação não bloqueia ADD.

## Preparação e autoridade

Criados somente o workspace operacional, rascunhos de proposta/decisão, spec/plan/tasks/acceptance e esta evidência, conforme a política draft-first. Estado sem plano ativo. Nenhuma promoção canônica ou alteração das regras oficiais.

As aprovações de recomendações na entrevista confirmam requisitos. Modo de aprovação e checkpoint de execução deste plano ainda pendentes. Nenhum teste de implementação ou execução de jogo foi realizado.

## Verificação da preparação

- Oito caminhos obrigatórios do contrato presentes.
- Doze arquivos preparados, incluindo placeholders de diretórios vazios.
- Três IDs de registros únicos neste workspace: `DEC-001`, `SPEC-001`, `PLAN-001`.
- Seis links Markdown locais conferidos e resolvidos.
- Estado operacional conferido contra a forma ociosa exigida: versão 2, plano/cursor/suspensão nulos e lista vazia de desvios.
- Spec em `draft`; modo de aprovação `unconfigured`; plano não ativado.
- Git indica apenas `.atena/` como conteúdo novo; documentos oficiais não alterados.
- Esta verificação estrutural não é uma validação YAML completa nem validação da trilha implementada; os critérios AC-1 a AC-11 continuam pendentes.
