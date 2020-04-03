import fs from 'fs';

import gendiff from '../src/gendiff.js';

test('gendiff', () => {
  const firstConfig = `${__dirname}/../__fixtures__/before.json`;
  console.log(firstConfig);
  const secondConfig = `${__dirname}/../__fixtures__/after.json`;
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  expect(gendiff(firstConfig, secondConfig)).toEqual(result);
});
