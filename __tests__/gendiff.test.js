import fs from 'fs';
import path from 'path';
import gendiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['ini', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
  ['ini', 'json'],
])('gendiff(%s, %s)', (formatOfFile, formatOfResult) => {
  const pathToFile1 = getFixturePath(`before-tree.${formatOfFile}`);
  const pathToFile12 = getFixturePath(`after-tree.${formatOfFile}`);
  const results = ['result-for-stylish-format.txt', 'result-for-plain-format.txt', 'result-for-json-format.json'];
  const nameOfResultFile = results.filter((result) => result.includes(`${formatOfResult}`)).join();
  const expected = readFile(nameOfResultFile);
  expect(gendiff(pathToFile1, pathToFile12, formatOfResult)).toEqual(expected);
});
