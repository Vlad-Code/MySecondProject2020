#!/usr/bin/env node

const programm = require('commander');

programm
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    console.log('test');
  })
  .parse(process.argv);

programm.help();

