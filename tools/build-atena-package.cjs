'use strict';
const fs=require('node:fs'),p=require('node:path'),crypto=require('node:crypto');
const root=p.resolve(__dirname,'..'),base=p.join(root,'packages/atena-add'),dst=p.join(base,'payload');
const expected=new Set();
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
function write(f,s){const rel=p.relative(dst,f).split(p.sep).join('/');expected.add(rel);let cur=dst;for(const part of p.relative(dst,f).split(p.sep)){try{if(fs.lstatSync(cur).isSymbolicLink())throw Error('Output link refused');}catch(e){if(e.code!=='ENOENT')throw e;}cur=p.join(cur,part);}try{if(fs.lstatSync(f).isSymbolicLink())throw Error('Output link refused');}catch(e){if(e.code!=='ENOENT')throw e;}fs.mkdirSync(p.dirname(f),{recursive:true});fs.writeFileSync(f,s);}
function copy(rel){const source=p.join(root,rel),dest=p.join(dst,rel);const s=fs.lstatSync(source);if(s.isSymbolicLink())throw Error('Source link refused');if(s.isDirectory()){for(const name of fs.readdirSync(source).sort())if(!name.includes('.pre-')&&!name.startsWith('.'))copy(rel+'/'+name);}else write(dest,fs.readFileSync(source));}
const files=['UPDATING.md','ADD.md','INTERACTION.md','WORKFLOW.md','AUTONOMY.md','POLICIES.md','CONTRACT.md','GAMES.md','GAME-SPECIALISTS.md','templates/AGENTS.md','templates/spec','templates/state','templates/vault','templates/game','templates/automation/game','templates/canonical-record.md','templates/agent.md','templates/skill.md','schemas/plan-state.schema.json','tools/validate-add-state.cjs','tools/validate-game-specialists.cjs','assets/atena-mark-eyes-v2.png'];
// Deterministic in-place build: refuse stale/foreign outputs rather than deleting a directory.
for(const f of files)copy(f);
const extra=JSON.parse(fs.readFileSync(p.join(base,'distribution.json'),'utf8'));
// The distribution registry predates per-conversation cursors; reconcile only the copied payload.
extra['ACTIVATION.md']=extra['ACTIVATION.md'].replace('.atena/state/plan.yaml before work','the state bound to this chat under .atena/state/conversations/<key>/plan.yaml before work; the legacy .atena/state/plan.yaml is not a global sequencing lock');
for(const [f,s]of Object.entries(extra))write(p.join(dst,f),typeof s==='string'?s:JSON.stringify(s,null,2)+'\n');
let instructions=fs.readFileSync(p.join(dst,'templates/AGENTS.md'),'utf8');
instructions=instructions.replace(/## Atena Voice[\s\S]*?(?=\n## )/,'## Atena Voice\n\nRead [communication](../COMMUNICATION.md). Use its header once per work response; preserve provenance and distinguish consultation, execution and review.\n');
write(p.join(dst,'templates/AGENTS.md'),instructions);
function inventory(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?inventory(p.join(dir,e.name)):[p.join(dir,e.name)]);}
const manifest={version:require(p.join(base,'package.json')).version,files:{}};
for(const f of inventory(dst).sort()){const rel=p.relative(dst,f).split(p.sep).join('/');if(rel==='manifest.json')continue;if(!expected.has(rel))throw Error('Unexpected build output: '+rel);manifest.files[rel]=hash(fs.readFileSync(f));}
write(p.join(dst,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({version:manifest.version,files:Object.keys(manifest.files).length,sourceAllowlist:files},null,2));
