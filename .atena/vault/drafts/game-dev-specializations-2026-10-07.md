> Histórico de proposta DRAFT, anterior à aprovação; não é regra vigente. O usuário retirou posição como requisito e aprovou a revisão integrada. Consulte [DEC-002 CANON](../canon/DEC-002-visible-plan-and-visual-readiness.md) e [aprovação](../../evidence/SPEC-004-add-readiness-and-progress/approval.md). O corpo antigo abaixo permanece como histórico.

# Especializações de game dev para Atena — proposta 2D

Data: 2026-10-07. Rascunho não canônico em Guided ADD. Revisão 1 incorpora as respostas: animações 2D/sprites, Godot + ChatGPT.

Complemento posterior, revisão 2 da spec: o usuário exigiu bíblia visual, identidade, posição/apresentação e cena estruturadas antes da atuação visual. A [proposta transversal](add-readiness-and-progress-2026-10-07.md) e SPEC-004 devem ser implementadas primeiro; as duas skills/briefs seguirão esse requisito. O corpo abaixo preserva as recomendações iniciais, sem representar uma aprovação ou regra canônica nova.

## Recomendação central

Começar com duas skills e dois papéis de agente para consistência e animação de sprites. Definir identidade visual, proporções, poses, alinhamento e ritmo; comparar os frames de origem com a reprodução no Godot. Uma imagem isolada não comprova uma animação de qualidade.

Skills fornecem procedimentos reutilizáveis; agentes recebem entregas delimitadas e usam esses procedimentos. Não é necessário manter todos os papéis executando em cada tarefa. A proposta foi solicitada pelo usuário; não se afirma que três procedimentos semelhantes já foram observados conforme a política de oportunidades.

## Hipóteses para os problemas relatados

Sem o sheet ou projeto real, não há diagnóstico causal.

| Sintoma | Hipóteses iniciais | Como discriminar |
| --- | --- | --- |
| Cabeça, corpo ou roupa mudam entre frames | Desenhos inconsistentes, recorte/redimensionamento por frame ou escala na cena | Sobrepor frames à referência mestre e conferir transforms no Godot |
| Personagem treme ou parece saltar | Pivô, margens/linha de chão ou extração do sheet | Marcar âncora e contatos em canvas fixo; conferir regiões e offset |
| Movimento dá trancos | Poses desconectadas, ordem/duração, loop ou reset de frame pelo controlador | Reproduzir sequência isolada e depois no gameplay com estados/frames observáveis |
| Movimento parece robótico | Falta de peso, apoio, antecipação, reação e ritmo | Revisar poses-chave e reprodução no tamanho do jogo, com referência e avaliação humana |
| Pés deslizam | Passada/duração incompatíveis com velocidade ou contato mal desenhado | Comparar ciclo isolado e deslocamento no chão de teste, registrando velocidade e duração |

“Humanização” significa movimento intencional adequado ao estilo. Priorizar contato, transferência de peso, antecipação, ação e recuperação. Movimento secundário precisa servir à ação; ruído ou deslocamento do sprite inteiro não substituem poses convincentes. Pixel art e ilustração podem exigir técnicas diferentes.

## Produção visual recomendada

