const fs = require('fs');
const path = require('path');
const assert = require('assert');
const root = process.cwd();
const read = p => fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
const required = ['add.yaml','vault/canon','vault/drafts','vault/research','specs','evidence','generated','state/plan.yaml'];
for (const p of required) assert(fs.existsSync(path.join('.atena',p)), 'Missing contract path: '+p);
function parseMapping(text) {
  const result = {}, stack = [{indent:-1,obj:result}];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const m = line.match(/^( *)([\w-]+):\s*(.*?)\s*$/);
    assert(m,'Unsupported YAML syntax: '+line);
    const indent=m[1].length, key=m[2], raw=m[3];
    while(stack.at(-1).indent>=indent) stack.pop();
    const parent=stack.at(-1).obj;
    assert(!Object.hasOwn(parent,key),'Duplicate YAML key: '+key);
    let value;
    if(raw==='') value={};
    else if(raw==='null') value=null;
    else if(raw==='true'||raw==='false') value=raw==='true';
    else if(raw==='[]') value=[];
    else if(/^\d+$/.test(raw)) value=Number(raw);
    else if(/^".*"$/.test(raw)) value=JSON.parse(raw);
    else throw Error('Unsupported YAML scalar: '+raw);
    parent[key]=value;
    if(raw==='') stack.push({indent,obj:value});
  }
  return result;
}
function validate(value,schema,loc='$') {
  const known=['$schema','$id','title','type','additionalProperties','required','properties','oneOf','const','enum','pattern','minimum','minLength','items'];
  for(const k of Object.keys(schema)) assert(known.includes(k),'Unsupported schema keyword: '+k);
  if(schema.oneOf) assert.equal(schema.oneOf.filter(s=>{try{validate(value,s,loc);return true}catch{return false}}).length,1,loc+' oneOf');
  const type=v=>v===null?'null':Array.isArray(v)?'array':typeof v;
  if(schema.type) assert([].concat(schema.type).some(t=>t==='integer'?Number.isInteger(value):type(value)===t),loc+' type');
  if(Object.hasOwn(schema,'const')) assert.deepStrictEqual(value,schema.const,loc+' const');
  if(schema.enum) assert(schema.enum.includes(value),loc+' enum');
  if(schema.pattern) assert(new RegExp(schema.pattern).test(value),loc+' pattern');
  if(schema.minimum!==undefined) assert(value>=schema.minimum,loc+' minimum');
  if(schema.minLength!==undefined) assert(value.length>=schema.minLength,loc+' minLength');
  if(schema.required) for(const k of schema.required) assert(Object.hasOwn(value,k),loc+' missing '+k);
  if(schema.additionalProperties===false) for(const k of Object.keys(value)) assert(Object.hasOwn(schema.properties||{},k),loc+' extra '+k);
  if(schema.properties) for(const [k,s] of Object.entries(schema.properties)) if(Object.hasOwn(value,k)) validate(value[k],s,loc+'.'+k);
  if(schema.items) value.forEach((v,i)=>validate(v,schema.items,loc+'['+i+']'));
}
const config=parseMapping(read('.atena/add.yaml'));
assert.equal(config.add_version,'0.2');
const state=parseMapping(read('.atena/state/plan.yaml'));
validate(state,JSON.parse(read('schemas/plan-state.schema.json')));
assert.deepStrictEqual(state,{version:2,active_plan:null,plan_cursor:null,suspension:null,deferred_requests:[]});
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const docs=['README.md','INTERACTION.md','WORKFLOW.md','GAMES.md','templates/AGENTS.md',...walk('templates/game'),...walk('.atena').filter(p=>p.endsWith('.md'))];
let links=0;
const ids=new Map();
for(const p of docs) {
  const text=read(p), prose=text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm,'');
  assert(!/\uFFFD/.test(text),'Invalid UTF-8: '+p);
  const headings=[...prose.matchAll(/^#{1,6} (.+)$/gm)].map(m=>m[1]);
  assert.equal(new Set(headings).size,headings.length,'Duplicate heading: '+p);
  for(const m of prose.matchAll(/\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    let target=m[1].trim().replace(/^<|>$/g,'').split(/\s+"/)[0];
    if(/^(?:https?:|mailto:|app:|#)/.test(target)) continue;
    target=decodeURIComponent(target.split('#')[0]);
    assert(fs.existsSync(path.resolve(path.dirname(p),target)),'Broken link '+p+' -> '+target); links++;
  }
  if(p.startsWith('.atena')) {
    const id=text.match(/^---\r?\n[\s\S]*?^id:\s*"([^"]+)"/m)?.[1];
    if(id){assert(!ids.has(id),'Duplicate record ID: '+id);ids.set(id,p);}
    if(p.includes(path.join('vault','canon'))) for(const key of ['id','type','title','status','created','reviewed','relations','sources']) assert(new RegExp('^'+key+':','m').test(text),'Missing canonical metadata '+key);
  }
  assert(!/(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----)/.test(text),'Credential pattern: '+p);
}
for(const dir of fs.readdirSync('.atena/specs')) for(const p of ['spec.md','plan.md','tasks.md','acceptance.md']) assert(fs.existsSync(path.join('.atena/specs',dir,p)),'Missing spec companion: '+dir+'/'+p);
const draft=read('.atena/specs/SPEC-002-game-production-loop/spec.md');
assert(draft.includes('status: "draft"'));
assert(read('.atena/specs/SPEC-002-game-production-loop/plan.md').includes('mode: "unconfigured"'));
const result={date:'2026-10-07',timezone:'America/Sao_Paulo',status:'pass',required_contract_paths:required.length,markdown_documents:docs.length,local_markdown_links:links,unique_root_record_ids:[...ids.keys()],spec_companions:'present',plan_state_schema:'pass',plan_state:'idle',utf8:'pass',duplicate_headings:'none',credential_pattern_scan:'none',limitations:['Restricted parser supports only the YAML mapping/scalar syntax present in add.yaml and plan.yaml; unsupported syntax fails.','Schema evaluator checks every keyword in the current plan-state schema and rejects unsupported keywords.','Local Markdown destination existence checked; fragment anchors and external URLs not checked.','Credential-pattern scan does not prove absence of every possible secret.','Documentary validation only; no game or model runtime evaluation.']};
fs.mkdirSync('.atena/evidence/publication-2026-10-07',{recursive:true});
fs.writeFileSync('.atena/evidence/publication-2026-10-07/checks.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
