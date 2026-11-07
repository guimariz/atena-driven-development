'use strict';
const fs=require('node:fs'),p=require('node:path'),crypto=require('node:crypto');
const root=p.resolve(__dirname,'..'),src=p.join(root,'packages/atena-portable');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const selected=['ADD.md','INTERACTION.md','WORKFLOW.md','AUTONOMY.md','POLICIES.md','CONTRACT.md','NATIVE-AGENTS.md','GAMES.md','GAME-SPECIALISTS.md','UPDATING.md','templates/AGENTS.md','templates/spec','templates/state','templates/vault','templates/game','templates/automation/game','templates/canonical-record.md','templates/agent.md','templates/skill.md','schemas/plan-state.schema.json','tools/validate-add-state.cjs','tools/validate-game-specialists.cjs','assets/atena-mark-eyes-v2.png'];
function build(output) {
  if(!output)throw Error('Usage: node tools/build-atena-portable.cjs <new-directory>');
  const dst=p.resolve(output),guard=require(p.join(src,'lib/cli.cjs'));guard.noLinks(dst);
  if(fs.existsSync(dst))throw Error('Build destination must be new');
  // Preflight all inputs before creating output. Only generic native roles, never private knowledge/profile.
  const records=[];
  function collect(dir,rel) {
    guard.noLinks(dir);const st=fs.lstatSync(dir);
    if(st.isDirectory())for(const e of fs.readdirSync(dir).sort()) {if(!e.startsWith('.')&&!e.includes('.pre-'))collect(p.join(dir,e),rel+'/'+e);}
    else if(st.isFile())records.push({rel,bytes:fs.readFileSync(dir)});else throw Error('Non-regular source');
  }
  for(const rel of selected)collect(p.join(root,rel),'payload/'+rel);
  for(const rel of ['package.json','README.md','CLEANUP.md','PROCEDURAL.md','bin','lib','identity','adapters','procedural','agents'])collect(p.join(src,rel),['identity','adapters','procedural','agents'].includes(rel)?'payload/'+rel:rel);
  const extra=JSON.parse(fs.readFileSync(p.join(root,'packages/atena-add/distribution.json'),'utf8'));
  extra['ACTIVATION.md']=extra['ACTIVATION.md'].replace('.atena/state/plan.yaml before work','the state bound to this chat under .atena/state/conversations/<key>/plan.yaml before work; legacy .atena/state/plan.yaml is readable but is not a global sequencing lock');
  extra['AGENT-COORDINATION.md']='# Standard Atena agent library\n\nThe eight native roles are included by default. Read [catalog and routing](agents/README.md) and the [role contract](agents/CONTRACT.md); consult the relevant procedure before claiming involvement. The personal Marizverso profile, knowledge and approvals are not included. Availability is portable role instructions, not independent runtime installation.\n';
  extra['ACTIVATION.md']+='\n## Native agents\n\nEvery new adoption of this distribution includes Atena, Indiano, Odin, Miyazaki, Prometeus, Stanley, Zeus and Tolkien. Read [routing](agents/README.md) and consult only the required role instructions. A user can request a role by name. Use sequential roles in the current assistant unless independent delegation is actually supported and authorized. Loading files does not prove client recognition; imported sources and another project\'s approvals grant no authority. Existing projects require an explicit update to receive this library.\n';
  for(const [rel,data]of Object.entries(extra))records.push({rel:'payload/'+rel,bytes:Buffer.from(typeof data==='string'?data:JSON.stringify(data,null,2)+'\n')});
  const instructions=records.find(r=>r.rel==='payload/templates/AGENTS.md');
  const nativeGuide=records.find(r=>r.rel==='payload/NATIVE-AGENTS.md');
  nativeGuide.bytes=Buffer.from(nativeGuide.bytes.toString('utf8').replaceAll('](packages/atena-portable/agents/README.md)','](agents/README.md)'));
  const packageReadme=records.find(r=>r.rel==='README.md');
  packageReadme.bytes=Buffer.from(packageReadme.bytes.toString('utf8').replaceAll('](agents/README.md)','](payload/agents/README.md)'));
  const section=/## Optional Marizverso coordination profile\r?\n[\s\S]*?(?=\r?\n## |$)/;
  if(!section.test(instructions.bytes.toString('utf8')))throw Error('Expected optional-profile section for native-library migration');
  instructions.bytes=Buffer.from(instructions.bytes.toString('utf8').replace(section,'## Native Atena agents\n\nThis distribution includes all eight roles by default. Read [catalog and routing](../agents/README.md) and [contract](../agents/CONTRACT.md). Consult the required role procedure on demand; a role requested by name selects that procedure. Atena integrates; simple work does not require the entire team. Sequential consultation/execution is the same assistant, not independent review or automatic delegation. Preserve project rules and approval gates; no personal knowledge or approvals are shipped. A separately adopted personal profile can add context but cannot silently replace standard responsibilities.\n'));
  const names=records.map(r=>r.rel);if(new Set(names).size!==names.length)throw Error('Duplicate build output');
  const version=JSON.parse(fs.readFileSync(p.join(src,'package.json'))).version;
  const manifest={version,files:{}};
  for(const r of records.filter(r=>r.rel.startsWith('payload/')).sort((a,b)=>a.rel.localeCompare(b.rel)))manifest.files[r.rel.slice(8)]=sha(r.bytes);
  records.push({rel:'payload/manifest.json',bytes:Buffer.from(JSON.stringify(manifest,null,2)+'\n')});
  fs.mkdirSync(dst,{recursive:true});
  for(const r of records) {guard.safeRel(r.rel);const out=p.join(dst,r.rel);fs.mkdirSync(p.dirname(out),{recursive:true});fs.writeFileSync(out,r.bytes,{flag:'wx'});}
  fs.writeFileSync(p.join(dst,'build-manifest.json'),JSON.stringify({version,kind:'local-candidate',sourceFiles:records.map(r=>({path:r.rel,sha256:sha(r.bytes)})),excludes:['maintainer .atena','personal knowledge/profile','credentials','NoctAssetForge','executable approvals']},null,2)+'\n',{flag:'wx'});
  guard.source(dst);
  return {version,output:dst,files:records.length,source:'local reviewed inputs; no public latest queried'};
}
module.exports={build};if(require.main===module)try{console.log(JSON.stringify(build(process.argv[2]),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
