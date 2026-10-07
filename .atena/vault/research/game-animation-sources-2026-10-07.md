# Fontes para assets e animação de jogos

Consulta: 2026-10-07. Pesquisa com termos genéricos; arquivos, assets e trechos privados do projeto não foram enviados a serviços externos.

Após a pesquisa inicial, o usuário esclareceu: animações 2D/sprites, Godot + ChatGPT. Fontes 3D abaixo são contexto, não recomendações para o problema atual. Fontes prioritárias agora:

| Fonte primária 2D | Evidência útil | Limite |
| --- | --- | --- |
| [Godot: sprites](https://docs.godotengine.org/en/stable/tutorials/2d/2d_sprite_animation.html) | Imagens individuais/sheets em AnimatedSprite2D; AnimationPlayer pode animar outras propriedades. | Importar não comprova continuidade ou naturalidade. |
| [Godot: SpriteFrames](https://docs.godotengine.org/en/stable/classes/class_spriteframes.html) | FPS e duração relativa por frame. | Duração relativa não é um valor absoluto em segundos; verificar a versão real. |
| [Godot: AnimatedSprite2D](https://docs.godotengine.org/en/stable/classes/class_animatedsprite2d.html) | centered, offset, frame e velocidade para reprodução/alinhamento. | Não normalizar toda pose para uma bounding box idêntica; a área ocupada pode mudar intencionalmente. |
| [Godot: cutout](https://docs.godotengine.org/en/stable/tutorials/animation/cutout_animation.html) | Animação por partes e combinação com quadro a quadro. | Página avisa atualização incompleta para 4.7; verificar operações concretas na versão do projeto. |

Não há evidência consultada de garantia de continuidade temporal pela geração de imagens usada pelo usuário. Preservar referência mestre e avaliar resultados são recomendações; inconsistência permanece hipótese até inspecionar os frames reais.

| Fonte primária | Evidência útil | Limite de aplicação |
| --- | --- | --- |
| [Godot: retargeting de esqueletos](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/retargeting_3d_skeletons.html) | Compatibilidade depende de hierarquia e pose de repouso, além de nomes. BoneMap, correção de rest pose e normalização de tracks são mecanismos disponíveis. | Ajustes podem afetar acessórios ou rigs; aplicar conforme o asset e a versão real do projeto. |
| [Godot: AnimationTree](https://docs.godotengine.org/en/stable/tutorials/animation/animation_tree.html) | Estados, blend spaces, sincronização e root motion permitem controlar a reprodução e suas transições. | A versão `stable` é móvel; confirmar recursos na versão do jogo. A existência do recurso não comprova qualidade de uma implementação. |
| [Blender: Armature Deform Parent](https://docs.blender.org/manual/en/latest/animation/armatures/skinning/parenting.html) | A associação entre malha e ossos envolve pesos; pesos automáticos podem precisar de correção manual. | Encontrado no índice de busca do manual; a abertura direta desta URL falhou na consulta. Conferir a página na versão instalada antes de prescrever operações. |
| [Blender: Rigify](https://docs.blender.org/manual/en/latest/addons/rigify/index.html) | Geração de rigs a partir de componentes e recursos de controle. | Rig de autoria não é evidência de compatibilidade de exportação ou de importação na engine. |
| [Adobe: Mixamo FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html) | Biblioteca e auto-rig orientados a humanoides bípedes; proporções muito deformadas e apêndices extras podem impedir o auto-rig. | Não recomendado como solução universal para criaturas ou personagens muito estilizados; testar o personagem específico. |
| [Kenney: personagens](https://kenney.nl/assets?search=characters) | Catálogo inclui personagens animados e outros assets. | Selecionar um pacote exato, conferir conteúdos e testar importação; catálogo não comprova qualidade para o jogo. |
| [Kenney: Blocky Characters](https://kenney.nl/assets/blocky-characters) | Página identifica animação e licença CC0 para esse pacote. | Escolha condicional para protótipos estilizados; não implica aprovação artística ou presença de cada ação desejada. |
| [Poly Haven](https://polyhaven.com/) e [licença](https://polyhaven.com/license) | Catálogo de modelos, texturas e HDRIs; condições publicadas pelo fornecedor. | Útil para materiais e ambientes; não apresentado como biblioteca de locomoção. Registrar a fonte de cada asset escolhido. |
| [Aseprite: onion skinning](https://www.aseprite.org/docs/onion-skinning/) | Visualização conjunta de frames anteriores e seguintes para comparação. | Recurso de apoio à revisão 2D; não constitui validação automática de fluidez. |
| [Epic: Game Animation Sample](https://dev.epicgames.com/documentation/en-us/unreal-engine/game-animation-sample-project-in-unreal-engine) | Projeto de estudo de locomoção e motion matching. | Referência condicional para Unreal; não recomenda trocar a engine nem reutilizar conteúdo sem verificar os termos pertinentes. |

As recomendações de processo derivadas dessas fontes são propostas da Atena. Nenhum asset local foi inspecionado; não há diagnóstico causal, comparação de qualidade entre fornecedores ou evidência de correção. Fontes `stable`/`latest` precisam de conferência contra versões concretas.
