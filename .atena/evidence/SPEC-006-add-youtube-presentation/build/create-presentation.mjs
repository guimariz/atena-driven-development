import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const workspaceDir = process.cwd();
const buildDir = path.join(workspaceDir, '.atena/evidence/SPEC-006-add-youtube-presentation/build');
const outputDir = path.join(workspaceDir, 'presentations');
const skillDir = 'C:/Users/gui-m/.codex/plugins/cache/openai-primary-runtime/presentations/26.915.20218/skills/presentations';
const runtimeDir = 'C:/Users/gui-m/.cache/codex-runtimes/codex-primary-runtime/dependencies';
const finalPath = path.join(outputDir, 'atena-add-youtube.pptx');
const candidatePath = path.join(buildDir, 'candidate.pptx');
process.env.RUNTIME_NODE = path.join(runtimeDir, 'node/bin/node.exe');
process.env.RUNTIME_NODE_MODULES = path.join(runtimeDir, 'node/node_modules');
process.env.RUNTIME_BIN_DIR = path.join(runtimeDir, 'bin/override');
process.env.RUNTIME_PYTHON = path.join(runtimeDir, 'python/python.exe');

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });

const { Presentation, PresentationFile } = await import(pathToFileURL(path.join(runtimeDir, 'node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const { finalizePresentation } = await import(pathToFileURL(path.join(skillDir, 'container_tools/artifact_tool_utils.mjs')).href);
const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
const authoredSlides = [];

const C = {
  bg: '#F7F6F2', navy: '#14263C', teal: '#24797B', lightTeal: '#B8D7D3',
  orange: '#B67545', lightOrange: '#E7D1BF', muted: '#526273', white: '#FFFFFF',
};
const FONT = 'Arial';
const CODE = 'Consolas';

function text(slide, value, left, top, width, height, size=28, color=C.navy, bold=false, font=FONT, name='') {
  const sh = slide.shapes.add({
    geometry: 'textbox', name: name || `text-${left}-${top}`,
    position: { left, top, width, height }, fill: 'none', line: { fill: 'none', width: 0 },
  });
  sh.text = value;
  sh.text.style = { typeface: font, fontSize: size, color, bold, autoFit: 'none', wrap: 'word' };
  return sh;
}

function rect(slide, left, top, width, height, fill, line='none', name='') {
  return slide.shapes.add({
    geometry: 'rect', name: name || `block-${left}-${top}`,
    position: { left, top, width, height },
    fill, line: { fill: line, width: line==='none' ? 0 : 2 },
  });
}

function line(slide, x1, y1, x2, y2, color=C.teal, width=3) {
  slide.shapes.add({
    geometry: 'line', position: { left:x1, top:y1, width:x2-x1, height:y2-y1 },
    fill: 'none', line: { fill: color, width },
  });
}

function base(title, number, notes) {
  const slide = presentation.slides.add();
  authoredSlides.push(slide);
  slide.background.fill = C.bg;
  text(slide, title, 72, 44, 1110, 82, 42, C.navy, true, FONT, `title-${number}`);
  text(slide, String(number).padStart(2,'0'), 1165, 658, 45, 30, 17, C.muted, false, FONT, `page-${number}`);
  slide.speakerNotes.textFrame.setText(notes);
  return slide;
}

// 1. Opening
{
  const s = presentation.slides.add();
  authoredSlides.push(s);
  s.background.fill = C.navy;
  text(s, 'Atena e ADD', 78, 172, 1060, 100, 70, C.white, true, FONT, 'cover-title');
  text(s, 'Como um pedido vira trabalho verificável', 82, 288, 1030, 80, 34, '#D9E5E5', false, FONT, 'cover-subtitle');
  text(s, 'Um exemplo do pedido à evidência', 82, 590, 900, 40, 22, '#C1D2D2');
  s.speakerNotes.textFrame.setText(`Tempo sugerido: 0:45.\n\nImagine um pedido pequeno: acrescentar um resumo de status ao projeto. O arquivo final responde ao pedido, mas também queremos saber quais decisões ele respeitou, como foi verificado e onde isso ficará registrado para a próxima conversa. Neste vídeo, acompanharemos esse mesmo pedido pelo ADD. Atena organiza o caminho, e os arquivos do projeto preservam o que foi decidido e observado.\n\nFontes locais: ADD.md; .atena/vault/drafts/roteiro-explicativo-add.md, bloco 1.`);
}

// 2. The durable path
{
  const s = base('Do pedido à memória do projeto', 2, `Tempo sugerido: 1:30.\n\nADD significa Atena Driven Development. É um método local de trabalho sob direção humana. A solicitação vira uma mudança delimitada, a execução produz observações, e os arquivos guardam a intenção e a evidência. O projeto continua compreensível quando a conversa termina. Nosso exemplo é um resumo de status. Vamos perguntar: qual resultado queremos, o que já existe e o que prova que ficou certo? Essa sequência será retomada em cada parte da apresentação.\n\nFontes locais: ADD.md; README.md; roteiro, blocos 1 e 2.`);
  const stages=[['Pedido','Resumo de status'],['Mudança','Escopo delimitado'],['Evidência','Critérios conferidos'],['Memória','Próxima decisão']];
  stages.forEach((a,i)=>{
    const x=72+i*300;
    text(s,a[0],x,245,260,54,32,i===0?C.orange:C.teal,true,FONT,`stage-${i}`);
    text(s,a[1],x,315,260,72,24,C.navy,false,FONT,`stage-detail-${i}`);
    if(i<3)line(s,x+239,282,x+287,282,C.lightTeal,5);
  });
  text(s,'Arquivos locais preservam o contexto para a próxima decisão.',72,516,1070,80,27,C.muted);
}

// 3. Roles
{
  const s=base('Quem decide e quem executa',3,`Tempo sugerido: 1:30.\n\nA pessoa dona do projeto define o objetivo e aprova mudanças materiais. Atena consulta o projeto, recomenda um caminho, prepara a execução autorizada e acompanha o resultado. Ferramentas leem, editam ou verificam elementos específicos. Uma skill descreve um procedimento repetível, e um agente pode receber uma entrega delimitada quando houver necessidade e autorização. Uma saída de ferramenta ou um documento entregue mantém sua própria proveniência.\n\nFontes locais: ADD.md; INTERACTION.md; AUTONOMY.md; roteiro, bloco 2.`);
  const roles=[['Você','Define a intenção\ne aprova decisões materiais'],['Atena','Estrutura o trabalho\ne acompanha o resultado'],['Ferramentas','Executam operações\ne verificações delimitadas']];
  roles.forEach((a,i)=>{
    const x=72+i*391;
    text(s,a[0],x,216,330,58,34,i===1?C.teal:C.navy,true);
    text(s,a[1],x,303,338,150,27,C.navy);
    if(i<2)line(s,x+344,248,x+377,248,C.lightTeal,5);
  });
  text(s,'O resultado volta ao usuário com evidência.',72,530,1090,64,29,C.muted);
}

// 4. Workspace
{
  const s=base('A estrutura local do ADD',4,`Tempo sugerido: 2:30.\n\nEste repositório mantém o método. Cada projeto que o adota usa uma pasta .atena como workspace local. add.yaml configura a aplicação do método. No vault, canon guarda intenção aprovada, drafts guarda propostas, e research guarda investigações. specs descreve mudanças delimitadas. evidence registra o que foi observado. generated reúne artefatos derivados. state/plan.yaml guarda o ponto de retorno da execução. AGENTS.md fica na raiz e fornece as instruções que o assistente precisa carregar. O contrato é portátil; Git pode replicar esses arquivos. A pasta automation é opcional quando alguma skill ou agente é adotado.\n\nMostrar na gravação: abrir example-project/.atena/ e localizar essas pastas.\nFontes locais: CONTRACT.md; README.md; example-project/; roteiro, blocos 3 a 5.`);
  text(s,'.atena/\n  add.yaml\n  vault/\n    canon/\n    drafts/\n    research/\n  specs/\n  evidence/\n  generated/\n  state/plan.yaml',76,166,490,443,30,C.navy,false,CODE,'workspace-tree');
  text(s,'Intenção aprovada',670,207,500,48,30,C.teal,true);
  text(s,'Mudanças delimitadas',670,292,500,48,30,C.teal,true);
  text(s,'Observações e retomada',670,377,500,48,30,C.teal,true);
  text(s,'AGENTS.md carrega as instruções do projeto.',670,508,490,90,25,C.muted);
}

// 5. Maturity
{
  const s=base('Quando uma ideia vira CANON',5,`Tempo sugerido: 2:00.\n\nUma ideia pode nascer em drafts e continuar experimental. Research reúne fontes e hipóteses para apoiar decisões. CANON exige aprovação explícita do conteúdo e da revisão, além de ID estável e registro de revisão. O exemplo à direita vem de example-project: DEC-001 aprovou .atena como workspace. Essa aprovação de intenção é distinta de implementar e verificar uma mudança. Permitir um teste com um draft mantém esse conteúdo em DRAFT. A aprovação do plano que criou esta apresentação também não promove slides nem roteiro a CANON.\n\nFonte do trecho real: example-project/.atena/vault/canon/DEC-001-local-add-workspace.md. Outras fontes: ADD.md; POLICIES.md; roteiro, bloco 6.`);
  text(s,'DRAFT',76,226,360,57,42,C.orange,true);
  text(s,'Proposta ou experiência\nem revisão',76,288,420,105,28,C.navy);
  text(s,'CANON',76,425,360,57,42,C.teal,true);
  text(s,'Intenção aprovada\ncom ID e revisão',76,488,430,105,28,C.navy);
  text(s,'Trecho real: DEC-001',622,181,530,42,24,C.muted,true);
  rect(s,610,232,568,319,'#EBEFEB');
  text(s,'id: "DEC-001"\ntype: "decision"\nstatus: "approved"\n\nThe project uses `.atena/`\nas its only canonical\nADD workspace.',636,252,515,290,22,C.navy,false,CODE,'canon-excerpt');
}

// 6. The two modes
{
  const s=base('Dois caminhos para o mesmo pedido',6,`Tempo sugerido: 2:00.\n\nQuando a pessoa diz “Atena, acrescente um resumo de status”, o endereço explícito ativa Guided ADD: análise, spec, plano, lacunas e aprovação precedem a execução planejada. No pedido direto “Acrescente um resumo de status”, o trabalho local comum pode seguir logo dentro do escopo. Depois, Atena oferece uma reconciliação fiel ao que ocorreu. No projeto de exemplo, SPEC-001 registra origin planned e implementation_preceded_spec false; SPEC-002 registra origin post-hoc e implementation_preceded_spec true. Esses registros são históricos de example-project, não novas execuções nesta apresentação. Os gates materiais continuam válidos nos dois caminhos.\n\nFontes dos trechos reais: example-project/.atena/specs/SPEC-001-guided-status-summary/spec.md; example-project/.atena/specs/SPEC-002-post-hoc-project-note/spec.md. Outras fontes: INTERACTION.md; WORKFLOW.md; roteiro, bloco 7.`);
  text(s,'Guided ADD',75,201,460,60,36,C.teal,true);
  text(s,'“Atena, acrescente...”',75,271,475,70,30,C.navy);
  text(s,'Spec e plano antes\nda implementação',75,357,478,110,28,C.navy);
  text(s,'origin: planned\nimplementation_preceded_spec: false',75,507,485,95,20,C.muted,false,CODE);
  line(s,624,210,624,602,C.lightTeal,3);
  text(s,'Direct Execution',682,201,500,60,36,C.orange,true);
  text(s,'“Acrescente...”',682,271,475,70,30,C.navy);
  text(s,'Execução local seguida\nde reconciliação proposta',682,357,480,110,28,C.navy);
  text(s,'origin: post-hoc\nimplementation_preceded_spec: true',682,507,485,95,20,C.muted,false,CODE);
}

// 7. Four files and gaps
{
  const s=base('A mudança planejada em quatro arquivos',7,`Tempo sugerido: 2:30.\n\nA spec é uma mudança com fronteiras explícitas. spec.md explica objetivo, escopo, decisões e critérios. plan.md mostra etapas, verificações, limites e recuperação. tasks.md acompanha trabalho concreto. acceptance.md confronta os critérios com evidência. Se faltar algo que impeça execução correta, a lacuna é BLOCKING e precisa ser resolvida. RESOLVABLE recebe um default fundamentado; DEFERRED fica fora desta entrega e visível. Com o plano pronto, a pessoa escolhe aprovação por plano, lote ou etapa. O checkpoint identifica escopo e revisão. No exemplo, o critério verifica se PROJECT-STATUS.md informa o workspace correto e nomeia os dois modos.\n\nFontes locais: CONTRACT.md; INTERACTION.md; templates/spec/; example-project/.atena/specs/SPEC-001-guided-status-summary/; roteiro, blocos 8 e 9.`);
  const rows=[['spec.md','O que muda e como reconhecer o resultado'],['plan.md','Etapas, checks, limites e recuperação'],['tasks.md','Trabalho concreto e evidência'],['acceptance.md','Critérios confrontados com o resultado']];
  rows.forEach((r,i)=>{
    const y=189+i*84;
    text(s,r[0],77,y,276,54,29,C.teal,true,CODE);
    text(s,r[1],366,y,788,56,26,C.navy);
    if(i<3)line(s,76,y+69,1154,y+69,C.lightTeal,2);
  });
  text(s,'BLOCKING: resolver     RESOLVABLE: decidir default     DEFERRED: deixar fora',78,558,1120,68,23,C.muted);
}

// 8. State and gates
{
  const s=base('Execução com ponto de retorno',8,`Tempo sugerido: 2:00.\n\nApós o checkpoint aprovado, state/plan.yaml registra qual plano está ativo, a etapa atual e a próxima. O cursor permite retomar sem confiar apenas na conversa. Um pedido novo durante o plano pode estar dentro dele, desviar temporariamente, ou exigir revisão do próprio plano. No desvio, Atena pode salvar o cursor e voltar depois, ou registrar um pedido pendente. A aprovação por plano, lote ou etapa controla o escopo ordinário. Mudanças materiais em canon, segurança, dados, dependências novas e publicação têm gates próprios.\n\nFontes locais: WORKFLOW.md; AUTONOMY.md; CONTRACT.md; roteiro, blocos 10 e 11.`);
  const steps=[['S-001','Preparar'],['S-002','Executar'],['S-003','Verificar']];
  steps.forEach((r,i)=>{
    const x=85+i*380;
    text(s,r[0],x,205,300,50,36,C.teal,true,CODE);
    text(s,r[1],x,271,300,50,28,C.navy);
    if(i<2)line(s,x+276,237,x+359,237,C.lightTeal,5);
  });
  text(s,'state/plan.yaml',85,410,440,52,29,C.navy,true,CODE);
  text(s,'Plano ativo, etapa atual, próxima etapa e checkpoint',85,470,1090,60,26,C.muted);
  text(s,'Ações materiais exigem aprovação própria.',85,561,1050,60,28,C.orange,true);
}

// 9. Evidence and live file demo
{
  const s=base('Evidência e reconciliação',9,`Tempo sugerido: 3:15, incluindo cerca de 2:00 de demonstração.\n\nMostre primeiro a ligação entre critério, verificação, evidência e reconciliação. Em seguida, mude para os arquivos reais de example-project/.atena/. Abra vault/canon/DEC-001-local-add-workspace.md, specs/SPEC-001-guided-status-summary/spec.md e evidence/SPEC-001-guided-status-summary/result.md. Em acceptance.md, AC-1 e AC-2 aparecem como pass. O resultado informa que PROJECT-STATUS.md contém .atena/, Guided ADD e Direct Execution. Essa é evidência documental do exemplo; ela prova essas afirmações específicas. Ao terminar, volte ao slide e explique que reconciliação atualiza fatos operacionais permitidos e mantém propostas ou exceções visíveis. Grafos e índices derivados refletem os registros aprovados; inferências não ganham autoridade automaticamente.\n\nFontes dos trechos reais: example-project/.atena/specs/SPEC-001-guided-status-summary/acceptance.md; example-project/.atena/evidence/SPEC-001-guided-status-summary/result.md. Outras fontes: WORKFLOW.md; POLICIES.md; roteiro, bloco 12.`);
  text(s,'Critério',78,196,260,54,32,C.teal,true);
  text(s,'Verificação',364,196,260,54,32,C.teal,true);
  text(s,'Evidência',658,196,260,54,32,C.teal,true);
  text(s,'Reconciliação',949,196,295,54,32,C.teal,true);
  line(s,287,224,347,224,C.lightTeal,4);line(s,576,224,641,224,C.lightTeal,4);line(s,869,224,933,224,C.lightTeal,4);
  text(s,'Trecho real: SPEC-001',80,316,540,38,23,C.muted,true);
  rect(s,76,360,1078,212,'#EBEFEB');
  text(s,'AC-1 | Workspace path is `.atena/` | pass\nAC-2 | Both interaction modes are named | pass\n\nPROJECT-STATUS.md contains `.atena/`,\n`Guided ADD`, and `Direct Execution`.',105,383,1015,176,22,C.navy,false,CODE,'evidence-excerpt');
  text(s,'O que prova que o pedido foi atendido?',78,597,1070,50,30,C.orange,true);
}

// 10. Applications and next step
{
  const s=base('Aplicações e primeiro uso',10,`Tempo sugerido: 1:45.\n\nADD pode acompanhar software, pesquisa, conteúdo ou jogos. No caminho opcional de jogos, Atena estrutura visão, design, escopo e bíblia visual antes de recomendar engine e ferramentas. O protótipo testa uma hipótese; o playtest informa o que observar e depende da experiência humana para avaliar sensação, dificuldade e diversão. Skills e agentes entram conforme necessidades concretas e com limites definidos. Para começar, escolha um pedido pequeno. Localize a intenção, delimite a mudança e pergunte qual evidência permite chamar o resultado de concluído. Na gravação, encerre aqui; a publicação é uma etapa separada que você fará.\n\nFontes locais: GAMES.md; GAME-SPECIALISTS.md; README.md; roteiro, blocos 13 e 14.`);
  text(s,'ADD em projetos diferentes',78,203,1080,57,36,C.teal,true);
  text(s,'Jogos: visão, bíblia visual, protótipo e playtest',78,286,1080,78,29,C.navy);
  text(s,'Skills e agentes entram por necessidade concreta',78,379,1080,78,29,C.navy);
  line(s,78,488,1133,488,C.lightTeal,3);
  text(s,'Comece com um pedido pequeno e uma evidência clara.',78,530,1100,90,32,C.orange,true);
}

if (authoredSlides.length !== 10) throw new Error(`Expected 10 slides, found ${authoredSlides.length}`);
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

for (let i=0;i<authoredSlides.length;i++) {
  const slide=authoredSlides[i];
  const png=await presentation.export({ slide, format:'png', scale:1 });
  await fs.writeFile(path.join(buildDir, `slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await png.arrayBuffer()));
  const layout=await slide.export({ format:'layout' });
  await fs.writeFile(path.join(buildDir, `slide-${String(i+1).padStart(2,'0')}.layout.json`),await layout.text());
}

const result=await finalizePresentation({
  explicitTotalSlideCount:10,
  requiredNativeTableOwnerSlides:[],
  requiredNativeChartOwnerSlides:[],
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable:path.join(runtimeDir,'python/python.exe'),
  integrityValidatorPath:path.join(skillDir,'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath:path.join(skillDir,'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
  fontPolicy:{basis:'design',families:[FONT,CODE]},
  verifyArtifactToolImport:true,
  receiptPath:path.join(buildDir,'validation.json'),
});
console.log(JSON.stringify({candidatePath,finalPath,result},null,2));
