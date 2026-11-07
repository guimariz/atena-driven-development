(function(){
const fs=require('fs'),p=require('path'),os=require('os'),assert=require('assert'),cp=require('child_process'),crypto=require('crypto');
const root=p.resolve(__dirname,'..'),cli=p.join(root,'tools/validate-marizverso.cjs'),dir=fs.mkdtempSync(p.join(os.tmpdir(),'add-report-')),checks=[];
const invoke=(args,cwd=root)=>cp.spawnSync(process.execPath,[cli,...args],{cwd,encoding:'utf8'});
const check=(name,fn)=>{fn();checks.push(name)};
check('existing no-option JSON behavior',()=>{const r=invoke([]);assert.equal(r.status,0,r.stderr);assert.equal(JSON.parse(r.stdout).checks.length,19);assert.equal(r.stderr,'')});
const out=p.join(dir,'report with spaces.json');
check('report bytes match stdout including newline',()=>{const r=invoke(['--report',out]);assert.equal(r.status,0,r.stderr);assert.equal(fs.readFileSync(out,'utf8'),r.stdout);assert.equal(JSON.parse(r.stdout).status,'pass');assert.equal(r.stderr,'')});
check('existing target preserved',()=>{const before=fs.readFileSync(out,'utf8'),r=invoke(['--report',out]);assert.equal(r.status,1);assert(r.stderr.includes('already exists'));assert.equal(fs.readFileSync(out,'utf8'),before);assert.equal(r.stdout,'')});
for(const args of [['--report'],['--unknown'],['--report','--other'],['--report',out,'extra']])check('reject invalid args '+args.join(' '),()=>{const r=invoke(args);assert.equal(r.status,1);assert(r.stderr.includes('Usage:'));assert.equal(r.stdout,'')});
check('missing parent fails without directory creation',()=>{const parent=p.join(dir,'missing');const r=invoke(['--report',p.join(parent,'out.json')]);assert.equal(r.status,1);assert(!fs.existsSync(parent));assert(r.stderr.includes('Marizverso validation failed'))});
check('directory target rejected',()=>assert.equal(invoke(['--report',dir]).status,1));
check('relative report target resolved from working directory',()=>{const target=p.relative(root,p.join(dir,'relative.json')),r=invoke(['--report',target]);assert.equal(r.status,0,r.stderr);assert.equal(fs.readFileSync(p.join(dir,'relative.json'),'utf8'),r.stdout)});
check('validation failure creates no success report',()=>{const target=p.join(dir,'failed.json'),r=invoke(['--report',target],dir);assert.equal(r.status,1);assert(!fs.existsSync(target));assert.equal(r.stdout,'')});
check('persisted profile inputs match hashes',()=>{const profile=JSON.parse(fs.readFileSync(p.join(root,'.atena/automation/marizverso-profile.json')));for(const i of profile.inputs)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p.join(root,i.path))).digest('hex'),i.sha256)});
check('handoff resumes from persisted review',()=>{const task=JSON.parse(fs.readFileSync(p.join(root,'.atena/evidence/SPEC-009-local-profile-pilot/task.json')));assert.equal(task.task_id,'TASK-009-001');assert(['review','completed'].includes(task.phase));assert(task.result);assert(task.next_objective)});
console.log(JSON.stringify({status:'pass',checks,temporaryDirectory:dir,limits:['Same assistant sequential roles, no independent agent benchmark','Human utility feedback pending']},null,2));
})();
