import dif from './dif';

import parseFile from './parsers';

import resultRender from './formaters/render';

import plain from './formaters/plain';

import getJson from './formaters/json';

const gendiff = (firstConfig, secondConfig, format) => {
  const object1 = parseFile(firstConfig);
  const object2 = parseFile(secondConfig);
  const diff = dif(object1, object2);
  if (format === 'default') {
    return resultRender(object1, object2, diff, '  ');
  }
  if (format === 'plain') {
    return plain(diff, object1, object2);
  }
  if (format === 'json') {
    return getJson(diff, object1, object2);
  }
  return null;
};

export default gendiff;
