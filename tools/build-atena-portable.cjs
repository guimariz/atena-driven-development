'use strict';
// Export the verified frozen package in this publication tree; not a source compiler.
const fs=require('node:fs'),p=require('node:path'),crypto=require('node:crypto');
const root=p.resolve(__dirname,'..'),src=p.join(root,'packages/atena-portable'),guard=require(p.join(src,'lib/cli.cjs'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function build(output){
  if(!output)throw Error('Usage: node tools/build-atena-portable.cjs <new-output-directory>');
  const dst=p.resolve(output);guard.noLinks(dst);if(fs.existsSync(dst))throw Error('Destination must be new');
  const manifest=JSON.parse(fs.readFileSync(p.join(src,'build-manifest.json')));
  for(const f of manifest.sourceFiles){guard.safeRel(f.path);const path=p.join(src,f.path);guard.noLinks(path);if(sha(fs.readFileSync(path))!==f.sha256)throw Error('Frozen package drift: '+f.path);}
  guard.source(src);
  for(const rel of [...manifest.sourceFiles.map(f=>f.path),'build-manifest.json']){const dest=p.join(dst,rel);fs.mkdirSync(p.dirname(dest),{recursive:true});fs.writeFileSync(dest,fs.readFileSync(p.join(src,rel)),{flag:'wx'});}
  guard.source(dst);return{version:manifest.version,output:dst,kind:'verified-frozen-package-export',files:manifest.sourceFiles.length+1};
}
module.exports={build};if(require.main===module)try{console.log(JSON.stringify(build(process.argv[2]),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
