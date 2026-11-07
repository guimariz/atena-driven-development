'use strict';
const fs=require('fs'),p=require('path'),os=require('os'),assert=require('assert/strict'),cp=require('child_process');
const root=p.resolve(__dirname,'../..'),v=require(p.join(root,'tools/validate-add-state.cjs'));
const schema=JSON.parse(fs.readFileSync(p.join(root,'schemas/plan-state.schema.json'),'utf8'));
const base=JSON.parse(fs.readFileSync(p.join(__dirname,'add-state.json'),'utf8')).base;
const temp=fs.mkdtempSync(p.join(os.tmpdir(),'add-chat-state-')),checks=[];
function test(name,fn){fn();checks.push(name);}
function write(file,data){const full=p.join(temp,file);fs.mkdirSync(p.dirname(full),{recursive:true});fs.writeFileSync(full,typeof data==='string'?data:JSON.stringify(data));}
// JSON values are represented as the supported YAML subset below, not parsed as YAML JSON.
function yaml(value,indent=0){
 if(Array.isArray(value))return value.map(x=>' '.repeat(indent)+'-\n'+yaml(x,indent+2)).join('');
 return Object.entries(value).map(([k,x])=>' '.repeat(indent)+k+':'+(x&&typeof x==='object'&&(!Array.isArray(x)||x.length)?'\n'+yaml(x,indent+2):' '+JSON.stringify(x)+'\n')).join('');
}
function bound(key){return {...structuredClone(base.state),conversation:{key,kind:'local',evidence:'Explicit plan approval in fixture chat '+key}};}
function put(key,state){write('.atena/state/conversations/'+key+'/plan.yaml',yaml(state));}
function result(key){const selected=v.selectConversationState(temp,key);return v.validateConversationState(selected,base.registry,schema);}
write('.atena/state/plan.yaml',yaml(base.state));put('chat-a',bound('chat-a'));put('chat-b',bound('chat-b'));
const before=fs.readFileSync(p.join(temp,'.atena/state/conversations/chat-b/plan.yaml'));
test('same chat approved checkpoint remains executable',()=>assert.equal(result('chat-a').executionReady,true));
test('legacy active plan validates but cannot authorize this chat',()=>{const r=result();assert.equal(r.valid,true);assert.equal(r.binding,'unscoped');assert.equal(r.executionReady,false);});
test('missing conversation never falls back to another active plan',()=>{const r=result('chat-c');assert.equal(r.state,'idle');assert.equal(r.binding,'absent');assert.equal(r.executionReady,false);});
test('conversation binding mismatch refuses execution',()=>{put('wrong',bound('chat-a'));assert.throws(()=>result('wrong'),/binding mismatch/);});
test('unbound legacy bytes in conversation path are not claimed',()=>{put('unbound',base.state);assert.throws(()=>result('unbound'),/binding mismatch/);});
test('explicit resumption can preserve existing checkpoint authority',()=>{const resumed=bound('resumed');resumed.conversation.evidence='Explicit fixture handoff from chat-a, PLAN-TEST revision 2 unchanged';put('resumed',resumed);assert.equal(result('resumed').checkpoint,'PLAN');assert.equal(result('resumed').executionReady,true);});
test('resumption never grants a pending checkpoint',()=>{const selected=v.selectConversationState(temp,'resumed'),registry=structuredClone(base.registry);selected.state.active_plan.approval.status='PENDING';registry['PLAN-TEST'].approval.checkpoints[0].status='pending';assert.equal(v.validateConversationState(selected,registry,schema).executionReady,false);});
test('independent cursors and deferred requests preserve other chat bytes',()=>{const a=bound('chat-a');a.active_plan.current_step='S-030';a.plan_cursor={current:'S-030 Second',next:'S-090 Third'};a.deferred_requests=[{id:'DEV-CHAT-A',request:'Later in chat-a only',status:'PENDING'}];put('chat-a',a);assert.equal(result('chat-a').step,2);assert.equal(result('chat-b').step,1);assert(fs.readFileSync(p.join(temp,'.atena/state/conversations/chat-b/plan.yaml')).equals(before));});
test('suspension in chat-a leaves chat-b active',()=>{const a=v.selectConversationState(temp,'chat-a').state;a.active_plan.status='SUSPENDED';a.suspension={request_id:'DEV-CHAT-A',mode:'RETURN_AFTER_EXECUTION',saved_cursor:structuredClone(a.plan_cursor)};put('chat-a',a);assert.equal(result('chat-a').executionReady,false);assert.equal(result('chat-b').executionReady,true);});
test('unsafe selectors refuse traversal',()=>{for(const key of ['../chat-a','a/b','a\\b','','..','a:stream','x'.repeat(81)])assert.throws(()=>v.selectConversationState(temp,key),/Invalid conversation key/);});
test('malformed binding rejected by schema',()=>{for(const change of [{kind:'invented'},{evidence:''},{extra:true}]){const s=bound('chat-b');Object.assign(s.conversation,change);assert.throws(()=>v.validateState(s,base.registry,schema));}});
test('selector never writes or auto-migrates legacy state',()=>{const original=fs.readFileSync(p.join(temp,'.atena/state/plan.yaml'));v.selectConversationState(temp,'never-created');assert(!fs.existsSync(p.join(temp,'.atena/state/conversations/never-created')));assert(fs.readFileSync(p.join(temp,'.atena/state/plan.yaml')).equals(original));});
test('documented semantic routing and real conflict safeguards',()=>{for(const file of ['AGENTS.md','templates/AGENTS.md','INTERACTION.md','WORKFLOW.md','CONTRACT.md']){const s=fs.readFileSync(p.join(root,file),'utf8');assert(s.includes('same chat'),file);assert(/conflict/i.test(s),file);assert(/legacy/i.test(s),file);}const s=fs.readFileSync(p.join(root,'INTERACTION.md'),'utf8');assert(s.includes('Clarifications, small corrections'));assert(s.includes('For `PLAN_DEVIATION` against the active plan of this same chat only'));});
test('CLI absent conversation cannot pass require-executable',()=>{const r=cp.spawnSync(process.execPath,[p.join(root,'tools/validate-add-state.cjs'),'--project',temp,'--conversation','absent-cli','--require-executable'],{encoding:'utf8'});assert.equal(r.status,2,r.stderr);assert.equal(JSON.parse(r.stdout).binding,'absent');});
const report={status:'pass',checks,temp,limitations:['Fixtures validate state selection, isolation and approval checks; model adherence and real multi-client handoff are not proven.','Shared-file/resource conflicts are handled by instructions, not a runtime lock.']};
console.log(JSON.stringify(report,null,2));