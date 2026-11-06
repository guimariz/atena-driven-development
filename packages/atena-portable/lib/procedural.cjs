'use strict';
// Author-owned ADD adapter. Read data only; never require/import/spawn vendor code.
const fs=require('node:fs'),p=require('node:path'),crypto=require('node:crypto');
const guard=require('./cli.cjs'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const ownData=name=>JSON.parse(fs.readFileSync(p.join(__dirname,'../payload/procedural',name),'utf8'));
const versionText=value=>typeof value==='string'&&/^[a-zA-Z0-9 .^~>=<*|+_-]{1,160}$/.test(value)?value:'non-semver metadata omitted; review locally';
const dependencySummary=deps=>Object.fromEntries(Object.entries(deps||{}).map(([name,value])=>[name,versionText(value)]));
function bytes(file,max=2*1024*1024){guard.noLinks(file);const s=fs.statSync(file);if(!s.isFile()||s.size>max)throw Error('Expected bounded regular data file');return fs.readFileSync(file);}
function data(file){return JSON.parse(bytes(file).toString('utf8').replace(/^\uFEFF/,''));}
function target(root,rel){guard.safeRel(rel);const out=p.join(root,rel);guard.noLinks(out);return out;}
function definition(id){const tool=ownData('tools.json').tools.find(t=>t.id===id);if(!tool)throw Error('Unknown procedural tool ID');return tool;}
function inspect(root,id,archive){
  root=p.resolve(root);guard.noLinks(root);if(!fs.statSync(root).isDirectory())throw Error('Select an existing installation directory explicitly');
  const tool=definition(id),metadata={},observedFiles=[];
  // Fixed metadata allowlist; no recursive scan, module loading, npmrc, environment or credentials.
  for(const name of ['package.json','package-lock.json','BUILD_INFO.json','build_info.json','requirements.txt','pyproject.toml','LICENSE']){
    const f=target(root,name);if(!fs.existsSync(f))continue;const b=bytes(f);observedFiles.push({path:name,bytes:b.length,sha256:sha(b)});
    if(name.endsWith('.json')){
      const j=JSON.parse(b.toString('utf8').replace(/^\uFEFF/,''));
      if(name==='package.json')metadata.package={name:j.name??null,version:j.version??null,engines:{node:versionText(j.engines?.node)},dependencies:dependencySummary(j.dependencies),devDependencies:dependencySummary(j.devDependencies),scriptNames:Object.keys(j.scripts||{})};
      else if(name==='package-lock.json')metadata.lock={lockfileVersion:j.lockfileVersion??null,entries:Object.keys(j.packages||{}).length};
      else metadata.build={name:j.name??null,version:j.version??null,dirty:j.dirty??null,gitCommit:j.gitCommit??null};
    }else if(name==='requirements.txt')metadata.requirements=b.toString('utf8').split(/\r?\n/).filter(l=>l.trim()&&!l.trim().startsWith('#')).map(l=>/^[A-Za-z0-9_.-]+\s*(?:[<>=!~][A-Za-z0-9_.<>=!~,\s-]+)?$/.test(l.trim())?l.trim():'nonstandard requirement omitted; review locally');
  }
  let archiveIdentity=null;
  if(archive){const b=bytes(p.resolve(archive),20*1024*1024);archiveIdentity={sha256:sha(b),bytes:b.length,matchesApprovedAttachment:sha(b)===tool.archiveSha256&&b.length===tool.archiveBytes};if(!archiveIdentity.matchesApprovedAttachment)throw Error('Archive differs from the approved attachment identity');}
  return {action:'static-procedural-inspection',toolId:id,root,sourceAuthority:tool.sourceAuthority||'User attachment; publisher not authenticated',reported:tool,observedMetadata:metadata,observedFiles,archiveIdentity,sourceProvenance:archiveIdentity?'Archive bytes match; extraction/root association must still be verified':'Metadata only; cannot associate this root with the approved archive',runtimeReadiness:'not-executed; dependency/runtime/visual checks pending',execution:'Per-action confirmation required; this adapter has no engine runner',limits:['Presence of metadata is not proof of legitimate installation, publisher authenticity or runtime readiness','No program, recipe, import, install, doctor or lifecycle script was invoked']};
}
function png(b,budget){
  if(b.length<45||!b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error('Invalid PNG signature');
  let at=8,width,height,idat=0,end=false;
  while(at<b.length){if(at+12>b.length)throw Error('Truncated PNG chunk');const n=b.readUInt32BE(at),type=b.toString('ascii',at+4,at+8);if(n>8*1024*1024||at+12+n>b.length)throw Error('PNG chunk outside file');
    if(at===8&&type!=='IHDR')throw Error('PNG requires first IHDR');
    if(type==='IHDR'){if(width!==undefined||n!==13)throw Error('Invalid PNG IHDR');width=b.readUInt32BE(at+8);height=b.readUInt32BE(at+12);if(!width||!height||width>Math.min(budget.maxWidth||budget.maxTextureWidth||2048,2048)||height>Math.min(budget.maxHeight||budget.maxTextureHeight||2048,2048))throw Error('PNG dimensions exceed contract');if(b[at+16]!==8||![2,6].includes(b[at+17]))throw Error('Pilot PNG requires 8-bit RGB/RGBA');}
    if(type==='IDAT')idat+=n;if(type==='IEND'){if(n||at+12!==b.length)throw Error('Invalid PNG end');end=true;}at+=n+12;
  }
  if(!end||!idat)throw Error('Incomplete PNG');return {width,height,scope:'Header/chunk bounds only; CRC/pixel decode/alpha/appearance still need independent checks'};
}
function glb(b,budget){
  if(b.length<20||b.toString('ascii',0,4)!=='glTF'||b.readUInt32LE(4)!==2||b.readUInt32LE(8)!==b.length)throw Error('Invalid GLB v2 container');
  let at=12,j=null,chunks=0;
  while(at<b.length){if(at+8>b.length)throw Error('Truncated GLB chunk');const n=b.readUInt32LE(at),type=b.readUInt32LE(at+4);if(n%4||at+8+n>b.length)throw Error('GLB chunk outside file');if(!chunks&&type!==0x4e4f534a)throw Error('GLB requires first JSON chunk');if(type===0x4e4f534a){if(j)throw Error('Duplicate GLB JSON');j=JSON.parse(b.toString('utf8',at+8,at+8+n).trim());}at+=8+n;chunks++;}
  if(!j||j.asset?.version!=='2.0'||!Array.isArray(j.meshes)||!j.meshes.length)throw Error('GLB requires glTF2 mesh metadata');
  if(j.extensionsRequired?.length)throw Error('Required GLB extensions need separate supported-tool review');
  for(const item of [...(j.buffers||[]),...(j.images||[])])if(item.uri)throw Error('GLB pilot requires embedded buffers/images; no URI dependencies');
  let triangles=0;
  for(const mesh of j.meshes)for(const prim of mesh.primitives||[]){if((prim.mode??4)!==4)throw Error('Pilot primitive must use triangles');const idx=prim.indices??prim.attributes?.POSITION,acc=j.accessors?.[idx];if(!acc||!Number.isSafeInteger(acc.count)||acc.count<0||acc.count%3)throw Error('Invalid primitive count');triangles+=acc.count/3;}
  if(!triangles||triangles>Math.min(budget.maxTriangles||1500,1500))throw Error('Triangle budget exceeded or empty mesh');
  return {triangles,meshes:j.meshes.length,scope:'Container and metadata checks only; approved glTF validator/importer, buffer semantics, axes/scale/UV/normals/appearance pending',pbr:'Complete PBR pipeline not claimed'};
}
function bbmodel(b){const j=JSON.parse(b.toString('utf8'));if(!j.meta||!Array.isArray(j.elements)||!j.elements.length)throw Error('BBModel requires metadata/elements');for(const t of j.textures||[])if(t.source&&!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(t.source))throw Error('BBModel texture source must be embedded PNG; no file/network paths');return {elements:j.elements.length,scope:'JSON structure only; no Blockbench import, expressions, rig/animation or rendering executed'};}
function verify(root,manifestFile){
  root=p.resolve(root);guard.noLinks(root);const m=data(p.resolve(manifestFile));
  if(m.schema!==1||!['2d','3d'].includes(m.kind)||typeof m.assetId!=='string'||!m.assetId||!Number.isSafeInteger(m.revision)||m.revision<1||m.state!=='DRAFT')throw Error('Require DRAFT output contract schema/asset/revision/kind');
  const tool=definition(m.toolId);if(m.toolId!==(m.kind==='2d'?'noct-2d':'noct-3d')||m.sourceArchiveSha256!==tool.archiveSha256)throw Error('Output provenance differs from selected tool identity');
  if(!m.bible?.id||!m.bible.revision||!['DRAFT','CANON'].includes(m.bible.state)||m.bible.state==='DRAFT'&&m.bible.authorizedDraftUse!==true||!m.scene)throw Error('Visual bible/revision/state/authorized draft use and scene required');
  if(!m.identity||!['applicable','N/A'].includes(m.identity.applicability)||m.identity.applicability==='N/A'&&!m.identity.reason||m.identity.applicability==='applicable'&&(!m.identity.reference||!m.identity.revision))throw Error('Entity identity or reasoned N/A required');
  if(m.rights?.outputs!=='cleared'||m.rights?.privacy!=='project-approved'||!m.rights.evidence)throw Error('Output rights/privacy evidence required; engine license does not clear input rights');
  if(!m.provenance?.recipeSha256||!/^[a-f0-9]{64}$/.test(m.provenance.recipeSha256)||!m.provenance.executionEvidence)throw Error('Recipe hash and actual execution-evidence locator required; flags do not authorize execution');
  if(!Array.isArray(m.files)||!m.files.length||m.files.length>12)throw Error('Explicit output files required');
  const allowed={image:'.png',texture:'.png',atlas:'.json',mesh:'.glb',editable:'.bbmodel'},seen=new Set(),files=[],budget=m.budgets||{};
  for(const [key,value]of Object.entries(budget))if(!['maxBytes','maxWidth','maxHeight','maxTextureWidth','maxTextureHeight','maxTriangles','maxFrames'].includes(key)||!Number.isSafeInteger(value)||value<=0)throw Error('Invalid output budget');
  let total=0;
  for(const f of m.files){if(!allowed[f.role]||p.extname(f.path).toLowerCase()!==allowed[f.role]||seen.has(f.path))throw Error('Only unique output PNG/atlas JSON/GLB/BBModel files; never vendor/runtime/recipe code');seen.add(f.path);const full=target(root,f.path),b=bytes(full,m.kind==='2d'?8388608:33554432);total+=b.length;if(sha(b)!==f.sha256)throw Error('Output hash mismatch: '+f.path);let technical;
    if(allowed[f.role]==='.png')technical=png(b,budget);else if(f.role==='mesh')technical=glb(b,budget);else if(f.role==='editable')technical=bbmodel(b);else technical={json:JSON.parse(b.toString('utf8'))};
    files.push({path:f.path,role:f.role,sha256:sha(b),bytes:b.length,mtimeMs:fs.statSync(full).mtimeMs,technical});
  }
  if(total>Math.min(budget.maxBytes||Infinity,m.kind==='2d'?8388608:33554432))throw Error('Output total byte budget exceeded');
  const roles=files.map(f=>f.role);for(const role of m.kind==='2d'?['image','atlas']:['mesh','editable','texture'])if(!roles.includes(role))throw Error('Missing required output role: '+role);
  if(m.kind==='2d')for(const f of files.filter(f=>f.role==='atlas')){
    const a=f.technical.json,image=files.find(i=>i.path===a.image&&i.role==='image');if(a.schema!==1||!image||!Array.isArray(a.frames)||!a.frames.length||a.frames.length>(budget.maxFrames||64))throw Error('Normalized atlas requires image and bounded frames');
    for(const fr of a.frames)if(!['x','y','w','h'].every(k=>Number.isSafeInteger(fr[k]))||fr.x<0||fr.y<0||fr.w<=0||fr.h<=0||fr.x+fr.w>image.technical.width||fr.y+fr.h>image.technical.height)throw Error('Atlas frame outside image');f.technical={frames:a.frames.length,image:a.image};
  }
  const review=m.review||{},blockers=[];if(review.visual!=='approved'||!review.visualEvidence)blockers.push('Actual visual review/evidence pending');if(review.human!=='accepted'||!review.humanEvidence)blockers.push('Human acceptance/evidence pending');if(review.targetTechnical!=='pass'||!review.technicalEvidence)blockers.push('Actual target technical validation/evidence pending');
  const result={action:'procedural-output-contract-review',kind:m.kind,assetId:m.assetId,revision:m.revision,state:'DRAFT',sourceArchiveSha256:m.sourceArchiveSha256,recipeSha256:m.provenance.recipeSha256,contractHash:sha(JSON.stringify(m)),files,totalBytes:total,reviewBlockers:blockers,eligibleForScopedStaging:!blockers.length,limits:['Static metadata checks are not visual acceptance or proof of engine execution','Review fields are supplied evidence locators, not authentication or authority','Only outputs may be staged; no engine/runtime/recipe redistribution']};
  return {...result,previewHash:sha(JSON.stringify(result))};
}
function actionPlan(root,id,pilotId){
  const tool=definition(id),pilot=ownData('pilots.json').pilots.find(p=>p.id===pilotId&&p.toolId===id);if(!pilot)throw Error('Pilot/tool mismatch');root=p.resolve(root);guard.noLinks(root);
  return {action:'procedural-action-plan',state:'PREPARED_NOT_EXECUTABLE',tool,pilot,installationRoot:root,executionPolicy:'Every setup/program/recipe action needs its own explicit confirmation; no runner is provided',actions:id==='noct-2d'?[
    {id:'2D-DEPS',command:'npm.cmd ci --ignore-scripts --offline',cwd:root,source:'Only a hash-verified isolated copy of the approved attachment and its lockfile',dependencies:tool.reportedLockedDependencies,network:'disabled; stop if cache incomplete; downloading requires separate approved sources/versions',effects:['creates node_modules in isolated copy; no lifecycle scripts'],outputs:['node_modules'],status:'PENDING_ACTION_CONFIRMATION_AND_SOURCE_VERIFICATION'},
    {id:'2D-CHROMIUM',command:'node node_modules/playwright/cli.js install chromium',cwd:root,source:'Locked Playwright dependency; verify installed file/version before this action',dependencies:['playwright 1.63.0'],network:'Browser download expected; exact browser revision/endpoints/bytes not yet verified and must be resolved before approval',effects:['downloads browser into task-specific PLAYWRIGHT_BROWSERS_PATH, never global cache'],outputs:['isolated browser cache'],status:'PENDING_ACTION_CONFIRMATION_AND_DOWNLOAD_DETAILS'},
    {id:'2D-PILOT',command:null,cwd:root,source:'Actual 2.5 CLI/recipe static inspection required; do not substitute the older local 1.0.0 commands',dependencies:tool.requirements,network:'disabled for recipe after dependencies are approved',effects:['execute reviewed recipe/export only in isolated work copy'],outputs:['P2D-001 PNG and atlas JSON in a new run directory'],status:'BLOCKED_EXACT_RECIPE_ENTRYPOINT_AND_CONFIRMATION'}
  ]:[
    {id:'3D-VENV',command:'python -m venv .venv',cwd:root,source:'Selected Python >=3.12 executable, exact path/version to be confirmed',dependencies:['existing authorized Python interpreter'],network:'none',effects:['creates task-local .venv; does not execute attachment code'],outputs:['.venv'],status:'PENDING_SETUP_ACTION_CONFIRMATION'},
    {id:'3D-DEPS',command:'.venv\\Scripts\\python.exe -m pip install --no-index --find-links <approved-wheelhouse> -r <statically-verified-requirements-file>',cwd:root,source:'Wheelhouse filenames/hashes/versions and actual requirements path not yet supplied',dependencies:tool.requirements,network:'disabled; no pip network fallback',effects:['installs packages only in isolated venv'],outputs:['venv packages'],status:'BLOCKED_DEPENDENCY_PINNING_PATHS_AND_CONFIRMATION'},
    {id:'3D-CHROMIUM',command:'.venv\\Scripts\\python.exe -m playwright install chromium',cwd:root,source:'Separately approved pinned Playwright Python package',dependencies:['pinned Python playwright version pending'],network:'Browser revision/endpoints/bytes pending; download requires separate action approval',effects:['task-local browser cache with WebGL support to be checked after approval'],outputs:['isolated browser cache'],status:'PENDING_DOWNLOAD_DETAILS_AND_ACTION_CONFIRMATION'},
    {id:'3D-PILOT',command:null,cwd:root,source:'Hash-identified 3D archive named v2, reported 1.0.0 dirty; actual recipe/CLI needs static verification',dependencies:tool.requirements,network:'disabled for recipe; inherited environment must be sanitized by a separately reviewed launcher',effects:['execute reviewed Python recipe only after confirmation; serialize BBModel regeneration; retain prior outputs'],outputs:['P3D-001 GLB, BBModel and PNG in a new run directory'],status:'BLOCKED_EXACT_ENTRYPOINT_RECIPE_AND_CONFIRMATION'},
    {id:'3D-VALIDATE',command:null,cwd:root,source:'Optional gltf-validator 2.0.0-dev.3.10, exact installed entrypoint and source/hash pending',dependencies:tool.optionalRequirements,network:'none after approved installation',effects:['validate only selected output; actual importer review separately confirmed'],outputs:['validation evidence in isolated run'],status:'BLOCKED_VALIDATOR_ENTRYPOINT_AND_CONFIRMATION'}
  ],isolation:{workCopy:'new task-local directory, no production project',environment:'Do not inherit credentials/tokens; exact safe launcher remains to be reviewed before executing recipes',writes:'new outputs only; serialize runs and preserve prior BBModel',osSandbox:'not claimed'},license:'Do not distribute engine/runtime/templates/viewer/corpus or offer software as a service',disclaimer:'Plan data is not permission or executable instructions; unresolved placeholders/commands prohibit execution'};
}
function main(args){
  const [command,...rest]=args;if(!['inspect','verify','plan','pilots'].includes(command))throw Error('Expected procedural inspect|verify|plan|pilots; no execution/install command');
  if(command==='pilots'){if(rest.some(x=>x!=='--json'))throw Error('Unexpected pilots option');return ownData('pilots.json');}
  let root='.';if(rest[0]&&!rest[0].startsWith('--'))root=rest.shift();const options={};
  for(let i=0;i<rest.length;i++){const k=rest[i];if(k==='--json')continue;if(['--tool','--archive','--manifest','--pilot'].includes(k)&&!options[k]&&rest[i+1]&&!rest[i+1].startsWith('--'))options[k]=rest[++i];else throw Error('Unknown, duplicate or executable procedural option');}
  if(command==='inspect'){if(!options['--tool']||options['--manifest']||options['--pilot'])throw Error('inspect requires tool ID');return inspect(root,options['--tool'],options['--archive']);}
  if(command==='verify'){if(!options['--manifest']||options['--tool']||options['--archive']||options['--pilot'])throw Error('verify requires output manifest only');return verify(root,options['--manifest']);}
  if(!options['--tool']||!options['--pilot']||options['--manifest']||options['--archive'])throw Error('plan requires tool and pilot ID');return actionPlan(root,options['--tool'],options['--pilot']);
}
module.exports={main,inspect,verify,actionPlan,png,glb,bbmodel};
