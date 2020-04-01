import fs from 'fs';

import gendiff from '../src/gendiff.js';

test('gendiff', () => {
  const firstConfig = 'before.json';
  const secondConfig = 'after.json';
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  expect(gendiff(firstConfig, secondConfig)).toEqual(result);
});