1. **Referência mestre:** definir silhueta, proporções, paleta, acabamento, câmera e escala de exibição. Usar a mesma referência em toda revisão; mudanças de intenção requerem aprovação.
2. **Contrato de sprite:** canvas/célula, âncora/pivô, linha de chão, margens, transparência, direções, nomes e escala. Identidade consistente não exige bounding boxes idênticas em poses diferentes.
3. **Poses-chave:** planejar a ação antes de pedir muitos frames. Para andar, considerar contato, transferência de peso, passagem e troca de apoio; para ataque, antecipação, ação e recuperação. Adaptar ao personagem.
4. **Geração:** usar ChatGPT para conceito, referência e propostas de poses; cada resultado é candidato. Reutilizar a referência original e corrigir divergências. Repetir um prompt ou gerar mais frames não garante continuidade temporal.
5. **Autoria e limpeza:** revisar sobreposições/onion skin no editor apropriado; corrigir identidade, contornos, contatos, transparência e transições. Preservar originais e derivados identificados.
6. **Ritmo:** ajustar ordem, duração de poses e loop. Mais FPS ou frames repetidos não resolvem desenho inconsistente. O [SpriteFrames](https://docs.godotengine.org/en/stable/classes/class_spriteframes.html) do Godot permite duração relativa por quadro e velocidade por animação.
7. **Integração:** revisar o loop no tamanho final e velocidade normal, usando câmera lenta como apoio; depois testar controlador, colisão e câmera. Comparar a sequência original com a reprodução importada.

Para pixel art/quadro a quadro, um editor com timeline e onion skin, como [Aseprite](https://www.aseprite.org/docs/onion-skinning/), é uma opção. Para ilustração articulável, avaliar partes separadas/cutout se esse estilo for desejado. O [Godot documenta cutout](https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html), mas a página alerta sobre atualização incompleta; verificar a versão antes de operações concretas. Reutilizar partes pode preservar desenhos, porém ainda exige boa articulação e timing.

Pacotes 2D coerentes, por exemplo no [catálogo Kenney](https://kenney.nl/assets?search=characters), podem servir de referência técnica ou placeholder. Para personagem principal com identidade própria, avaliar autoria/revisão dedicada quando a qualidade requerida exceder o resultado gerado. Selecionar um pacote exato por ações/estilo e registrar origem/termos. Nenhuma compra ou ferramenta nova é necessária nesta primeira proposta.

## Skills e agentes propostos

| Componente | Entrega | Limite |
| --- | --- | --- |
| `atena-game-sprite-fit` | Contrato e avaliação de candidatos: proporções, silhueta, canvas, âncora, transparência e adequação ao jogo | Não aprova animação por um frame nem duplica geradores existentes |
| `atena-game-sprite-animation-review` | Diagnóstico de sequência, ritmo, contatos, loops e integração Godot; plano da menor correção | Não conclui naturalidade por métrica/FPS nem altera intenção visual silenciosamente |
| Agente de arte técnica 2D | Um personagem/ação delimitado, candidato separado e relatório de correções | Caminhos de escrita definidos, originais preservados e geração dentro da autorização |
| Agente de QA 2D | Reprodução, comparação temporal e aceitação/pendências | Validação estrutural, runtime e avaliação visual separadas; independência só quando outro agente revisou |

Handoff: personagem/ação/versão, referência, caminhos autorizados, critérios, hipótese, original/candidato, duração/escala, checks, preview/captura, limitações e próximo responsável. Atena integra os resultados na spec do marco.

## Outras estruturas padrão de game dev

| Área | Base recomendada | Especialização futura quando houver demanda |
| --- | --- | --- |
| Design e produção | Pilares, core loop, hipóteses, marcos, balanceamento e decisões por playtest | Experimentos e tuning com limites |
| Gameplay | Entrada, controlador, estados de ação e apresentação com responsabilidades claras | Comportamentos e interações |
| Mundo, fases e câmera | Escala visual, módulos/tiles, colisão, câmera e legibilidade | Level design e câmera |
| UI e acessibilidade | Estados de interface, navegação, resolução, inputs e leitura | Interface e acesso |
| Áudio e feedback | Eventos, buses, volumes e sincronização com ações e efeitos | Feedback audiovisual |
| Estado e dados | Cenas, recursos configuráveis e save/versionamento quando necessário | Organização e persistência |
| QA, desempenho e entrega | Cenários, build identificável, logs, orçamento de desempenho e instruções | Testes, perfil de desempenho e entrega |

Esclarecer primeiro os contratos entre essas partes. Criar novas skills/agentes quando houver entregas repetíveis e ganho concreto, sem antecipar um framework completo para um jogo indefinido.

## Plano recomendado e pendências

Primeira etapa: duas skills portáveis, dois briefs e dois templates de contrato/revisão, com links no guia. Depois, piloto separado em um sprite/ação real. Faltam estilo (pixel art ou ilustração), versão do projeto, caminhos dos assets e reprodução do defeito para escolher a técnica e corrigir. Esses itens bloqueiam o piloto, não os procedimentos documentais.

Ver [SPEC-003](../../specs/SPEC-003-game-dev-specializations/spec.md) e [plano](../../specs/SPEC-003-game-dev-specializations/plan.md). A [SPEC-002](../../specs/SPEC-002-game-production-loop/spec.md) continua separada e pendente. Modo/checkpoint ainda não aprovados. Nenhum pacote de skill, agente em execução ou mudança oficial foi criado.

## Base e limites

DEC-001, GAMES, templates visuais e proposta anterior; [fontes primárias](../research/game-animation-sources-2026-10-07.md). Recomendações são inferências de processo. Não houve inspeção de sprite real, correção, geração, execução de jogo ou aceitação visual.
