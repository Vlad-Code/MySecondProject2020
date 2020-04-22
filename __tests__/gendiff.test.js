import fs from 'fs';

import parseFile from '../src/parsers';

import dif from '../src/dif';

import resultRender from '../src/gendiff-for-tree';

test('gendiff-tree', () => {
  const firstConfig = `${__dirname}/../__fixtures__/before-tree.json`;
  const secondConfig = `${__dirname}/../__fixtures__/after-tree.json`;
  const object1 = parseFile(firstConfig);
  const object2 = parseFile(secondConfig);
  const diff = dif(object1, object2);
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result-tree.txt`, 'utf-8');
  expect(resultRender(object1, object2, diff, '  ')).toEqual(result);
});
