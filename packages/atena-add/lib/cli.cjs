'use strict';
const fs=require('node:fs'),p=require('node:path'),crypto=require('node:crypto');
const pkg=require('../package.json'),payload=p.join(__dirname,'../payload');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const START='<!-- atena-add:begin -->',END='<!-- atena-add:end -->';
function noLinks(target){
 let cur=p.parse(p.resolve(target)).root;
 for(const part of p.resolve(target).slice(cur.length).split(p.sep).filter(Boolean)){
  cur=p.join(cur,part);
  try { if(fs.lstatSync(cur).isSymbolicLink())throw Error('Symbolic link refused: '+cur); }
  catch(e){if(e.code!=='ENOENT')throw e;}
 }
}
function entries(dir,base=dir){
 const out=[];
 for(const e of fs.readdirSync(dir,{withFileTypes:true})){
  const f=p.join(dir,e.name);
  if(e.isSymbolicLink())throw Error('Payload link refused');
  if(e.isDirectory())out.push(...entries(f,base));
  else out.push(p.relative(base,f).split(p.sep).join('/'));
 }
 return out.sort();
}
function checkedPayload(){
 const manifest=JSON.parse(fs.readFileSync(p.join(payload,'manifest.json'),'utf8'));
 if(manifest.version!==pkg.version)throw Error('Payload version mismatch');
 const actual=entries(payload).filter(x=>x!=='manifest.json');
 if(JSON.stringify(actual)!==JSON.stringify(Object.keys(manifest.files).sort()))throw Error('Payload inventory mismatch');
 for(const f of actual)if(hash(fs.readFileSync(p.join(payload,f)))!==manifest.files[f])throw Error('Payload hash mismatch: '+f);
 return manifest;
}
function matchPhrase(text){
 const phrases=JSON.parse(fs.readFileSync(p.join(payload,'phrases.json'),'utf8'));
 const normalized=text.normalize('NFC').trim().toLocaleLowerCase('pt-BR');
 return phrases.find(x=>x.phrase.toLocaleLowerCase('pt-BR')===normalized)||null;
}
function prepare(project){
 const manifest=checkedPayload(),root=p.resolve(project);noLinks(root);
 if(!fs.statSync(root).isDirectory())throw Error('Project must be an existing directory');
 if(fs.existsSync(p.join(root,'atena')))throw Error('Legacy atena/ requires approved migration');
 const rel='.atena/methodology/'+pkg.version, snapshot=p.join(root,rel);
 const targets=['AGENTS.md','.atena','.atena/add.yaml','.atena/state/plan.yaml','.atena/installation.json','.atena/install-backups',rel];
 for(const f of targets)noLinks(p.join(root,f));
 if(fs.existsSync(p.join(root,'.atena'))&&!fs.statSync(p.join(root,'.atena')).isDirectory())throw Error('.atena must be a directory');
 const agentsFile=p.join(root,'AGENTS.md'),receiptFile=p.join(root,'.atena/installation.json');
 const before=fs.existsSync(agentsFile)?fs.readFileSync(agentsFile):null;
 const text=before?before.toString('utf8'):'';
 if(before&&!Buffer.from(text).equals(before))throw Error('AGENTS.md must be valid UTF-8');
 const receipt=fs.existsSync(receiptFile)?JSON.parse(fs.readFileSync(receiptFile,'utf8')):null;
 const starts=text.split(START).length-1,ends=text.split(END).length-1;
 if(starts!==ends||starts>1)throw Error('Malformed ADD instruction block');
 let oldBlock=null,after=text;
 if(starts){
  if(!receipt)throw Error('Unowned ADD block');
  const a=text.indexOf(START),b=text.indexOf(END)+END.length;
  if(b<a)throw Error('Malformed ADD instruction block');
  oldBlock=text.slice(a,b);
  if(hash(oldBlock)!==receipt.blockHash)throw Error('Modified ADD block: review before update');
 }else if(receipt)throw Error('Receipt exists without instruction block');
 const block=START+'\nRead '+rel+'/templates/AGENTS.md and '+rel+'/ACTIVATION.md before ADD work. Preserve project-specific instructions and stricter gates; report conflicts. This explicitly adopts the local methodology, not agents or tools.\n'+END;
 after=oldBlock?text.replace(oldBlock,block):text+(text&&!text.endsWith('\n')?'\n':'')+block+'\n';
 if(fs.existsSync(snapshot)){
  noLinks(snapshot);
  const a=entries(snapshot),b=entries(payload);
  if(JSON.stringify(a)!==JSON.stringify(b)||a.some(f=>hash(fs.readFileSync(p.join(snapshot,f)))!==hash(fs.readFileSync(p.join(payload,f)))))throw Error('Version snapshot differs; use a new version or review recovery');
 }
 // Preflight all workspace paths before any write, including pre-existing nested links.
 const dirs=['.atena/state','.atena/specs','.atena/evidence','.atena/generated','.atena/vault/canon','.atena/vault/drafts','.atena/vault/research'];
 for(const d of dirs){noLinks(p.join(root,d));if(fs.existsSync(p.join(root,d))&&!fs.statSync(p.join(root,d)).isDirectory())throw Error('Directory conflict: '+d);}
 const creates=[];
 for(const [f,data]of [['.atena/add.yaml',fs.readFileSync(p.join(payload,'bootstrap.yaml'),'utf8').replace('PRJ-example','PRJ-local').replace('name: "ADD Example Project"','name: '+JSON.stringify(p.basename(root)))],['.atena/state/plan.yaml','version: 2\nactive_plan: null\nplan_cursor: null\nsuspension: null\ndeferred_requests: []\n']]){
  if(!fs.existsSync(p.join(root,f)))creates.push([f,data]);
 }
 return {root,manifest,rel,snapshot,agentsFile,receiptFile,before,after,receipt,block,creates,dirs,
 unchanged:after===text&&receipt?.version===pkg.version&&creates.length===0&&fs.existsSync(snapshot)};
}
function adopt(project,apply=false){
 const a=prepare(project);
 if(!apply||a.unchanged)return {action:a.unchanged?'unchanged':'preview',version:pkg.version,project:a.root,writes:a.unchanged?[]:[a.rel,'AGENTS.md','.atena/installation.json',...a.creates.map(x=>x[0])],limits:['No runtime installed','No canonical promotion','Existing project state preserved']};
 // Invocation is an explicit project write. No remote operations or shell commands.
 const backupDir=p.join(a.root,'.atena/install-backups');fs.mkdirSync(backupDir,{recursive:true});
 const backup=p.join(backupDir,crypto.randomUUID()+'.json');
 fs.writeFileSync(backup,JSON.stringify({version:1,agents:a.before?.toString('base64')??null,receipt:fs.existsSync(a.receiptFile)?fs.readFileSync(a.receiptFile).toString('base64'):null,previousVersion:a.receipt?.version??null},null,2)+'\n',{flag:'wx'});
 if(!fs.existsSync(a.snapshot)){
  fs.mkdirSync(a.snapshot,{recursive:true});
  for(const f of entries(payload)){const dst=p.join(a.snapshot,f);fs.mkdirSync(p.dirname(dst),{recursive:true});fs.copyFileSync(p.join(payload,f),dst,fs.constants.COPYFILE_EXCL);}
 }
 for(const d of a.dirs)fs.mkdirSync(p.join(a.root,d),{recursive:true});
 for(const [f,s]of a.creates)fs.writeFileSync(p.join(a.root,f),s,{flag:'wx'});
 const record={version:pkg.version,blockHash:hash(a.block),payloadHash:hash(JSON.stringify(a.manifest)),previousVersion:a.receipt?.version??null,backup:p.relative(a.root,backup).split(p.sep).join('/')};
 // AGENTS first: if receipt write fails, the backup permits explicit recovery.
 fs.writeFileSync(a.agentsFile,a.after);
 fs.writeFileSync(a.receiptFile,JSON.stringify(record,null,2)+'\n');
 return {action:'adopted',version:pkg.version,project:a.root,backup:record.backup,snapshot:a.rel};
}
function main(args){
 const [cmd,...rest]=args;
 if(!cmd||cmd==='help'||cmd==='--help')return {version:pkg.version,commands:['preview <project>','adopt <project> --apply','status <project>','phrase <exact phrase>'],notes:'Local files only. No automatic client registration. Updates require a new local package and explicit adoption.'};
 if(cmd==='phrase'){if(!rest.length)throw Error('phrase requires text');checkedPayload();return {match:matchPhrase(rest.join(' ')),grantsAuthorization:false};}
 if(!['preview','adopt','status'].includes(cmd))throw Error('Unknown command');
 if(rest.length!==(cmd==='adopt'?2:1)||cmd==='adopt'&&rest[1]!=='--apply')throw Error('Expected '+cmd+' <project>'+(cmd==='adopt'?' --apply':''));
 if(cmd==='status'){const a=prepare(rest[0]);return {version:pkg.version,adopted:a.unchanged,installedVersion:a.receipt?.version??null,project:a.root};}
 return adopt(rest[0],cmd==='adopt');
}
module.exports={main,adopt,matchPhrase,checkedPayload,prepare};
