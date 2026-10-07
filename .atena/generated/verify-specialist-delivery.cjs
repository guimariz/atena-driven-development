const fs=require('fs'),path=require('path'),assert=require('assert'),Module=require('module');
const stateTools=require('../../tools/validate-add-state.cjs'),gameTools=require('../../tools/validate-game-specialists.cjs');
const dir='.atena/evidence/SPEC-004-add-readiness-and-progress';
const schema=JSON.parse(fs.readFileSync('schemas/plan-state.schema.json','utf8'));
const fixtures=stateTools.fixtureChecks('tools/fixtures/add-state.json',schema);
const state=stateTools.parseYaml(fs.readFileSync('.atena/state/plan.yaml','utf8'));
const stateResult=stateTools.validateState(state,stateTools.loadRegistry(process.cwd(),state.active_plan),schema);
const packages=gameTools.packages(),readiness=gameTools.readinessChecks();
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);}
const docs=[...fs.readdirSync('.').filter(f=>f.endsWith('.md')),...walk('templates').filter(f=>f.endsWith('.md')),...walk('.atena').filter(f=>f.endsWith('.md'))];
let links=0;const ids=new Map();
for(const p of docs){const text=fs.readFileSync(p,'utf8');assert(!text.includes('\uFFFD'),'Invalid UTF8 '+p);const prose=text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');const headings=[...prose.matchAll(/^#{1,6} (.+)$/gm)].map(m=>m[1]);assert.equal(new Set(headings).size,headings.length,'Duplicate heading '+p);
 for(const m of prose.matchAll(/\[[^\]\n]*\]\(([^)\n]+)\)/g)){let target=m[1].trim().replace(/^<|>$/g,'').split(/\s+"/)[0];if(/^(?:https?:|mailto:|app:|#)/.test(target))continue;target=decodeURIComponent(target.split('#')[0]);assert(fs.existsSync(path.resolve(path.dirname(p),target)),'Broken link '+p+' -> '+target);links++;}
 if(p.startsWith('.atena')){const id=text.match(/^---\r?\n[\s\S]*?^id:\s*"([^"]+)"/m)?.[1];if(id){assert(!ids.has(id),'Duplicate record ID '+id);ids.set(id,p);}if(p.includes(path.join('vault','canon')))for(const key of ['id','type','title','status','created','reviewed','relations','sources'])assert(new RegExp('^'+key+':','m').test(text),'Canon metadata '+key);}
 assert(!/(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----)/.test(text),'Credential pattern '+p);
}
for(const p of ['.atena/add.yaml','templates/vault/add.yaml','example-project/.atena/add.yaml'])assert.equal(stateTools.parseYaml(fs.readFileSync(p,'utf8')).autonomy.report_mode,'step-updates-and-final','Default '+p);
for(const d of fs.readdirSync('.atena/specs'))for(const f of ['spec.md','plan.md','tasks.md','acceptance.md'])assert(fs.existsSync(path.join('.atena/specs',d,f)),'Companion missing '+d+'/'+f);
assert(fs.readFileSync('.atena/specs/SPEC-002-game-production-loop/spec.md','utf8').includes('status: "draft"'),'Unrelated spec changed');
assert(fs.readFileSync('.atena/specs/SPEC-002-game-production-loop/plan.md','utf8').includes('mode: "unconfigured"'),'Unrelated plan approval changed');
for(const p of ['INTERACTION.md','WORKFLOW.md','AUTONOMY.md','POLICIES.md','CONTRACT.md','GAMES.md','README.md','templates/AGENTS.md','templates/game/visual-bible.md','templates/spec/plan.md','.atena/add.yaml','templates/vault/add.yaml','example-project/.atena/add.yaml'])assert(fs.existsSync(path.join(dir,'pre-run',p.replaceAll('/','__')+'.snapshot')),'Missing pre-run snapshot '+p);
const result={checked_at:new Date().toISOString(),status:'pass',state:stateResult,planFixtures:fixtures.fixtures,parserChecks:fixtures.parserChecks,readinessScenarios:readiness,...packages,markdownDocuments:docs.length,localLinks:links,recordIds:[...ids.keys()],defaultConsistency:'pass',spec002:'unchanged/unapproved',canonicalPromotion:'DEC-002 revision 2 explicitly approved',officialSkillValidator:{status:'unavailable',reason:'Bundled Python ModuleNotFoundError: yaml; no dependency installed',alternative:'Dependency-free local package validator checks current flat frontmatter, naming, scaffold absence and references'},limits:['Documentary and synthetic decision validation only; no live model/agent/game/provider evaluation.','No actual asset/human aesthetic/playtest evaluation performed.','Local Markdown destination checks, not fragment anchors or external availability.','Read-only semantics resolve local records; supplied human approval authenticity is not cryptographically verified.','YAML supports documented ADD mapping/list/scalar subset; unsupported syntax is rejected.','Credential-pattern scan cannot prove absence of all sensitive data.']};
fs.writeFileSync(path.join(dir,'implementation-checks.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(!state.active_plan){
 const file=path.resolve('.atena/generated/validate-publication.cjs'),code=fs.readFileSync(file,'utf8').replaceAll('publication-2026-10-07','SPEC-004-add-readiness-and-progress/final-contract');
 const m=new Module(file,module);m.filename=file;m.paths=module.paths;m._compile(code,file);
}
