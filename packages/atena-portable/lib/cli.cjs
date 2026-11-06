'use strict';
// No network, dependency installation, client registration or imported commands.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const pkg=require('../package.json');
const START='<!-- atena-add:begin -->',END='<!-- atena-add:end -->';
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const json=file=>JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
const read=file=>fs.existsSync(file)?fs.readFileSync(file):null;
const same=(a,b)=>a===null?b===null:b!==null&&a.equals(b);
function noLinks(target) {
  let current=path.parse(path.resolve(target)).root;
  for(const part of path.resolve(target).slice(current.length).split(path.sep).filter(Boolean)) {
    current=path.join(current,part);
    try { if(fs.lstatSync(current).isSymbolicLink())throw Error('Symbolic link refused: '+current); }
    catch(e) { if(e.code!=='ENOENT')throw e; }
  }
}
function safeRel(value) {
  if(typeof value!=='string'||!value||value.includes('\\')||/[<>:"|?*\x00-\x1f]/.test(value)||path.posix.isAbsolute(value)||value.split('/').some(x=>!x||x==='.'||x==='..'||/[. ]$/.test(x)||/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i.test(x)))throw Error('Unsafe relative path');
  return value;
}
function walk(dir,base=dir) {
  noLinks(dir);
  return fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(e=>{
    const file=path.join(dir,e.name);
    if(e.isSymbolicLink())throw Error('Symbolic link refused: '+file);
    if(!e.isDirectory()&&!e.isFile())throw Error('Non-regular file refused: '+file);
    return e.isDirectory()?walk(file,base):[path.relative(base,file).split(path.sep).join('/')];
  }).sort();
}
function version(value) {
  if(typeof value!=='string'||!/^\d+\.\d+\.\d+$/.test(value))throw Error('Expected stable distribution version');
  return value.split('.').map(Number);
}
function compare(a,b) { const aa=version(a),bb=version(b);for(let i=0;i<3;i++)if(aa[i]!==bb[i])return Math.sign(aa[i]-bb[i]);return 0; }
function source(dir=path.resolve(__dirname,'..')) {
  const root=path.resolve(dir);noLinks(root);
  noLinks(path.join(root,'package.json'));
  const meta=json(path.join(root,'package.json')),payload=path.join(root,'payload');
  if(meta.name!=='atena-add')throw Error('Source package identity mismatch');
  version(meta.version);noLinks(path.join(root,'package.json'));noLinks(path.join(payload,'manifest.json'));
  const manifest=json(path.join(payload,'manifest.json'));
  if(manifest.version!==meta.version||!manifest.files||Array.isArray(manifest.files))throw Error('Source manifest mismatch');
  const expected=Object.keys(manifest.files).sort();expected.forEach(safeRel);
  if(expected.some(f=>f.toLowerCase()==='manifest.json')||new Set(expected.map(f=>f.toLowerCase())).size!==expected.length)throw Error('Ambiguous payload paths');
  const actual=walk(payload).filter(f=>f!=='manifest.json');
  if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('Source inventory mismatch');
  for(const f of expected)if(!/^[a-f0-9]{64}$/.test(manifest.files[f])||sha(fs.readFileSync(path.join(payload,f)))!==manifest.files[f])throw Error('Source hash mismatch: '+f);
  for(const required of ['templates/AGENTS.md','ACTIVATION.md','bootstrap.yaml'])if(!expected.includes(required))throw Error('Source missing required file: '+required);
  return {root,payload,meta,manifest,manifestHash:sha(JSON.stringify(manifest))};
}
function project(value) {
  const root=path.resolve(value||'.');noLinks(root);
  if(!fs.statSync(root).isDirectory())throw Error('Project must be an existing directory');
  for(const f of ['AGENTS.md','.atena','.atena/installation.json','.atena/install-backups','.atena/operation.json','.atena/operation.lock'])noLinks(path.join(root,f));
  if(fs.existsSync(path.join(root,'atena')))throw Error('Legacy atena/ requires separate migration');
  return root;
}
function bridge(v) {return START+'\nRead .atena/methodology/'+v+'/templates/AGENTS.md and .atena/methodology/'+v+'/ACTIVATION.md before ADD work. Preserve project-specific instructions and stricter gates; report conflicts. This explicitly adopts the local methodology, not agents or tools.\n'+END;}
function block(text) {
  const starts=text.split(START).length-1,ends=text.split(END).length-1;
  if(starts!==ends||starts>1||starts&&text.indexOf(END)<text.indexOf(START))throw Error('Malformed ADD instruction block');
  return starts?text.slice(text.indexOf(START),text.indexOf(END)+END.length):null;
}
function inspect(root) {
  const receiptFile=path.join(root,'.atena/installation.json'),agents=read(path.join(root,'AGENTS.md'));
  const issues=[];let receipt=null,managed=null,manifest=null;
  if(agents&&!Buffer.from(agents.toString('utf8')).equals(agents))issues.push('AGENTS.md is not UTF-8');
  try{managed=block(agents?.toString('utf8')||'');}catch(e){issues.push(e.message);}
  if(fs.existsSync(receiptFile)) {
    try { receipt=json(receiptFile);version(receipt.version);if(!/^[a-f0-9]{64}$/.test(receipt.blockHash)||!/^[a-f0-9]{64}$/.test(receipt.payloadHash))throw Error('Invalid receipt hashes'); }
    catch(e){issues.push('Invalid receipt: '+e.message);receipt=null;}
    if(receipt) {
      if(!managed||sha(managed)!==receipt.blockHash)issues.push('Modified or missing managed instruction block');
      const snapshot=path.join(root,'.atena/methodology',receipt.version);noLinks(snapshot);
      const mf=path.join(snapshot,'manifest.json');noLinks(mf);
      if(!fs.existsSync(mf))issues.push('Missing installed manifest');
      else {
        try {
          manifest=json(mf);
          if(manifest.version!==receipt.version||sha(JSON.stringify(manifest))!==receipt.payloadHash)throw Error('Installed manifest differs from receipt');
          const expected=Object.keys(manifest.files).sort();expected.forEach(safeRel);
          for(const f of expected) {const full=path.join(snapshot,f);noLinks(full);const bytes=read(full);if(!bytes)issues.push('Missing managed file: '+f);else if(sha(bytes)!==manifest.files[f])issues.push('Modified managed file: '+f);}
          for(const f of walk(snapshot))if(f!=='manifest.json'&&!Object.hasOwn(manifest.files,f))issues.push('Unexpected snapshot file: '+f);
        } catch(e) {issues.push(e.message);}
      }
    }
  } else if(managed)issues.push('Managed block has no receipt');
  return {receipt,agents,managed,manifest,issues};
}
function state(root) {return {pending:fs.existsSync(path.join(root,'.atena/operation.json')),locked:fs.existsSync(path.join(root,'.atena/operation.lock'))};}
function plan(root,candidate,mode) {
  const current=inspect(root),op=state(root);
  if(op.pending||op.locked)throw Error('Pending operation or lock; inspect status --details and recover before writing');
  if(mode==='install'&&current.receipt) {
    if(current.receipt.version!==candidate.meta.version)throw Error('Existing installation: use update');
  }
  if(mode==='update'&&!current.receipt)throw Error('Update requires an installed receipt; use install for a new adoption');
  if(current.receipt&&compare(candidate.meta.version,current.receipt.version)<0)throw Error('Downgrade refused; select a newer source');
  if(mode==='repair'&&(!current.receipt||current.receipt.version!==candidate.meta.version))throw Error('Repair requires the exact installed source version');
  const rel='.atena/methodology/'+candidate.meta.version,snapshot=path.join(root,rel);noLinks(snapshot);
  const writes=[];
  function add(rel,bytes) {safeRel(rel);const full=path.join(root,rel);noLinks(full);const before=read(full);if(before&&!fs.statSync(full).isFile())throw Error('File conflict: '+rel);if(!same(before,bytes))writes.push({path:rel,before,after:bytes});}
  const permittedMissing=mode==='repair'?current.issues.filter(x=>!x.startsWith('Missing managed file: ')&&x!=='Modified or missing managed instruction block'&&!(x==='Missing installed manifest'&&candidate.manifestHash===current.receipt?.payloadHash)):current.issues;
  if(permittedMissing.length)throw Error('Conflict: '+permittedMissing.join('; '));
  if(mode==='repair'&&current.managed&&sha(current.managed)!==current.receipt.blockHash)throw Error('Modified managed block requires manual review');
  if(mode==='repair'&&sha(bridge(candidate.meta.version))!==current.receipt.blockHash)throw Error('Source does not own the missing block');
  // Existing bytes, including extra files, are never silently replaced by install/update/repair.
  if(fs.existsSync(snapshot)) {
    for(const f of walk(snapshot)) {
      const expected=f==='manifest.json'?Buffer.from(JSON.stringify(candidate.manifest,null,2)+'\n'):Object.hasOwn(candidate.manifest.files,f)?fs.readFileSync(path.join(candidate.payload,f)):null;
      if(!expected)throw Error('Unexpected snapshot file: '+f);
      if(f==='manifest.json') {if(sha(JSON.stringify(json(path.join(snapshot,f))))!==candidate.manifestHash)throw Error('Same version with different manifest');}
      else if(!fs.readFileSync(path.join(snapshot,f)).equals(expected))throw Error('Modified managed file: '+f);
    }
  }
  for(const f of walk(candidate.payload)) {
    const dest=path.join(snapshot,f);noLinks(dest);
    if(!fs.existsSync(dest))add(rel+'/'+f,fs.readFileSync(path.join(candidate.payload,f)));
  }
  let text=current.agents?.toString('utf8')||'',nextBlock=bridge(candidate.meta.version);
  if(current.managed)text=text.replace(current.managed,nextBlock);
  else text+=(text&&!text.endsWith('\n')?'\n':'')+nextBlock+'\n';
  add('AGENTS.md',Buffer.from(text));
  for(const d of ['.atena/state','.atena/state/conversations','.atena/specs','.atena/evidence','.atena/generated','.atena/vault/canon','.atena/vault/drafts','.atena/vault/research','.atena/install-backups']) {
    noLinks(path.join(root,d));if(fs.existsSync(path.join(root,d))&&!fs.statSync(path.join(root,d)).isDirectory())throw Error('Directory conflict: '+d);
  }
  if(mode!=='repair') {
    for(const [f,data]of [['.atena/add.yaml',fs.readFileSync(path.join(candidate.payload,'bootstrap.yaml'),'utf8').replace('PRJ-example','PRJ-local').replace('name: "ADD Example Project"','name: '+JSON.stringify(path.basename(root)))],['.atena/state/plan.yaml','version: 2\nactive_plan: null\nplan_cursor: null\nsuspension: null\ndeferred_requests: []\n']])if(!fs.existsSync(path.join(root,f)))add(f,Buffer.from(data));
  }
  const record={schema:2,version:candidate.meta.version,blockHash:sha(nextBlock),payloadHash:candidate.manifestHash,source:{kind:'local-package',version:candidate.meta.version,manifestHash:candidate.manifestHash},identityRevision:1,previousVersion:current.receipt?.version??null,clientRecognition:'unverified',agentRuntime:'not-installed'};
  if(writes.length||!current.receipt)add('.atena/installation.json',Buffer.from(JSON.stringify(record,null,2)+'\n'));
  return {mode,root,candidate,current,writes};
}
function atomic(file,bytes) {
  noLinks(file);fs.mkdirSync(path.dirname(file),{recursive:true});
  const temp=file+'.'+crypto.randomUUID()+'.tmp';fs.writeFileSync(temp,bytes,{flag:'wx'});
  try {fs.renameSync(temp,file);}catch(e){try{fs.unlinkSync(temp);}catch{}throw e;}
}
function lock(root) {
  const file=path.join(root,'.atena/operation.lock');noLinks(file);fs.mkdirSync(path.dirname(file),{recursive:true});
  const id=crypto.randomUUID();fs.writeFileSync(file,JSON.stringify({id,pid:process.pid,hostname:require('node:os').hostname()}),{flag:'wx'});
  return ()=>{if(json(file).id!==id)throw Error('Lock ownership changed');fs.unlinkSync(file);};
}
function apply(planValue) {
  let a=planValue;
  if(!a.writes.length)return {action:'unchanged',version:a.candidate.meta.version,writes:[]};
  const release=lock(a.root);let journalFile=path.join(a.root,'.atena/operation.json');
  try {
    // Re-read under lock: refuse changed inputs instead of applying a stale preview.
    if(fs.existsSync(journalFile))throw Error('Pending journal');
    for(const w of a.writes)if(!same(read(path.join(a.root,w.path)),w.before))throw Error('Concurrent change: '+w.path);
    // Validate the source once more before the first project content write.
    const verified=source(a.candidate.root);if(verified.manifestHash!==a.candidate.manifestHash)throw Error('Source changed');
    const id=crypto.randomUUID(),journal={schema:1,id,mode:a.mode,version:a.candidate.meta.version,writes:a.writes.map(w=>({path:w.path,before:w.before?.toString('base64')??null,after:w.after.toString('base64')}))};
    const backup='.atena/install-backups/'+id+'.json';noLinks(path.join(a.root,backup));
    fs.mkdirSync(path.dirname(path.join(a.root,backup)),{recursive:true});
    fs.writeFileSync(path.join(a.root,backup),JSON.stringify(journal,null,2)+'\n',{flag:'wx'});
    fs.writeFileSync(journalFile,JSON.stringify({...journal,backup},null,2)+'\n',{flag:'wx'});
    for(const d of ['.atena/state/conversations','.atena/specs','.atena/evidence','.atena/generated','.atena/vault/canon','.atena/vault/drafts','.atena/vault/research']) {noLinks(path.join(a.root,d));fs.mkdirSync(path.join(a.root,d),{recursive:true});}
    for(const w of a.writes) {
      if(!same(read(path.join(a.root,w.path)),w.before))throw Error('Concurrent change: '+w.path);
      atomic(path.join(a.root,w.path),w.after);
    }
    const result=inspect(a.root);if(result.issues.length)throw Error('Post-write verification failed: '+result.issues.join('; '));
    fs.unlinkSync(journalFile);
    return {action:a.mode==='repair'?'repaired':a.mode==='update'?'updated':'installed',version:a.candidate.meta.version,backup,writes:a.writes.map(w=>w.path),clientRecognition:'unverified'};
  } finally {release();}
}
function recover(root,applyChanges=false) {
  if(state(root).locked)throw Error('Lock exists: verify no writer is running; stale lock is never removed automatically');
  const file=path.join(root,'.atena/operation.json');noLinks(file);
  if(!fs.existsSync(file))return {action:'no-pending-operation',writes:[]};
  const j=json(file);version(j.version);
  if(j.schema!==1||!Array.isArray(j.writes)||!j.id)throw Error('Invalid operation journal');
  // Compare to the immutable recorded backup. Imported arbitrary journal paths confer no authority.
  if(j.backup!=='.atena/install-backups/'+j.id+'.json')throw Error('Invalid backup reference');
  noLinks(path.join(root,j.backup));const b=json(path.join(root,j.backup));
  if(JSON.stringify({...b,backup:j.backup})!==JSON.stringify(j))throw Error('Journal differs from backup');
  const seen=new Set(),restore=[];
  for(const w of j.writes) {
    safeRel(w.path);if(seen.has(w.path))throw Error('Duplicate journal path');seen.add(w.path);
    if(!['AGENTS.md','.atena/installation.json','.atena/add.yaml','.atena/state/plan.yaml'].includes(w.path)&&!w.path.startsWith('.atena/methodology/'+j.version+'/'))throw Error('Unowned recovery path');
    noLinks(path.join(root,w.path));const now=read(path.join(root,w.path)),before=w.before===null?null:Buffer.from(w.before,'base64'),after=Buffer.from(w.after,'base64');
    if(!same(now,before)&&!same(now,after))throw Error('Recovery conflict: '+w.path);
    // Keep snapshots and newly created workspace data. Restore only instruction/receipt bytes.
    if(['AGENTS.md','.atena/installation.json'].includes(w.path)&&!same(now,before))restore.push({path:w.path,before:now,after:before});
  }
  if(!applyChanges)return {action:'recovery-preview',writes:restore.map(w=>w.path),preserved:'Snapshots and bootstrap data; review/repair partial snapshots separately'};
  const release=lock(root);
  try {
    if(!fs.readFileSync(file).equals(Buffer.from(JSON.stringify(j,null,2)+'\n')))throw Error('Journal changed or noncanonical encoding; inspect manually');
    for(const w of restore)if(!same(read(path.join(root,w.path)),w.before))throw Error('Concurrent recovery change');
    for(const w of restore) {const target=path.join(root,w.path);if(w.after===null)fs.unlinkSync(target);else atomic(target,w.after);}
    fs.unlinkSync(file);
    return {action:'recovered',writes:restore.map(w=>w.path),preserved:'Snapshots, bootstrap data and backups retained'};
  }finally{release();}
}
function runtime(root,candidate,adapter='generic',observationFile) {
  const catalog=json(path.join(__dirname,'../payload/adapters/catalog.json'));
  const definition=catalog.adapters.find(a=>a.id===adapter);if(!definition)throw Error('Unknown adapter');
  let observation=null;
  if(observationFile) {
    noLinks(observationFile);observation=json(observationFile);
    if(Object.keys(observation).some(k=>!['schema','adapter','project','observedAt','evidence','capabilities'].includes(k)))throw Error('Unexpected observation fields; never include secrets or execution approvals');
    if(observation.schema!==1||observation.adapter!==adapter||observation.project!==root||typeof observation.observedAt!=='string'||!Number.isFinite(Date.parse(observation.observedAt))||typeof observation.evidence!=='string'||!observation.evidence.trim())throw Error('Observation requires adapter, exact project, timestamp and evidence');
    if(!observation.capabilities||Object.values(observation.capabilities).some(v=>!['observed','unavailable','unknown'].includes(v)))throw Error('Invalid capability observations');
    if(Object.keys(observation.capabilities).some(k=>!catalog.capabilities.includes(k)))throw Error('Unknown capability');
  }
  return {adapter,registration:'not-installed-by-cli',clientRecognition:observation?'operator-reported, not independently authenticated':'unverified',observations:observation,capabilities:Object.fromEntries(catalog.capabilities.map(k=>[k,observation?.capabilities[k]||'unknown'])),requirements:definition.requirements};
}
function status(root,candidate,options={}) {
  const current=inspect(root),operation=state(root),installed=current.receipt?.version??null;
  const available=installed?compare(candidate.meta.version,installed)>0:null;
  const result={action:'status',installedVersion:installed,integrity:current.issues.length?'conflict':installed?'verified':'not-installed',updateAvailable:available,candidateVersion:candidate.meta.version,latestVersion:'unknown',operation};
  if(options.details)Object.assign(result,{project:root,source:{kind:'local-package',manifestHash:candidate.manifestHash},receipt:current.receipt,issues:current.issues,runtime:runtime(root,candidate,options.adapter,options.observation),profiles:'Not included in generic distribution; portable sources require separate adoption',procedural:'Optional static inspection/output contracts and prepared pilots; no engine runner or verified engine installation; every setup/execution needs specific confirmation',identity:json(path.join(__dirname,'../payload/identity/manifest.json'))});
  return result;
}
function doctor(root,candidate,options={}) {
  const s=status(root,candidate,{...options,details:true});
  return {action:'doctor',ok:Number(process.versions.node.split('.')[0])>=20&&s.integrity!=='conflict'&&!s.operation.pending&&!s.operation.locked,checks:{node:{actual:process.versions.node,required:'>=20'},payload:'verified',projectIntegrity:s.integrity,operation:s.operation},runtime:s.runtime,dependencies:{core:[],optional:'Not installed or downloaded; select integration separately'},latestVersion:'unknown'};
}
function main(args) {
  const [command,...rest]=args;
  if(command==='cleanup'){source();return require('./lifecycle.cjs').main(rest);}
  if(command==='procedural'){source();return require('./procedural.cjs').main(rest);}
  if(!command||['help','--help'].includes(command))return {action:'help',version:pkg.version,commands:['install [project] [--source package-dir] [--apply]','update [project] [--source package-dir] [--apply]','repair [project] [--source exact-version-dir] [--apply]','status [project] [--source package-dir] [--details] [--json]','doctor [project] [--adapter generic|codex|dot-local|dot-cloud] [--observation file]','recover [project] [--apply]','preview <project>','adopt <project> --apply','phrase <exact phrase>','cleanup inventory|preview|quarantine|restore|canon-check|canon-copy <project> --manifest file','procedural inspect|verify|plan|pilots (static data only; no engine runner)'],limits:'No network or global/client/dependency installation. Preview is default; latest public release unknown.'};
  if(command==='phrase') {const s=source();return {match:json(path.join(s.payload,'phrases.json')).find(x=>x.phrase.normalize('NFC').toLocaleLowerCase('pt-BR')===rest.join(' ').normalize('NFC').trim().toLocaleLowerCase('pt-BR'))||null,grantsAuthorization:false};}
  if(!['install','update','repair','status','doctor','recover','preview','adopt'].includes(command))throw Error('Unknown command');
  const options={details:false,apply:false},pos=[];
  for(let i=0;i<rest.length;i++) {
    const v=rest[i];
    if(['--apply','--details','--json','--ascii'].includes(v)) {if(options[v.slice(2)])throw Error('Duplicate option');options[v.slice(2)]=true;}
    else if(['--source','--adapter','--observation'].includes(v)) {if(!rest[i+1]||rest[i+1].startsWith('--')||options[v.slice(2)])throw Error('Missing or duplicate option value');options[v.slice(2)]=rest[++i];}
    else if(v.startsWith('--'))throw Error('Unknown option: '+v);else pos.push(v);
  }
  if(pos.length>1)throw Error('Expected a single project path');
  if(options.apply&&!['install','update','repair','recover','adopt'].includes(command))throw Error('--apply not supported');
  if((options.adapter||options.observation)&&!['status','doctor'].includes(command))throw Error('Runtime options are diagnostic only');
  if(options.observation&&!options.adapter)throw Error('--observation requires --adapter');
  if(options.adapter||options.observation)options.details=true;
  if(options.details&&!['status','doctor'].includes(command))throw Error('--details is diagnostic only');
  if(command==='adopt'&&!options.apply)throw Error('adopt requires --apply');
  const root=project(pos[0]);
  if(command==='recover') {if(options.source)throw Error('recover does not accept a source');return recover(root,options.apply);}
  const candidate=source(options.source);
  if(command==='status')return status(root,candidate,options);
  if(command==='doctor')return doctor(root,candidate,options);
  const mode=command==='preview'||command==='adopt'?'install':command,a=plan(root,candidate,mode);
  return options.apply?apply(a):{action:a.writes.length?'preview':'unchanged',mode,version:candidate.meta.version,writes:a.writes.map(w=>w.path),source:{kind:'local-package',manifestHash:candidate.manifestHash},clientRecognition:'unverified'};
}
function format(result,args=[]) {
  if(args.includes('--json')||!['status','doctor'].includes(result.action)||args.includes('--details'))return JSON.stringify(result,null,2);
  const mark=args.includes('--ascii')?'[ATENA]':'◈ 🦉 ATENA';
  if(result.action==='doctor')return mark+' — doctor: '+(result.ok?'local checks passed':'attention required')+'; client unverified. Use --json for details.';
  return mark+' — '+(result.installedVersion||'not installed')+' | '+result.integrity+' | '+(result.updateAvailable?'local update '+result.candidateVersion:'public latest unknown')+(result.operation.pending||result.operation.locked?' | operation pending':'')+'\nUse --details for source, runtime, identity and pending integrations.';
}
module.exports={main,format,source,inspect,plan,apply,status,doctor,recover,project,noLinks,safeRel,compare,lock,atomic};
