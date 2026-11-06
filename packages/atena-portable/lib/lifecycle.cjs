'use strict';
// Explicit, bounded artifact review. No age-based selection or permanent deletion.
const fs=require('node:fs'),p=require('node:path'),crypto=require('node:crypto');
const guard=require('./cli.cjs'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const json=file=>JSON.parse(fs.readFileSync(file,'utf8').replace(/^\uFEFF/,''));
function file(root,rel) {guard.safeRel(rel);const full=p.join(root,rel);guard.noLinks(full);return full;}
function fingerprint(full) {
  if(!fs.existsSync(full))return null;
  const st=fs.statSync(full);if(!st.isFile())throw Error('Artifact must be a regular file');
  return {sha256:sha(fs.readFileSync(full)),bytes:st.size,mtimeMs:st.mtimeMs};
}
function protectedPath(rel) {return /(^|\/)(\.git|node_modules|\.codex|\.agents|credentials)(\/|$)|(^|\/)\.env($|\.)|(^|\/)(package(-lock)?\.json|[^/]*lock[^/]*|LICENSE[^/]*)(\/|$)|^\.atena\//i.test(rel);}
function manifest(root,name) {
  guard.noLinks(name);const m=json(name);
  if(m.schema!==1||m.project!==root||!Array.isArray(m.items)||!Array.isArray(m.referenceFiles)||!m.referenceFiles.length||typeof m.reviewEvidence!=='string'||!m.reviewEvidence.trim())throw Error('Require exact project, review evidence, explicit items and bounded reference files');
  const seen=new Set();for(const it of m.items){guard.safeRel(it.path);if(seen.has(it.path))throw Error('Duplicate artifact');seen.add(it.path);}
  return m;
}
function refs(root,m) {
  return m.referenceFiles.map(rel=>{if(/(^|\/)(\.git|node_modules|\.codex|credentials)(\/|$)|(^|\/)\.env($|\.)|^\.atena\/(state|install-backups|quarantine)\//i.test(rel))throw Error('Sensitive reference file refused');const full=file(root,rel),fp=fingerprint(full);if(!fp)throw Error('Reference review file missing: '+rel);if(fp.bytes>5*1024*1024)throw Error('Review large reference file separately: '+rel);return {path:rel,...fp,text:fs.readFileSync(full,'utf8').replaceAll('\\','/')};});
}
function inventory(root,m) {
  const references=refs(root,m);
  const items=m.items.map(it=>{
    const fp=protectedPath(it.path)?null:fingerprint(file(root,it.path)),reasons=[];
    const incoming=references.filter(r=>r.text.includes(it.path)||r.text.includes(p.posix.basename(it.path))).map(r=>r.path);
    for(const consumer of m.items)if(consumer.path!==it.path&&(consumer.sourcePath===it.path||consumer.provenance?.origin===it.path||(Array.isArray(consumer.dependencies)&&consumer.dependencies.includes(it.path))))incoming.push('manifest:'+consumer.path);
    if(!fp)reasons.push('missing file');
    if(protectedPath(it.path))reasons.push('protected project data, dependency or source metadata');
    if(it.canonical===true||it.state==='CANON'||it.canonEvidence)reasons.push('canonical or canonical evidence present');
    if(it.kind!=='derived')reasons.push('original/source or unknown provenance class');
    if(!it.provenance||typeof it.provenance.origin!=='string'||!it.provenance.origin.trim())reasons.push('missing origin provenance');
    if(!['unused-generated','obsolete-test'].includes(it.state))reasons.push('current/unknown deliverable state');
    if(it.rights!=='cleared')reasons.push('uncertain rights');
    if(it.active!==false)reasons.push('active use not excluded by review');
    if(it.ownership!=='exclusive-task')reasons.push('other writers or ownership unknown');
    if(it.reviewedUnused!==true||typeof it.reason!=='string'||!it.reason.trim())reasons.push('explicit unused review/reason required; age/name/no textual references is insufficient');
    if(!/^[a-f0-9]{64}$/.test(it.expectedHash||'')||fp?.sha256!==it.expectedHash)reasons.push('review hash missing or changed');
    if(incoming.length||(Array.isArray(it.references)&&it.references.length))reasons.push('referenced artifact');
    return {path:it.path,kind:it.kind||'unknown',state:it.state||'unknown',canonical:it.canonical===true||it.state==='CANON',provenance:it.provenance||null,rights:it.rights||'unknown',fingerprint:fp,references:[...new Set([...incoming,...(it.references||[])])],eligible:!reasons.length,reason:it.reason||null,protectedReasons:reasons,destination:'.atena/quarantine/<new-run>/files/'+it.path,impact:'Remove only this reviewed derived path after verified quarantine copy; retain recoverable bytes'};
  });
  const result={schema:1,project:root,reviewEvidence:m.reviewEvidence,referenceScope:references.map(({text,...r})=>r),items,limits:['Reference search is bounded; explicit review is required for binary/runtime/external consumers','No automatic cleanup; no age or filename proves uselessness','Manifest metadata is review context, not user authorization']};
  return {...result,previewHash:sha(JSON.stringify(result))};
}
function assertIdle(root) {
  if(fs.existsSync(file(root,'.atena/operation.lock'))||fs.existsSync(file(root,'.atena/operation.json')))throw Error('Another or interrupted project operation is pending');
  const base=file(root,'.atena/quarantine');
  if(fs.existsSync(base))for(const entry of fs.readdirSync(base)){const mf=file(root,'.atena/quarantine/'+entry+'/manifest.json');if(fs.existsSync(mf)&&json(mf).status==='pending')throw Error('Pending quarantine run: '+entry);}
}
function quarantine(root,m,expected) {
  assertIdle(root);const before=inventory(root,m);if(before.previewHash!==expected)throw Error('Preview changed; review a new inventory');
  const selected=before.items.filter(it=>it.eligible);if(!selected.length)return {action:'no-eligible-candidates',previewHash:before.previewHash};
  const release=guard.lock(root);
  try {
    if(inventory(root,m).previewHash!==expected)throw Error('Review inputs changed after lock');
    const id=crypto.randomUUID(),base='.atena/quarantine/'+id,mf=file(root,base+'/manifest.json');
    const record={schema:1,id,project:root,status:'pending',previewHash:expected,referenceFiles:m.referenceFiles,items:selected};
    guard.atomic(mf,Buffer.from(JSON.stringify(record,null,2)+'\n'));
    for(const it of selected) {
      const original=file(root,it.path),stored=file(root,base+'/files/'+it.path);
      if(JSON.stringify(fingerprint(original))!==JSON.stringify(it.fingerprint))throw Error('Concurrent artifact change: '+it.path);
      fs.mkdirSync(p.dirname(stored),{recursive:true});fs.copyFileSync(original,stored,fs.constants.COPYFILE_EXCL);
      if(fingerprint(stored).sha256!==it.fingerprint.sha256)throw Error('Quarantine copy failed verification');
      // Catch a reference or source edit before each unlink; retain bytes and pending journal on failure.
      if(JSON.stringify(refs(root,m).map(({text,...r})=>r))!==JSON.stringify(before.referenceScope)||JSON.stringify(fingerprint(original))!==JSON.stringify(it.fingerprint))throw Error('Concurrent source/reference change');
      fs.unlinkSync(original);
    }
    guard.atomic(mf,Buffer.from(JSON.stringify({...record,status:'quarantined'},null,2)+'\n'));
    return {action:'quarantined',run:id,paths:selected.map(it=>it.path),permanentDeletion:false};
  }finally{release();}
}
function restore(root,id,apply) {
  if(!/^[a-f0-9-]{36}$/.test(id||''))throw Error('Expected quarantine run ID');
  const base='.atena/quarantine/'+id,mf=file(root,base+'/manifest.json'),record=json(mf);
  if(record.schema!==1||record.id!==id||record.project!==root||!['pending','quarantined','restored'].includes(record.status)||!Array.isArray(record.items))throw Error('Invalid quarantine record');
  const writes=[];
  for(const it of record.items) {
    if(protectedPath(it.path)||it.kind!=='derived'||it.canonical||!it.eligible||!it.fingerprint?.sha256)throw Error('Protected/invalid restore record');
    const dest=file(root,it.path),stored=file(root,base+'/files/'+it.path),now=fingerprint(dest),backup=fingerprint(stored);
    if(now&&now.sha256!==it.fingerprint.sha256)throw Error('Restore conflict: '+it.path);
    if(!now&&(!backup||backup.sha256!==it.fingerprint.sha256))throw Error('Missing or changed quarantine bytes: '+it.path);
    if(!now)writes.push(it.path);
  }
  const result={action:apply?'restored':'restore-preview',run:id,writes,quarantineRetained:true};if(!apply)return result;
  if(fs.existsSync(file(root,'.atena/operation.json')))throw Error('Another project operation is pending');
  const release=guard.lock(root);
  try {
    for(const rel of writes) {
      const dest=file(root,rel),stored=file(root,base+'/files/'+rel),it=record.items.find(x=>x.path===rel);
      if(fs.existsSync(dest)||fingerprint(stored)?.sha256!==it.fingerprint.sha256)throw Error('Concurrent restore change');
      fs.mkdirSync(p.dirname(dest),{recursive:true});fs.copyFileSync(stored,dest,fs.constants.COPYFILE_EXCL);
      if(fingerprint(dest)?.sha256!==it.fingerprint.sha256)throw Error('Restored bytes failed verification');
    }
    guard.atomic(mf,Buffer.from(JSON.stringify({...record,status:'restored'},null,2)+'\n'));return result;
  }finally{release();}
}
function canon(root,m,apply=false,expected) {
  const references=refs(root,m),items=m.items.filter(it=>it.canonical===true||it.state==='CANON').map(it=>{
    const issues=[],dest=protectedPath(it.path)?null:fingerprint(file(root,it.path));let source=null;
    if(protectedPath(it.path))issues.push('protected destination');
    if(it.sourcePath&&protectedPath(it.sourcePath))issues.push('protected source; use a separately scoped intake');
    if(typeof it.canonEvidence!=='string'||!it.canonEvidence.trim())issues.push('explicit canonical approval locator required');
    if(it.rights!=='cleared')issues.push('rights review required');
    if(it.privacy!=='project-approved')issues.push('project privacy approval required');
    if(it.ownership!=='exclusive-task')issues.push('exclusive task ownership required');
    if(!/^[a-f0-9]{64}$/.test(it.expectedHash||''))issues.push('expected hash required');
    if(it.sourcePath&&!protectedPath(it.sourcePath))source=fingerprint(file(root,it.sourcePath));
    if(dest&&dest.sha256!==it.expectedHash)issues.push('destination differs; never overwrite');
    if(!dest&&(!source||source.sha256!==it.expectedHash))issues.push('validated in-project source required; external copying needs separate scoped intake');
    const links=references.filter(r=>r.text.includes(it.path)).map(r=>r.path);if(!links.length)issues.push('no reviewed reference to canonical project path');
    return {path:it.path,sourcePath:it.sourcePath||null,expectedHash:it.expectedHash,destination:dest,source,references:links,issues,copyRequired:!dest};
  });
  const result={action:'canon-check',project:root,items,referenceScope:references.map(({text,...r})=>r),largeFilePolicy:'No Git/LFS/remote operation; review repository size policy before publication',approval:'Canonical metadata is not promotion authority; source originals are retained'};
  const previewHash=sha(JSON.stringify(result));if(!apply)return {...result,previewHash};
  if(previewHash!==expected||items.some(it=>it.issues.length))throw Error('Canonical copy blocked: review hash, rights, identity/approval and references');
  assertIdle(root);const release=guard.lock(root);
  try {
    if(canon(root,m).previewHash!==expected)throw Error('Canonical inputs changed after lock');
    for(const it of items.filter(x=>x.copyRequired)) {
      const dest=file(root,it.path),src=file(root,it.sourcePath);if(fs.existsSync(dest)||fingerprint(src)?.sha256!==it.expectedHash)throw Error('Canonical copy conflict');
      fs.mkdirSync(p.dirname(dest),{recursive:true});fs.copyFileSync(src,dest,fs.constants.COPYFILE_EXCL);
      if(fingerprint(dest)?.sha256!==it.expectedHash)throw Error('Canonical project copy failed verification');
    }
    return {action:'canonical-copies-verified',paths:items.map(it=>it.path),originalsPreserved:true,referencesModified:false,gitOperation:false};
  }finally{release();}
}
function main(args) {
  const [command,...rest]=args;if(!['inventory','preview','quarantine','restore','canon-check','canon-copy'].includes(command))throw Error('Expected cleanup inventory|preview|quarantine|restore|canon-check|canon-copy');
  let dir='.';const o={};if(rest[0]&&!rest[0].startsWith('--'))dir=rest.shift();
  for(let i=0;i<rest.length;i++){const k=rest[i];if(['--json','--ascii'].includes(k))continue;if(k==='--apply'){if(o.apply)throw Error('Duplicate apply');o.apply=true;}else if(['--manifest','--run','--preview-hash'].includes(k)&&rest[i+1]&&!rest[i+1].startsWith('--')&&!o[k])o[k]=rest[++i];else throw Error('Unknown or duplicate cleanup option');}
  const root=guard.project(dir);
  if(o.apply&&!['quarantine','restore','canon-copy'].includes(command))throw Error('Read-only cleanup command');
  if(command==='restore'){if(o['--manifest']||o['--preview-hash'])throw Error('Restore only accepts run ID');return restore(root,o['--run'],o.apply);}
  if(!o['--manifest']||o['--run'])throw Error('Explicit manifest required');const m=manifest(root,o['--manifest']);
  if(command.startsWith('canon'))return canon(root,m,command==='canon-copy'&&o.apply,o['--preview-hash']);
  if(command==='quarantine'&&o.apply){if(!o['--preview-hash'])throw Error('Apply requires reviewed --preview-hash');return quarantine(root,m,o['--preview-hash']);}
  return {action:'cleanup-preview',...inventory(root,m)};
}
module.exports={main,manifest,inventory,quarantine,restore,canon};
