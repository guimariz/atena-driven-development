import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const buildDir = path.join(root, '.atena/evidence/SPEC-007-sdd-add-youtube-presentation/build');
const finalPath = path.join(root, 'presentations/atena-sdd-add-youtube-v2.pptx');
const candidatePath = path.join(buildDir, 'candidate.pptx');
const runtime = 'C:/Users/gui-m/.cache/codex-runtimes/codex-primary-runtime/dependencies';
const skill = 'C:/Users/gui-m/.codex/plugins/cache/openai-primary-runtime/presentations/26.915.20218/skills/presentations';
process.env.RUNTIME_NODE = path.join(runtime, 'node/bin/node.exe');
process.env.RUNTIME_NODE_MODULES = path.join(runtime, 'node/node_modules');
process.env.RUNTIME_BIN_DIR = path.join(runtime, 'bin/override');
process.env.RUNTIME_PYTHON = path.join(runtime, 'python/python.exe');
await fs.mkdir(buildDir, {recursive:true});

const { Presentation, PresentationFile } = await import(pathToFileURL(path.join(runtime,'node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const { finalizePresentation } = await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const ppt = Presentation.create({slideSize:{width:1280,height:720}});
const slides=[];
const C={bg:'#F7F6F2',navy:'#14263C',teal:'#24797B',light:'#B8D7D3',orange:'#B67545',muted:'#526273',white:'#FFFFFF',panel:'#EAEFEB',sand:'#F1E5D8'};
const FONT='Arial', CODE='Consolas';
function txt(s,v,x,y,w,h,size=28,color=C.navy,bold=false,font=FONT,name=''){
  const q=s.shapes.add({geometry:'textbox',name:name||`t-${x}-${y}`,position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
  q.text=v;q.text.style={typeface:font,fontSize:size,color,bold,autoFit:'none',wrap:'word'};return q;
}
function box(s,x,y,w,h,fill=C.panel,name=''){return s.shapes.add({geometry:'rect',name:name||`b-${x}-${y}`,position:{left:x,top:y,width:w,height:h},fill,line:{fill:'none',width:0}});}
function rule(s,x1,y1,x2,y2,color=C.light,width=3){s.shapes.add({geometry:'line',position:{left:x1,top:y1,width:x2-x1,height:y2-y1},fill:'none',line:{fill:color,width}});}
function base(title,n,notes){const s=ppt.slides.add();slides.push(s);s.background.fill=C.bg;txt(s,title,70,42,1110,78,42,C.navy,true);txt(s,String(n).padStart(2,'0'),1162,662,55,28,18,C.muted);s.speakerNotes.textFrame.setText(notes);return s;}
function pill(s,v,x,y,w,fill=C.teal){box(s,x,y,w,39,fill);txt(s,v,x+12,y+7,w-24,26,18,C.white,true);}

// 1. Abertura
{
 const s=ppt.slides.add();slides.push(s);s.background.fill=C.navy;
 txt(s,'SDD, Atena e ADD',76,172,1080,100,69,C.white,true);
 txt(s,'Do pedido à evidência em um projeto local',80,292,1085,86,33,'#D9E5E5');
 rule(s,80,500,1110,500,'#5F9FA0',4);
 txt(s,'Uma demonstração preparada • 10 slides • 14min45s',80,548,1080,55,23,'#C7D9D9');
 s.speakerNotes.textFrame.setText(`Tempo sugerido: 0:30.\n\nVamos acompanhar um pedido pequeno: acrescentar um resumo de status a um miniprojeto. A pergunta do vídeo é como sair da ideia e chegar a uma mudança que possamos conferir. Primeiro vou explicar Spec Driven Development; depois, o papel da Atena e dos arquivos locais do ADD. O exemplo foi preparado para esta gravação.\n\nFontes: storyboard DRAFT revisão 2; ADD.md.`);
}

// 2. SDD
{
 const s=base('Spec Driven Development',2,`Tempo sugerido: 1:15.\n\nSpec Driven Development, ou SDD, organiza o trabalho a partir de uma especificação clara. A spec descreve o resultado desejado, o contexto, os limites e critérios observáveis. Só depois o plano decide como construir. As tarefas tornam esse plano executável; implementação e verificação confrontam o resultado com os critérios. Isso reduz decisões implícitas e torna o trabalho revisável. Não significa que uma spec garante qualidade sozinha. O GitHub Spec Kit é uma referência de ferramenta e fluxo de SDD, mas não é uma dependência da Atena nem define as regras do ADD.\n\nFontes: https://github.com/github/spec-kit/blob/main/docs/concepts/sdd.md; https://github.github.com/spec-kit/reference/agentic-sdd.html.`);
 const a=[['Intenção','o quê e por quê'],['Spec','critérios'],['Plano','como fazer'],['Mudança','executar'],['Evidência','conferir']];
 a.forEach((r,i)=>{const x=69+i*242;txt(s,r[0],x,224,218,52,29,i===1?C.orange:C.teal,true);txt(s,r[1],x,298,218,70,23,C.navy);if(i<4)rule(s,x+189,255,x+231,255,C.light,5);});
 txt(s,'A spec torna a intenção revisável antes da implementação.',75,482,1080,100,30,C.navy,true);
 txt(s,'Conceito geral; Spec Kit é uma implementação possível.',75,597,1080,45,22,C.muted);
}

// 3. ADD
{
 const s=base('O que o ADD acrescenta',3,`Tempo sugerido: 1:15.\n\nADD significa Atena Driven Development. É um método local, guiado pela pessoa dona do projeto. Atena consulta o que existe, propõe a menor mudança suficiente e conduz o trabalho dentro de um escopo aprovado. O vault conserva intenção durável; specs descrevem mudanças; evidência mostra o que realmente foi conferido. Há dois caminhos: ao dizer “Atena, ...”, você inicia Guided ADD com spec e plano antes da execução planejada. Um pedido imperativo direto pode seguir para trabalho local comum, seguido de uma reconciliação post-hoc fiel ao ocorrido. Os gates de ações materiais continuam nos dois caminhos. Hoje seguiremos o caminho guiado como narrativa didática.\n\nFontes: ADD.md; INTERACTION.md; WORKFLOW.md; AUTONOMY.md.`);
 const rows=[['Memória local','vault com intenção e fontes'],['Autoridade humana','decisões e checkpoints'],['Prova e continuidade','evidence e reconciliação']];
 rows.forEach((r,i)=>{const y=194+i*119;txt(s,r[0],78,y,352,53,30,C.teal,true);txt(s,r[1],461,y,678,65,28,C.navy);if(i<2)rule(s,76,y+86,1148,y+86,C.light,2);});
 pill(s,'Guided ADD: “Atena, ...”',77,571,467,C.teal);
 pill(s,'Direct Execution: pedido direto',582,571,563,C.orange);
}

// 4. Vaults
{
 const s=base('Vaults: a memória do projeto',4,`Tempo sugerido: 2:00.\n\nDentro de .atena, o vault tem três áreas com autoridades diferentes. canon guarda intenção aprovada, com ID, revisão e fontes; neste repositório há decisões reais DEC-001 e DEC-002. drafts guarda propostas, como o storyboard desta apresentação: ele está autorizado para produzir o vídeo, mas continua DRAFT. research guarda fontes, hipóteses e limites; uma pesquisa não vira regra sozinha. Uma promoção para CANON exige aprovação explícita do conteúdo e da revisão. Ao redor do vault, add.yaml configura o método; specs define mudanças; evidence guarda verificações; state/plan.yaml marca a retomada; generated recebe saídas derivadas. AGENTS.md, fora de .atena, carrega instruções locais. Mostrar rapidamente os diretórios reais do repositório e voltar ao slide.\n\nFontes: ADD.md; CONTRACT.md; POLICIES.md; .atena/vault/canon/DEC-001-game-guidance.md; .atena/vault/canon/DEC-002-visible-plan-and-visual-readiness.md; .atena/vault/drafts/apresentacao-sdd-add-youtube.md; .atena/vault/research/game-animation-sources-2026-10-07.md.`);
 const cols=[['CANON','Intenção aprovada','DEC-001 / DEC-002',C.teal],['DRAFTS','Propostas em revisão','Storyboard r2',C.orange],['RESEARCH','Fontes e hipóteses','Pesquisa documentada',C.navy]];
 cols.forEach((r,i)=>{const x=70+i*398;box(s,x,192,360,274,i===1?C.sand:C.panel);txt(s,r[0],x+22,213,325,48,32,r[3],true);txt(s,r[1],x+22,278,323,74,26,C.navy);txt(s,r[2],x+22,392,323,43,21,C.muted,false,CODE);});
 txt(s,'.atena/',76,524,260,45,29,C.navy,true,CODE);
 txt(s,'add.yaml  •  specs/  •  evidence/  •  generated/  •  state/plan.yaml',287,524,900,85,22,C.muted,false,CODE);
}

// 5. Graph
{
 const s=base('Graph: relações derivadas',5,`Tempo sugerido: 1:15.\n\nUm graph ajuda a enxergar relações entre registros com IDs estáveis. Aqui há uma relação real: DEC-002 declara vínculo com DEC-001 no seu campo relations. O desenho na tela representa esse vínculo; ele não é um arquivo exportado. A política do projeto prevê nós e ligações derivados de IDs e relações aprovados, para navegar dependências e detectar links problemáticos. Uma relação sugerida pela IA não vira CANON automaticamente. A configuração aponta para .atena/generated/graph.production.json, mas esse arquivo ainda não existe neste projeto e não encontramos um gerador de produção. Portanto, vamos mostrar o uso previsto e o vínculo existente sem afirmar que um graph operacional já foi produzido.\n\nFontes: .atena/vault/canon/DEC-002-visible-plan-and-visual-readiness.md; .atena/add.yaml; POLICIES.md; .atena/evidence/SPEC-007-sdd-add-youtube-presentation/vault-graph-discovery.md.`);
 box(s,83,223,399,169,C.panel);box(s,796,223,399,169,C.panel);
 txt(s,'DEC-002',117,250,328,58,36,C.teal,true,CODE);txt(s,'Prontidão e progresso',117,323,330,48,23,C.navy);
 txt(s,'DEC-001',828,250,320,58,36,C.teal,true,CODE);txt(s,'Trilha guiada de jogos',828,323,330,48,23,C.navy);
 rule(s,497,303,781,303,C.orange,6);txt(s,'relations',576,248,139,45,22,C.orange,true,CODE);
 txt(s,'Vínculo real nos registros; diagrama ilustrativo.',87,455,1080,49,27,C.navy,true);
 box(s,82,536,1111,77,C.sand);txt(s,'Saída configurada: generated/graph.production.json  •  arquivo ainda ausente',102,553,1066,46,22,C.muted,false,CODE);
}

// 6. Pedido e spec
{
 const s=base('O pedido vira uma spec',6,`Tempo sugerido: 1:45. Demonstração preparada.\n\nO pedido recomendado nomeia resultado, contexto e definição de pronto: “Atena, acrescente um resumo de status a este miniprojeto. Ele deve dizer onde fica .atena e explicar os dois modos. Não crie automação nem publique. Considere pronto quando esses fatos forem conferidos.” No projeto de demonstração, abra vault/drafts/REQ-001-resumo-de-status.md e specs/SPEC-001-status-summary/spec.md. A spec explicita objetivo, escopo, não objetivos e critérios. BLOCKING precisa de decisão antes da aprovação; RESOLVABLE recebe um default fundamentado; DEFERRED fica visível fora do escopo. Esta spec interna é DRAFT: o material foi produzido sob o PLAN-007 do projeto principal, sem fingir aprovação independente. O checkpoint que mostraremos é didático.\n\nArquivos: presentations/demo-add-status/.atena/vault/drafts/REQ-001-resumo-de-status.md; presentations/demo-add-status/.atena/specs/SPEC-001-status-summary/spec.md. Fontes de regra: INTERACTION.md; CONTRACT.md.`);
 pill(s,'DEMONSTRAÇÃO PREPARADA',78,151,330,C.orange);
 box(s,74,223,541,331,C.panel);
 txt(s,'“Atena, acrescente um\nresumo de status...”',101,249,484,134,32,C.navy,true);
 txt(s,'Resultado + limites + definição de pronto',101,435,490,80,23,C.muted);
 txt(s,'spec.md',673,226,500,55,34,C.teal,true,CODE);
 const r=['Objetivo e escopo','Não objetivos','Critérios observáveis','Gaps: BLOCKING / RESOLVABLE / DEFERRED'];
 r.forEach((v,i)=>txt(s,v,679,296+i*67,504,57,24,C.navy));
 txt(s,'DRAFT no miniprojeto • autorizado pelo PLAN-007 principal',77,598,1096,51,21,C.muted);
}

// 7. Plano e checkpoint
{
 const s=base('Plano e checkpoint',7,`Tempo sugerido: 1:40. Demonstração preparada.\n\nAbra o plan.md do miniprojeto. Ele divide o pedido em três etapas: olhar o estado anterior, criar o arquivo e conferir o resultado. A pessoa escolhe aprovação por plano, lote ou etapa para o escopo planejado. state/plan.yaml manteria plano, etapa atual, próxima e checkpoint enquanto um plano real estivesse ativo. Aqui o plano interno está DRAFT e unconfigured. Não vou chamá-lo de aprovado: a autorização real foi para preparar a demonstração no PLAN-007 do repositório principal. Em um projeto real, o usuário aprovaria o plano específico antes dessa execução guiada. Esse momento do fluxo é representado no slide, não falsificado nos arquivos. Mudanças em canon, dependências, segurança, dados sensíveis ou publicação têm gates independentes.\n\nArquivos: presentations/demo-add-status/.atena/specs/SPEC-001-status-summary/plan.md; presentations/demo-add-status/.atena/state/plan.yaml; .atena/specs/SPEC-007-sdd-add-youtube-presentation/plan.md. Fontes: INTERACTION.md; AUTONOMY.md; WORKFLOW.md.`);
 pill(s,'DEMONSTRAÇÃO PREPARADA',78,151,330,C.orange);
 const a=[['1','Conferir antes'],['2','Criar resumo'],['3','Validar e registrar']];
 a.forEach((r,i)=>{const x=77+i*399;txt(s,r[0],x,252,64,60,42,C.teal,true);txt(s,r[1],x+75,258,290,105,27,C.navy,true);if(i<2)rule(s,x+314,291,x+379,291,C.light,5);});
 box(s,80,423,1113,112,C.panel);txt(s,'Checkpoint: por plano • por lote • por etapa',103,445,1050,70,29,C.navy,true);
 txt(s,'Neste miniprojeto: checkpoint didático, sem aprovação própria registrada.',81,584,1098,50,23,C.muted);
}

// 8. Evidência
{
 const s=base('Mudança, teste e evidência',8,`Tempo sugerido: 2:00. Demonstração preparada.\n\nAbra before.md: o resumo não existia quando o miniprojeto e seu contrato foram preparados. Abra PROJECT-STATUS.md: ele agora informa .atena, Guided ADD e Direct Execution. Abra evidence/SPEC-001-status-summary/result.md. O primeiro check encontrou que os nomes literais dos modos faltavam; o arquivo foi corrigido e a nova leitura passou. Também foi validado o estado ADD como idle e conferidos os links locais. Isso é um bom exemplo de por que evidência importa: um check pode revelar um erro pequeno antes da entrega. acceptance.md mostra os critérios documentais como pass, mas esses checks não provam compreensão do público nem aprovação própria do plano interno. A reconciliação registra o que mudou e o que continua pendente.\n\nArquivos: presentations/demo-add-status/.atena/evidence/SPEC-001-status-summary/before.md; presentations/demo-add-status/PROJECT-STATUS.md; presentations/demo-add-status/.atena/evidence/SPEC-001-status-summary/result.md; presentations/demo-add-status/.atena/specs/SPEC-001-status-summary/acceptance.md.`);
 pill(s,'DEMONSTRAÇÃO PREPARADA',78,151,330,C.orange);
 const a=[['ANTES','arquivo ausente'],['DEPOIS','resumo criado'],['CHECK','campos conferidos'],['EVIDÊNCIA','resultado registrado']];
 a.forEach((r,i)=>{const x=77+i*299;txt(s,r[0],x,256,273,50,27,C.teal,true);txt(s,r[1],x,327,265,100,24,C.navy);if(i<3)rule(s,x+245,290,x+283,290,C.light,4);});
 box(s,76,478,1095,115,C.panel);txt(s,'Um check encontrou um termo ausente; a correção foi verificada.',99,497,1042,90,26,C.navy,true);
}

// 9. Best practices
{
 const s=base('Cinco práticas para usar Atena',9,`Tempo sugerido: 2:20.\n\nPrimeiro, comece pelo resultado, não por uma ferramenta: “quero um resumo que responda estas perguntas”. Segundo, entregue contexto e restrições: aponte os arquivos relevantes e diga o que não deve mudar. Terceiro, defina critérios observáveis, como o texto que precisa aparecer e a verificação que confirma. Quarto, reveja decisões e checkpoints: um draft não vira CANON por aparecer em um slide, e aprovação de plano vale para um escopo/revisão. Quinto, leia a evidência antes de chamar algo de pronto; um teste prova apenas o que mediu. Prefira pedidos pequenos e iteráveis. Se já tiver decisões tomadas, informe-as; se houver dúvidas, peça análise antes de compromisso.\n\nExemplo de prompt: “Atena, acrescente um resumo de status. Use .atena como fonte, não crie automação nem publique. Considere pronto quando o arquivo existir e citar os dois modos; mostre a evidência.”\n\nFontes: INTERACTION.md (práticas recomendadas); ADD.md; AUTONOMY.md; miniprojeto de demonstração.`);
 const rows=[['1','Diga o resultado'],['2','Dê contexto e limites'],['3','Defina o que é pronto'],['4','Revise decisões e checkpoints'],['5','Leia a evidência']];
 rows.forEach((r,i)=>{const y=170+i*86;txt(s,r[0],78,y,70,60,33,i===0?C.orange:C.teal,true);txt(s,r[1],158,y,1000,67,28,C.navy,true);if(i<4)rule(s,77,y+68,1155,y+68,C.light,2);});
}

// 10. Fecho
{
 const s=base('Repita o ciclo',10,`Tempo sugerido: 0:45.\n\nSDD ajuda a transformar uma intenção em uma spec revisável antes de implementar. ADD usa esse caminho guiado com memória local, autoridade humana, plano ativo e evidência; também permite um caminho direto com reconciliação honesta depois. O vault guarda o que foi aprovado e o que ainda é proposta. As relações podem alimentar um graph derivado, mas o estado real do projeto precisa ser conferido. Para começar, escolha uma mudança pequena, diga o que conta como pronto e peça que a Atena mostre o resultado junto da evidência. A gravação, edição e publicação do vídeo são etapas posteriores da pessoa autora.\n\nFontes: ADD.md; INTERACTION.md; POLICIES.md; storyboard DRAFT revisão 2.`);
 const a=[['Pedido claro','resultado e limites'],['Mudança delimitada','plano e execução'],['Prova verificável','critério e evidência']];
 a.forEach((r,i)=>{const x=76+i*399;txt(s,r[0],x,223,354,82,32,i===2?C.orange:C.teal,true);txt(s,r[1],x,320,349,72,25,C.navy);if(i<2)rule(s,x+336,257,x+383,257,C.light,5);});
 txt(s,'Comece com uma mudança pequena.',78,520,1090,79,37,C.navy,true);
}

if(slides.length!==10)throw new Error(`Expected 10 slides; found ${slides.length}`);
await (await PresentationFile.exportPptx(ppt)).save(candidatePath);
for(let i=0;i<slides.length;i++){
 const slide=slides[i];const png=await ppt.export({slide,format:'png',scale:1});
 await fs.writeFile(path.join(buildDir,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
 const layout=await slide.export({format:'layout'});
 await fs.writeFile(path.join(buildDir,`slide-${String(i+1).padStart(2,'0')}.layout.json`),await layout.text());
}
const result=await finalizePresentation({
 explicitTotalSlideCount:10,requiredNativeTableOwnerSlides:[],requiredNativeChartOwnerSlides:[],
 workspaceDir:root,candidatePath,finalPath,
 pythonExecutable:path.join(runtime,'python/python.exe'),
 integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),
 layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),
 layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
 fontPolicy:{basis:'design',families:[FONT,CODE]},verifyArtifactToolImport:true,
 receiptPath:path.join(buildDir,'validation.json')
});
console.log(JSON.stringify({candidatePath,finalPath,result},null,2));
