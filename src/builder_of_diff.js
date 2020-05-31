import { uniq, isObject } from 'lodash';

const getDiff = (fileContent1, fileContent2) => {
  const keysOfFileContent1 = Object.keys(fileContent1);
  const keysOfFileContent2 = Object.keys(fileContent2);
  const commonKeys = uniq(keysOfFileContent1.concat(keysOfFileContent2));
  const diff = commonKeys.map((key) => {
    if (isObject(fileContent1[key]) && isObject(fileContent2[key])) {
      return [key, getDiff(fileContent1[key], fileContent2[key])];
    }
    if (keysOfFileContent1.includes(key) && !keysOfFileContent2.includes(key)) {
      return [key, 'deleted'];
    }
    if (!keysOfFileContent1.includes(key) && keysOfFileContent2.includes(key)) {
      return [key, 'added'];
    }
    if (fileContent1[key] === fileContent2[key]) {
      return [key, 'not changed'];
    }
    return [key, 'changed'];
  });
  return diff;
};

export default getDiff;
