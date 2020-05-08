import getDiff from './getDiff';

import parseFile from './parsers';

import getResultStylish from './formaters/stylish';

import getPlain from './formaters/plain';

import getJson from './formaters/json';

const gendiff = (firstConfig, secondConfig, format) => {
  const object1 = parseFile(firstConfig);
  const object2 = parseFile(secondConfig);
  const diff = getDiff(object1, object2);
  if (format === 'stylish') {
    return getResultStylish(object1, object2, diff, '  ');
  }
  if (format === 'plain') {
    return getPlain(diff, object1, object2);
  }
  if (format === 'json') {
    return getJson(diff, object1, object2);
  }
  return null;
};

export default gendiff;
