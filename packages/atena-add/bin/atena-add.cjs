#!/usr/bin/env node
'use strict';
const {main}=require('../lib/cli.cjs');
try { console.log(JSON.stringify(main(process.argv.slice(2)),null,2)); }
catch(e){console.error(e.message);process.exitCode=1;}
