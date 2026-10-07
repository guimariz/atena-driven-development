# Revisão documental dos cenários

Tipo de evidência: inspeção das instruções, decisão simulada e testes sintéticos locais. Revisor: o mesmo assistente que implementou; auto-revisão, sem agente/revisor independente iniciado. Não houve asset real, modelo separado, captura, jogo executado nem pessoa jogando.

| Cenário | Decisão e fundamento conferidos | Evidência |
| --- | --- | --- |
| Novo jogo | Instruções oferecem descoberta com bíblia; visão/design/escopo/bíblia precedem tecnologia | root/template AGENTS, GAMES, DEC-001 preservada |
| Revisão visual sem bíblia | Atena prepara insumos textuais antes; especialista não atua | Readiness fixture missing bible; templates e skills |
| Contexto sem cena construída | Descrição textual basta para a cena de uso | GAMES e template readiness |
| Sem posição | Trabalho autorizado com bible/identidade/cena prontas passa | Fixture no position required |
| Menu/jogo abstrato sem personagem | Identidade N/A com razão; bible e contexto permanecem | Fixtures N/A; catálogo e UI skill |
| DRAFT autorizado só para protótipo | Pode ser insumo delimitado; continua DRAFT, não CANON | Fixtures draft authority; POLICIES e briefs |
| Aprovação parcial | Só conteúdo/revisão identificado é promovido; restante permanece DRAFT | POLICIES; promoção delimitada DEC-002 na aprovação |
| Proporção muda entre frames | Separar identidade/pose de canvas/extração/escala; encaminhar sprite-fit | Skill e referência de fit; sem afirmar correção de asset real |
| Pés deslizam | Contato versus deslocamento/timing; playback/controller separado de desenho | Referência temporal; sem métricas inventadas |
| Movimento rígido ou loop salta | Examinar poses, peso, ritmo e último→primeiro; FPS sozinho não corrige | Skill/ref temporal e template de revisão |
| Controller reinicia clip | Animação localiza hipótese; gameplay-engineer só para escopo de código necessário | Skill temporal e gameplay; catálogo |
| Sem runtime ou feedback humano | Inspeção estática/documental separada; integração/fluidez/diversão não verificadas | Cada brief e templates; limite desta evidência |
| Lote/etapa seguinte pendente | Próximo passo preparado; execução não herda checkpoint anterior | Fixtures de batch boundary e per-step pending |
| IDs fora de sequência ou plano revisado | Contagem usa ordem e total real | Fixtures nonconsecutive, revised total, last step |
| Ferramenta não disponível | Registrar lacuna; nenhuma instalação/substituição silenciosa | Skills e catálogo; quick_validate indisponível registrado |
| Desempenho sem baseline | Preparar medição, não alegar otimização | Skill performance/delivery |
| Narrativa em jogo sem lore | Não recomendar narrativa sem necessidade | Skill narrativa e catálogo |
| Biblioteca versus instalação | Dez fontes e briefs presentes; descoberta automática requer adoção local; nenhum agente iniciado | Catálogo, caminhos reais e instruções raiz |

Os testes de prontidão verificam campos fornecidos em casos sintéticos; não autenticam aprovação humana. Os testes de estado resolvem registros locais e rejeitam combinações inválidas dentro do formato documentado. Resultados reais estão em [implementation-checks.json](implementation-checks.json).
