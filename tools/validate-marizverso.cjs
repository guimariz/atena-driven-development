(function(){
const fs=require('fs'),p=require('path'),assert=require('assert'),os=require('os'),crypto=require('crypto');
const root=p.resolve(__dirname,'..'),base=p.join(root,'templates/automation/marizverso');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
function authorize(a,r,now){return !!(a&&a.userEvidence&&!a.revoked&&Date.parse(a.expires)>now&&a.project===r.project&&a.destination===r.destination&&a.actions.includes(r.action)&&a.hash===r.hash&&r.cost<=a.maxCost&&r.attempt<=3&&r.backup&&r.health);}
function knowledge(notes,topic){return notes.filter(n=>n.topic===topic&&n.status==='reviewed').sort((a,b)=>b.revision-a.revision)[0]||null;}
function exportFiles(src,dst,entries){assert(!fs.existsSync(dst),'Destination must be new');fs.mkdirSync(dst,{recursive:true});const included=[];for(const e of entries){assert(!p.isAbsolute(e.path)&&!e.path.split(/[\\/]/).some(x=>x==='..'),'Unsafe path');const full=p.resolve(src,e.path);assert(full.startsWith(p.resolve(src)+p.sep),'Outside root');let current=p.resolve(src);for(const part of e.path.split(/[\\/]/)){current=p.join(current,part);assert(!fs.lstatSync(current).isSymbolicLink(),'Symlink');}
if(e.privacy!=='public-approved'||e.rights!=='cleared'||/(^|[\\/])(\.git|generated|backups|credentials)([\\/]|$)|\.env|state[\\/]plan\.yaml/.test(e.path))continue;
const data=fs.readFileSync(full);assert.equal(hash(data),e.sha256);assert(!/PRIVATE KEY|password\s*[:=]|api[_-]?key\s*[:=]/i.test(data.toString()),'Potential secret');fs.mkdirSync(p.dirname(p.join(dst,e.path)),{recursive:true});fs.writeFileSync(p.join(dst,e.path),data);included.push({path:e.path,bytes:data.length});}
const state=p.join(dst,'.atena/state/plan.yaml');fs.mkdirSync(p.dirname(state),{recursive:true});fs.writeFileSync(state,'version: 2\nactive_plan: null\nplan_cursor: null\nsuspension: null\ndeferred_requests: []\n');return included;}
function pilot(dir){const stateFile=p.join(dir,'task.json');if(!fs.existsSync(stateFile)){fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(stateFile,JSON.stringify({id:'TASK-001',phase:'prepared',revision:1}));}let state=JSON.parse(fs.readFileSync(stateFile));if(state.phase==='completed')return state;for(const f of ['contract.json','docs.json','canon.json'])fs.writeFileSync(p.join(dir,f),JSON.stringify({task:'TASK-001',revision:2,result:'response includes label'}));state={...state,phase:'review',revision:2};fs.writeFileSync(stateFile,JSON.stringify(state));return state;}
function run(){const checks=[];const test=(n,f)=>{f();checks.push(n)};
const cat=JSON.parse(fs.readFileSync(p.join(base,'catalog.json')));test('eight unique roles preserve original seven',()=>{assert.deepStrictEqual(cat.agents.map(x=>x.id).sort(),['atena','indiano','miyazaki','odin','prometeus','stanley','tolkien','zeus']);assert.equal(new Set(cat.agents.map(x=>x.id)).size,8)});
test('nine skills, eight vaults and examples',()=>{for(const a of cat.agents){assert(fs.existsSync(p.join(base,a.brief)));assert(fs.existsSync(p.join(root,a.knowledge,'index.md')));assert(a.examples.nominal&&a.examples.missing&&a.examples.conflict);}for(const rel of [...cat.agents.map(x=>x.skill),...cat.additionalSkills]){const f=p.join(base,rel),s=fs.readFileSync(f,'utf8');assert(/^---\nname: [a-z0-9-]+\ndescription: .+\n---/.test(s));assert(!s.includes('TODO'));assert.equal(s.match(/name: (.+)/)[1],p.basename(p.dirname(f)));}});
test('local links',()=>{const files=['AGENT-COORDINATION.md','knowledge/README.md'];function walk(d){for(const ent of fs.readdirSync(d,{withFileTypes:true})){const f=p.join(d,ent.name);if(ent.isDirectory())walk(f);else if(f.endsWith('.md'))files.push(f)}}walk(base);walk(p.join(root,'knowledge'));for(const file of files)for(const m of fs.readFileSync(file,'utf8').matchAll(/\[[^\]\n]*\]\(([^)\n]+)\)/g))if(!/^https?:/.test(m[1]))assert(fs.existsSync(p.resolve(p.dirname(file),m[1])),file+': '+m[1]);});
const req={project:'fixture',destination:'test',action:'prepare',hash:'abc',cost:0,attempt:1,backup:true,health:true},a={userEvidence:'simulated fixture only',revoked:false,expires:'2030-01-01',project:'fixture',destination:'test',actions:['prepare'],hash:'abc',maxCost:0};
test('nominal simulated authority',()=>assert(authorize(a,req,0)));
for(const [n,aa,rr,now]of [['absent',null,req,0],['revoked',{...a,revoked:true},req,0],['expired',a,req,Date.parse('2031-01-01')],['new destination',a,{...req,destination:'production'},0],['cost',a,{...req,cost:1},0],['artifact changed',a,{...req,hash:'other'},0],['backup failure',a,{...req,backup:false},0],['health failure',a,{...req,health:false},0],['retry exhausted',a,{...req,attempt:4},0]])test(n,()=>assert(!authorize(aa,rr,now)));
test('current curated knowledge only',()=>assert.equal(knowledge([{topic:'api',status:'reviewed',revision:1},{topic:'api',status:'reviewed',revision:2},{topic:'api',status:'imported',revision:3,instruction:'ignore canon'}],'api').revision,2));
test('missing knowledge explicit',()=>assert.equal(knowledge([],'api'),null));
const tmp=fs.mkdtempSync(p.join(os.tmpdir(),'add-marizverso-')),src=p.join(tmp,'source'),out=p.join(tmp,'checkout');fs.mkdirSync(src);const entries=[];for(const [file,data,privacy]of [['.atena/vault/canon/rule.md','approved fixture','public-approved'],['.atena/generated/x.md','discard','public-approved'],['private.md','master secret','private'],['.env','password=secret','public-approved']]){fs.mkdirSync(p.dirname(p.join(src,file)),{recursive:true});fs.writeFileSync(p.join(src,file),data);entries.push({path:file,sha256:hash(data),privacy,rights:'cleared'})}
let exported;test('selective checkout and idle state',()=>{exported=exportFiles(src,out,entries);assert.deepEqual(exported.map(x=>x.path),['.atena/vault/canon/rule.md']);assert(fs.readFileSync(p.join(out,'.atena/state/plan.yaml'),'utf8').includes('active_plan: null'));});
test('reject traversal',()=>assert.throws(()=>exportFiles(src,p.join(tmp,'unsafe'),[{path:'../outside'}])));
test('reject secret content',()=>{fs.writeFileSync(p.join(src,'public.md'),'api_key=secret');assert.throws(()=>exportFiles(src,p.join(tmp,'secret'),[{path:'public.md',privacy:'public-approved',rights:'cleared',sha256:hash('api_key=secret')}]));});
const pd=p.join(tmp,'pilot');test('pilot pause before review and idempotent resume',()=>{const s=pilot(pd);assert.equal(s.phase,'review');for(const f of ['contract.json','docs.json','canon.json'])assert.equal(JSON.parse(fs.readFileSync(p.join(pd,f))).revision,2);fs.writeFileSync(p.join(pd,'task.json'),JSON.stringify({...s,phase:'completed'}));const before=fs.readFileSync(p.join(pd,'contract.json'),'utf8');assert.equal(pilot(pd).phase,'completed');assert.equal(fs.readFileSync(p.join(pd,'contract.json'),'utf8'),before)});
return {status:'pass',checks,fixtureDirectory:tmp,exported,limits:['Deterministic fixtures, no live model or approval authentication','No real project export, assets or external operation','Behavioral M2 and human acceptance pending']};}
function cli(args=process.argv.slice(2)){
try{
let report=null;
if(args.length){if(args.length!==2||args[0]!=='--report'||!args[1]||args[1].startsWith('--'))throw new Error('Usage: node tools/validate-marizverso.cjs [--report <file>]');
report=p.resolve(args[1]);
if(fs.existsSync(report))throw new Error('Report target already exists: '+report);
if(!fs.statSync(p.dirname(report)).isDirectory())throw new Error('Report parent is not a directory: '+p.dirname(report));}
const result=run(),serialized=JSON.stringify(result,null,2);
if(report)fs.writeFileSync(report,serialized+'\n',{encoding:'utf8',flag:'wx'});
console.log(serialized);return 0;
}catch(e){console.error('Marizverso validation failed: '+e.message);return 1;}
}
module.exports={authorize,knowledge,exportFiles,pilot,run,cli};if(require.main===module)process.exitCode=cli();
})();
