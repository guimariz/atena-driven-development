'use strict';
// Offline smoke test of our own freshly packed artifact, never external package scripts.
const fs=require('node:fs'),p=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=p.resolve(__dirname,'..'),archive=p.resolve(process.argv[2]||''),reportFile=process.argv[3]?p.resolve(process.argv[3]):null;
if(!process.argv[2])throw Error('Usage: node tools/test-atena-native-package.cjs <own-reviewed.tgz> [new-report.json]');
const expected=['atena','indiano','odin','miyazaki','prometeus','stanley','zeus','tolkien'];
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
fs.mkdirSync(p.join(root,'tmp'),{recursive:true});const temp=fs.mkdtempSync(p.join(root,'tmp/atena-native-pack-'));
const tar=process.platform==='win32'?'tar.exe':'tar';
const entries=cp.execFileSync(tar,['-tzf',archive],{encoding:'utf8'}).trim().split(/\r?\n/);
assert(entries.every(f=>f.startsWith('package/')&&!f.split('/').includes('..')&&!f.includes('\\')),'Unsafe packed path');
assert(!entries.some(f=>/(^|\/)(knowledge|\.atena|\.env|node_modules|marizverso)(\/|$)/i.test(f)),'Private payload');
cp.execFileSync(tar,['-xzf',archive,'-C',temp]);
const pkg=p.join(temp,'package'),cli=require(p.join(pkg,'lib/cli.cjs')),source=cli.source(pkg),project=p.join(temp,'Project with spaces');
assert.equal(source.meta.version,'0.5.0');assert.equal(source.meta.scripts,undefined);assert.equal(source.meta.dependencies,undefined);
fs.mkdirSync(project);fs.writeFileSync(p.join(project,'AGENTS.md'),'# Synthetic project rule\nPreserve this instruction.\n');
assert.equal(cli.main(['install',project]).action,'preview');assert.equal(fs.readdirSync(project).length,1);
assert.equal(cli.main(['install',project,'--apply']).action,'installed');
const result=JSON.parse(cp.execFileSync(process.execPath,[p.join(pkg,'bin/atena-add.cjs'),'agents',project,'--json'],{encoding:'utf8'}));
assert.equal(result.availability,'installed');assert.deepEqual(result.agents.map(a=>a.id),expected);
assert.equal(result.clientRecognition,'unverified');assert.equal(result.runtimeInstalled,false);
assert(fs.readFileSync(p.join(project,'AGENTS.md'),'utf8').startsWith('# Synthetic project rule\nPreserve this instruction.\n'));
assert.equal(cli.main(['repair',project,'--apply']).action,'unchanged');
let links=0;for(const rel of Object.keys(source.manifest.files).filter(f=>f.endsWith('.md'))){const full=p.join(source.payload,rel);for(const match of fs.readFileSync(full,'utf8').matchAll(/\]\(([^)\n]+)\)/g)){if(/^(https?:|#)/.test(match[1]))continue;assert(fs.existsSync(p.resolve(p.dirname(full),match[1].split('#')[0])),rel+': '+match[1]);links++;}}
const value={status:'pass',archive,sha256:hash(fs.readFileSync(archive)),entries:entries.length,version:source.meta.version,manifestHash:source.manifestHash,roles:result.agents.map(a=>a.id),resolvedLinks:links,temp,checks:['own archive inventory/private-file exclusions','unpacked manifest and hashes','offline fresh preview/install with spaces and preserved local rule','packaged CLI lists all eight installed roles','repair idempotence','all payload Markdown links resolve'],limits:['Same-machine isolated fixture; no real external project, remote publication or client recognition tested','Role procedures DRAFT r1; no canonical promotion or independent subagent execution']};
if(reportFile)fs.writeFileSync(reportFile,JSON.stringify(value,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify(value,null,2));
