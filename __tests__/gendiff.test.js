import fs from 'fs';

import gendiff from '../src/gendiff';


const firstConfigJSON = `${__dirname}/../__fixtures__/before-tree.json`;
const secondConfigJSON = `${__dirname}/../__fixtures__/after-tree.json`;
const firstConfigYAML = `${__dirname}/../__fixtures__/before-tree.yml`;
const secondConfigYAML = `${__dirname}/../__fixtures__/after-tree.yml`;
const firstConfigINI = `${__dirname}/../__fixtures__/before-tree.ini`;
const secondConfigINI = `${__dirname}/../__fixtures__/after-tree.ini`;

test('gendiff-tree-for-all-formats', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result-tree.txt`, 'utf-8');
  expect(gendiff(firstConfigJSON, secondConfigJSON, 'default')).toEqual(result);
  expect(gendiff(firstConfigYAML, secondConfigYAML, 'default')).toEqual(result);
  expect(gendiff(firstConfigINI, secondConfigINI, 'default')).toEqual(result);
});

test('gendiff-plain-for-all-formats', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result-for-plain-format.txt`, 'utf-8');
  expect(gendiff(firstConfigJSON, secondConfigJSON, 'plain')).toEqual(result);
  expect(gendiff(firstConfigYAML, secondConfigYAML, 'plain')).toEqual(result);
  expect(gendiff(firstConfigINI, secondConfigINI, 'plain')).toEqual(result);
});
