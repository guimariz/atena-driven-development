'use strict';
// Local-only, explicit source selection. Never rebuild the sealed 0.2.0 payload in place.
const fs=require('node:fs'),p=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=p.resolve(__dirname,'..');
const sources=['ADD.md','AUTONOMY.md','CONTRACT.md','GAME-SPECIALISTS.md','GAMES.md','INTERACTION.md','POLICIES.md','WORKFLOW.md','UPDATING.md','README.md','INSTALL.md','RELEASING.md','.gitignore','templates/AGENTS.md','templates/spec','templates/state','templates/vault','templates/game','templates/automation/game','templates/canonical-record.md','templates/agent.md','templates/skill.md','schemas/plan-state.schema.json','assets/atena-mark-eyes-v2.png','example-project','tools/build-atena-package.cjs','tools/test-atena-package.cjs','tools/prepare-add-release.cjs','tools/verify-add-release.cjs','tools/audit-add-release.cjs','tools/validate-add-state.cjs','tools/validate-game-specialists.cjs','tools/fixtures/add-state.json','tools/fixtures/chat-state.cjs','packages/atena-add/package.json','packages/atena-add/distribution.json','packages/atena-add/README.md','packages/atena-add/bin','packages/atena-add/lib'];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(e=>{const f=p.join(dir,e.name);if(e.isSymbolicLink())throw Error('Link refused: '+f);return e.isDirectory()?files(f):[f];});}
function selected(){const out=[];for(const rel of sources){const f=p.join(root,rel);if(fs.lstatSync(f).isSymbolicLink())throw Error('Source link refused');for(const s of fs.statSync(f).isDirectory()?files(f):[f]){const r=p.relative(root,s).split(p.sep).join('/');if(/(?:\.pre-|\.snapshot$|\.pyc$|__pycache__|node_modules)/.test(r))continue;out.push(r);}}return [...new Set(out)].sort();}
function preserved(){const result={};for(const rel of ['packages/atena-add/payload','dist','.atena/state','.atena/vault/canon','.atena/specs/SPEC-002-game-production-loop']){const full=p.join(root,rel);for(const f of fs.statSync(full).isDirectory()?files(full):[full]){const r=p.relative(root,f).split(p.sep).join('/');if(r.includes('/local-add-github-distribution-019/'))continue;result[r]=hash(fs.readFileSync(f));}}return result;}
function run(command,args,options={}){const r=cp.spawnSync(command,args,{cwd:root,encoding:'utf8',maxBuffer:20*1024*1024,...options});if(r.error||r.status!==0)throw Error(r.error?.message||r.stderr||r.stdout);return r.stdout;}
function main(){const args=process.argv.slice(2),version=args[0],relative=args[1];if(!/^\d+\.\d+\.\d+$/.test(version||'')||!relative)throw Error('Usage: node tools/prepare-add-release.cjs <new-version> <new-local-directory>');
 if(version===require(p.join(root,'packages/atena-add/package.json')).version)throw Error('Use a new distribution version');
 const target=p.resolve(root,relative),relTarget=p.relative(root,target);if(!relTarget||relTarget.startsWith('..')||p.isAbsolute(relTarget))throw Error('Output must be inside repository workspace');
 let current=root;for(const part of relTarget.split(p.sep)){current=p.join(current,part);if(fs.existsSync(current)&&fs.lstatSync(current).isSymbolicLink())throw Error('Output link refused');}
 if(fs.existsSync(target))throw Error('Output already exists; preserve candidate and choose a new directory');
 const before=preserved(),list=selected(),source=p.join(target,'source');fs.mkdirSync(source,{recursive:true});
 for(const rel of list){const dst=p.join(source,rel);fs.mkdirSync(p.dirname(dst),{recursive:true});fs.copyFileSync(p.join(root,rel),dst);}
 // Root maintainer instructions are local; publish only the portable template as root instructions.
 fs.writeFileSync(p.join(source,'AGENTS.md'),fs.readFileSync(p.join(source,'templates/AGENTS.md'),'utf8').replaceAll('](../',']('));
 const distribution=JSON.parse(fs.readFileSync(p.join(source,'packages/atena-add/distribution.json'),'utf8'));
 fs.writeFileSync(p.join(source,'AGENT-COORDINATION.md'),distribution['AGENT-COORDINATION.md']);
 fs.writeFileSync(p.join(source,'COMMUNICATION.md'),distribution['COMMUNICATION.md']);
 const pkgPath=p.join(source,'packages/atena-add/package.json'),pkg=JSON.parse(fs.readFileSync(pkgPath,'utf8'));pkg.version=version;fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\n');
 const readme=p.join(source,'packages/atena-add/README.md');fs.writeFileSync(readme,fs.readFileSync(readme,'utf8').replaceAll('0.2.0',version));
 const sourceHashes={};for(const f of files(source))sourceHashes[p.relative(source,f).split(p.sep).join('/')]=hash(fs.readFileSync(f));
 fs.writeFileSync(p.join(target,'source-manifest.json'),JSON.stringify({version,baseCommit:run('git',['rev-parse','HEAD']).trim(),files:sourceHashes,derived:['AGENTS.md: portable template with root-relative links','AGENT-COORDINATION.md: generic optional-profile stub','package version and README: candidate version']},null,2)+'\n');
 fs.writeFileSync(p.join(target,'preservation-before.json'),JSON.stringify(before,null,2)+'\n');
 fs.writeFileSync(p.join(target,'build.json'),run(process.execPath,['tools/build-atena-package.cjs'],{cwd:source}));
 if(JSON.stringify(before)!==JSON.stringify(preserved()))throw Error('Preservation mismatch; inspect before continuing');
 console.log(JSON.stringify({status:'prepared',version,target,sourceFiles:Object.keys(sourceHashes).length,preservedFiles:Object.keys(before).length},null,2));
}
module.exports={sources,selected,preserved,files,hash,run};if(require.main===module){try{main();}catch(e){console.error(e.message);process.exitCode=1;}}
