import fs from 'fs';

import gendiff from '../src/gendiff.js';

test('gendiff-json', () => {
  const firstConfig = `${__dirname}/../__fixtures__/before.json`;
  const secondConfig = `${__dirname}/../__fixtures__/after.json`;
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  expect(gendiff(firstConfig, secondConfig)).toEqual(result);
});

test('gendiff-yml', () => {
  const firstConfig = `${__dirname}/../__fixtures__/before.yml`;
  const secondConfig = `${__dirname}/../__fixtures__/after.yml`;
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result.txt`, 'utf-8');
  expect(gendiff(firstConfig, secondConfig)).toEqual(result);
});
