'use strict';
// Data-only library; no client registration, subprocesses or dynamic role execution.
const fs=require('node:fs'),p=require('node:path'),crypto=require('node:crypto');
const ids=['atena','indiano','odin','miyazaki','prometeus','stanley','zeus','tolkien'];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function catalog(payload,manifest,safeRel,noLinks) {
  function bytes(rel) {
    safeRel(rel);const full=p.join(payload,rel);noLinks(full);
    if(!Object.hasOwn(manifest.files,rel))throw Error('Native library file absent from manifest: '+rel);
    const data=fs.readFileSync(full);
    if(sha(data)!==manifest.files[rel])throw Error('Native library hash mismatch: '+rel);
    return data;
  }
  const value=JSON.parse(bytes('agents/catalog.json').toString('utf8'));
  if(value.schema!==1||value.kind!=='atena-native-role-library'||value.revision!==1||value.owner!=='atena'||value.state!=='DRAFT'||value.runtimeInstalled!==false||value.recursiveDelegation!==false||value.routing!=='on-demand'||value.contract!=='CONTRACT.md')throw Error('Invalid native library contract');
  if(!Array.isArray(value.agents)||JSON.stringify(value.agents.map(a=>a.id))!==JSON.stringify(ids))throw Error('Native library must include the eight standard roles');
  bytes('agents/README.md');bytes('agents/'+value.contract);
  for(const a of value.agents){if(a.instructions!==a.id+'.md'||a.revision!==1||typeof a.name!=='string'||!a.name.trim()||typeof a.responsibility!=='string'||!a.responsibility.trim())throw Error('Invalid native role entry');bytes('agents/'+a.instructions);}
  if(JSON.stringify(value.additionalProcedures)!==JSON.stringify(['animation.md']))throw Error('Invalid additional native procedures');
  for(const f of value.additionalProcedures)bytes('agents/'+f);
  return value;
}
function describe(root,current,safeRel,noLinks) {
  const base={kind:'portable-role-library',availability:'not-installed',revision:null,catalog:null,agents:[],execution:'sequential roles in the current assistant; independent delegation requires support and authorization',clientRecognition:'unverified',runtimeInstalled:false};
  if(!current.receipt)return {...base,availability:current.issues.length?'conflict':'not-installed'};
  if(current.issues.length)return {...base,availability:'conflict'};
  if(!current.manifest?.files['agents/catalog.json']){
    const [major,minor]=current.receipt.version.split('.').map(Number);
    return {...base,availability:major>0||minor>=5?'conflict':'not-bundled'};
  }
  const snapshot='.atena/methodology/'+current.receipt.version;
  try {const c=catalog(p.join(root,snapshot),current.manifest,safeRel,noLinks);return {...base,availability:'installed',revision:c.revision,catalog:snapshot+'/agents/catalog.json',agents:c.agents.map(a=>({...a,instructions:snapshot+'/agents/'+a.instructions}))};}
  catch(e){return {...base,availability:'conflict',issue:e.message};}
}
module.exports={catalog,describe};
