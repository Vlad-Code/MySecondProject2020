import fs from 'fs';

import gendiff from '../src/index';


const firstConfigJSON = `${__dirname}/../__fixtures__/before-tree.json`;
const secondConfigJSON = `${__dirname}/../__fixtures__/after-tree.json`;
const firstConfigYAML = `${__dirname}/../__fixtures__/before-tree.yml`;
const secondConfigYAML = `${__dirname}/../__fixtures__/after-tree.yml`;
const firstConfigINI = `${__dirname}/../__fixtures__/before-tree.ini`;
const secondConfigINI = `${__dirname}/../__fixtures__/after-tree.ini`;

test('gendiff-stylish-for-all-formats', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result-tree.txt`, 'utf-8');
  expect(gendiff(firstConfigJSON, secondConfigJSON, 'stylish')).toEqual(result);
  expect(gendiff(firstConfigYAML, secondConfigYAML, 'stylish')).toEqual(result);
  expect(gendiff(firstConfigINI, secondConfigINI, 'stylish')).toEqual(result);
});

test('gendiff-plain-for-all-formats', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result-for-plain-format.txt`, 'utf-8');
  expect(gendiff(firstConfigJSON, secondConfigJSON, 'plain')).toEqual(result);
  expect(gendiff(firstConfigYAML, secondConfigYAML, 'plain')).toEqual(result);
  expect(gendiff(firstConfigINI, secondConfigINI, 'plain')).toEqual(result);
});

test('gendiff-json-for-all-formats', () => {
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result-for-json.json`, 'utf-8');
  expect(gendiff(firstConfigJSON, secondConfigJSON, 'json')).toEqual(result);
  expect(gendiff(firstConfigYAML, secondConfigYAML, 'json')).toEqual(result);
  expect(gendiff(firstConfigINI, secondConfigINI, 'json')).toEqual(result);
});
