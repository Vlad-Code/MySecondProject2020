import { uniq, isObject } from 'lodash';

const getDiff = (file1, file2) => {
  const keysOfFile1 = Object.keys(file1);
  const keysOfFile2 = Object.keys(file2);
  const commonKeys = uniq(keysOfFile1.concat(keysOfFile2));
  const diff = commonKeys.reduce((acc, key) => {
    if (isObject(file1[key]) && isObject(file2[key])) {
      return { ...acc, [key]: getDiff(file1[key], file2[key]) };
    }
    if (keysOfFile1.includes(key) && !keysOfFile2.includes(key)) {
      return { ...acc, [key]: 'deleted' };
    }
    if (!keysOfFile1.includes(key) && keysOfFile2.includes(key)) {
      return { ...acc, [key]: 'added' };
    }
    if (keysOfFile1.includes(key) && keysOfFile2.includes(key)) {
      if (file1[key] === file2[key]) {
        return { ...acc, [key]: 'not changed' };
      }
      return { ...acc, [key]: 'changed' };
    }
    return acc;
  }, {});
  return diff;
};

export default getDiff;
