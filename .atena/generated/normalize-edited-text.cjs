const fs=require('fs');
const files=['AUTONOMY.md','CONTRACT.md','GAMES.md','INTERACTION.md','POLICIES.md','README.md','WORKFLOW.md','templates/AGENTS.md','templates/game/visual-bible.md','templates/spec/plan.md','templates/vault/add.yaml','.atena/add.yaml','example-project/.atena/add.yaml'];
for(const p of files){const s=fs.readFileSync(p,'utf8');fs.writeFileSync(p,s.replace(/\r+\n/g,'\n'),'utf8');}
console.log('Normalized line endings in '+files.length+' edited text files.');
