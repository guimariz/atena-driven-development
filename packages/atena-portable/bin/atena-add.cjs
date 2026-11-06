#!/usr/bin/env node
'use strict';
const {main,format}=require('../lib/cli.cjs');
try { const args=process.argv.slice(2),result=main(args); console.log(format(result,args)); if(result.action==='doctor'&&!result.ok)process.exitCode=1; }
catch(e) { console.error(e.message); process.exitCode=1; }
