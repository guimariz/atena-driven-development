# Cobertura do roteiro explicativo

PLAN-005 revisão 1, S-001. Público aplicado: pessoa que está conhecendo Atena/ADD, com interesse em entender e depois demonstrar no repositório. A pergunta opcional sobre mídia/público não recebeu resposta específica antes desta etapa; a estrutura é modular e o usuário pode ajustar o nível depois. Exemplo condutor: um pedido pequeno de resumo de status, com `example-project/` como demonstração de registros reais.

| Tema e perguntas que o roteiro deve responder | Blocos | Fonte principal | Verificação editorial |
| --- | --- | --- | --- |
| Para que serve ADD; quem decide; mínimo suficiente; reuso; evidência e história verdadeira | 1, 2, 7, 12 | ADD.md | Intenção humana e estado real não se confundem |
| Como adotar o pacote; onde está a entrada; que arquivos são guias e templates | 3, 14 | README.md | Método e projeto adotante diferenciados |
| Como o pedido ativa Guided ADD ou Direct Execution; lacunas, aprovação, desvios, voz e progresso | 2, 7, 9, 10 | INTERACTION.md | Exemplos de frases e proveniência corretos |
| Como corre o ciclo; prontidão; checkpoint; critérios de conclusão | 8–12 | WORKFLOW.md | Ordem e gates preservados |
| Que trabalho Atena pode fazer; perfis de autonomia; pausas; ações sempre aprovadas; qualidade | 9, 11–13 | AUTONOMY.md | Perfil, modo e gate distinguíveis |
| Local-first, privacidade, canon, dependências, Git, grafo e maturidade | 4, 6, 11, 12 | POLICIES.md | Local não é sinônimo de modelo local |
| Pastas obrigatórias, add.yaml, frontmatter, spec, estado e validação | 4–6, 8, 10, 12 | CONTRACT.md | Cada estrutura recebe finalidade e exemplo |
| Trilha de jogos, bíblia, protótipo, playtest e feedback humano | 14 | GAMES.md | Caráter opcional, ordem e limite de evidência |
| Especialistas, pré-requisitos visuais e adoção | 13, 14 | GAME-SPECIALISTS.md; DEC-002 | Pacotes portáveis não se apresentam como agentes iniciados |
| Manifesto de adoção, instruções e ambiente local | 3, 5, 14 | AGENTS.md; templates/AGENTS.md; .atena/add.yaml | Instruções carregadas são necessárias à ativação |
| Modelo de registros canônicos e estados | 4, 6 | templates/canonical-record.md; DEC-001/002 | DRAFT, CANON, aprovado, implementado, verificado distintos |
| Spec, plan, tasks, acceptance e evidência | 8, 12 | templates/spec/*; example-project/.atena | Exemplo planned e post-hoc identificados |
| Estado e retomada, incluindo schema e validador | 10, 12 | schemas/plan-state.schema.json; tools/validate-add-state.cjs | Shape, semântica e autorização separados |
| Grafo/índices/relatórios como derivados | 4, 12 | ADD.md; CONTRACT.md; POLICIES.md | Não alegar gerador de grafo operacional |
| Pesquisa, fontes, hipóteses e termos de uso | 4, 6, 14 | POLICIES.md; GAMES.md | Pesquisa não vira canon por inferência |
| Skills, briefs e possibilidade de multiagentes | 2, 13 | AUTONOMY.md; templates/automation/*; GAME-SPECIALISTS.md | Recomendação não instala nem delega |
| Template visual e prontidão antes de ação especializada | 14 | templates/game/*; DEC-002 | Identidade N/A quando inaplicável; posição não universal |
| Exemplo concreto do fluxo completo e explicação simples do vocabulário | 1–14; glossário | example-project/; guias acima | Cada bloco terá fala, tela/demonstração e transição |

## Estruturas de .atena conferidas

`add.yaml`, `vault/canon/`, `vault/drafts/`, `vault/research/`, `specs/`, `evidence/`, `generated/` e `state/plan.yaml` aparecem no bloco 4 com função e pergunta associada. A pasta `automation/` é identificada como opcional. O caminho `atena/` legado é abordado como migração controlada.

## Recorte de S-002

Transformar os 14 blocos DRAFT revisão 1 em um roteiro utilizável. Cada bloco terá texto de fala, demonstração e transição. Um walkthrough curto atravessará os conceitos para evitar repeti-los como verbetes isolados. Os arquivos técnicos ficarão como referências para quem quiser aprofundar. A proposta de jogos ficará ao final por ser uma aplicação opcional do mesmo método.

## Resultado de S-001

Matriz concluída. Nenhuma lacuna BLOCKING identificada. Público introdutório aplicado como default RESOLVABLE. S-002 recebe esta matriz, o draft revisão 1 e o exemplo local; entrega esperada: roteiro falado com demonstrações e transições. Verificações: precisão de conceitos, estados de maturidade e referências. Checkpoint PLAN permanece aprovado.
