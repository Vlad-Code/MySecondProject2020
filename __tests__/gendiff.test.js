import fs from 'fs';
import path from 'path';
import gendiff from '../src/index';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const beforeJson = getFixturePath('before-tree.json');
const afterJson = getFixturePath('after-tree.json');
const beforeYaml = getFixturePath('before-tree.yml');
const afterYaml = getFixturePath('after-tree.yml');
const beforeIni = getFixturePath('before-tree.ini');
const afterIni = getFixturePath('after-tree.ini');
const expectedStylish = readFile('result-for-stylish-format.txt');
const expectedPlain = readFile('result-for-plain-format.txt');
const expectedJson = readFile('result-for-json-format.json');
const formatStylish = 'stylish';
const formatPlain = 'plain';
const formatJson = 'json';


test.each`
  before        | after        | format           | expected
  ${beforeJson} | ${afterJson} | ${formatStylish} | ${expectedStylish}
  ${beforeYaml} | ${afterYaml} | ${formatStylish} | ${expectedStylish}
  ${beforeIni}  | ${afterIni}  | ${formatStylish} | ${expectedStylish}
  ${beforeJson} | ${afterJson} | ${formatPlain}   | ${expectedPlain}
  ${beforeYaml} | ${afterYaml} | ${formatPlain}   | ${expectedPlain}
  ${beforeIni}  | ${afterIni}  | ${formatPlain}   | ${expectedPlain}
  ${beforeJson} | ${afterJson} | ${formatJson}    | ${expectedJson}
  ${beforeYaml} | ${afterYaml} | ${formatJson}    | ${expectedJson}
  ${beforeIni}  | ${afterIni}  | ${formatJson}    | ${expectedJson}   
`('gendiff of json, yaml, ini files for $format output', ({
  before, after, format, expected,
}) => {
  expect(gendiff(before, after, format)).toEqual(expected);
});
