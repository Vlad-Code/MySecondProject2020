#!/usr/bin/env node
import dif from '../dif';

import resultRender from '../gendiff-for-tree';

import parseFile from '../parsers';

const program = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig) => {
    const object1 = parseFile(firstConfig);
    const object2 = parseFile(secondConfig);
    const diff = dif(object1, object2);
    console.log(resultRender(object1, object2, diff, '  '));
  })
  .parse(process.argv);

if (!program.args.length) program.help();
