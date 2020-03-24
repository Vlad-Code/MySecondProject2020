#!/usr/bin/env node

const programm = require('commander');

programm
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);

if (!programm.args.length) programm.help();
