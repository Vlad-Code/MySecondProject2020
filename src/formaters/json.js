import { isObject } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) {
    const keysOfValue = Object.keys(value);
    const arrOfStrings = keysOfValue.map((key) => `"${key}": "${value[key]}"`);
    return `{ ${arrOfStrings.join(',')} }`;
  }
  if (typeof (value) === 'string') {
    return `"${value}"`;
  }
  return value;
};
const compareKeys = (node1, node2) => {
  if (node1.key > node2.key) {
    return 1;
  }
  if (node1.key < node2.key) {
    return -1;
  }
  return 0;
};
const getStringForJson = (diff, fileContent1, fileContent2) => {
  const normalizeDiff = diff.sort(compareKeys);
  const arrOfJsonStrings = normalizeDiff.map((node) => {
    const { key, type, children } = node;
    if (!children) {
      switch (type) {
        case 'not changed':
          return `{"key":${stringify(key)}, "status":${stringify(type)}}`;
        case 'deleted':
          return `{"key":${stringify(key)}, "status":${stringify(type)}}`;
        case 'changed':
          return `{"key":${stringify(key)}, "status":${stringify(type)}, "value-before":${stringify(fileContent1[key])}, "value-after":${stringify(fileContent2[key])}}`;
        case 'added':
          return `{"key":${stringify(key)}, "status":${stringify(type)}, "value": ${stringify(fileContent2[key])}}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    }
    return `{"key":${stringify(key)}, "value":[${getStringForJson(children, fileContent1[key], fileContent2[key])}]}`;
  });
  return `${arrOfJsonStrings.join(', ')}`;
};
const getJson = (diff, fileContent1, fileContent2) => {
  const result = `[${getStringForJson(diff, fileContent1, fileContent2)}]`;
  const jsonFormat = JSON.parse(result);
  return JSON.stringify(jsonFormat);
};

export default getJson;
