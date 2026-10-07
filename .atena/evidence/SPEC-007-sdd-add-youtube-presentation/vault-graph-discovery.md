# Inspeção local de vaults e graph para o storyboard

Data: 2026-10-07. Preparação documental de SPEC-007 DRAFT; não autoriza execução de PLAN-007.

- `.atena/vault/canon/` contém dois registros de decisão, `DEC-001` e `DEC-002`, ambos com status `verified`. `DEC-002` declara `relations: ["DEC-001"]` e aponta fontes de spec/evidência. Esses campos sustentam a explicação de IDs, relações e revisão.
- `.atena/vault/drafts/` contém propostas, incluindo o storyboard atual; os rascunhos não são canon só porque foram usados para planejar a apresentação.
- `.atena/vault/research/` contém pesquisa com fontes e limites registrados; essa pesquisa também não promove intenção automaticamente.
- `ADD.md` define vault canônico, specs de mudança e artefatos derivados como três camadas distintas. `POLICIES.md` estabelece graph derivado de IDs e relações aprovados e proíbe que relações inferidas virem canon automaticamente.
- `.atena/add.yaml` configura `graph.mode: derived` e `graph.output: generated/graph.production.json`. Na inspeção, `.atena/generated/graph.production.json` **não existe**. Não foi encontrado gerador de graph de produção no repositório. Portanto, o vídeo pode mostrar o vínculo real DEC-002 → DEC-001 como diagrama explicativo, mas não apresentar um JSON de graph já gerado ou afirmar uso operacional inexistente.

Revisar esses fatos novamente antes de produzir o deck, pois o estado dos arquivos pode mudar.
