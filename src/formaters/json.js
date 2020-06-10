import { isObject } from 'lodash';
import compareKeys from './normalize';

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
const getStringForJson = (diff, parsedData1, parsedData2) => {
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
          return `{"key":${stringify(key)}, "status":${stringify(type)}, "value-before":${stringify(parsedData1[key])}, "value-after":${stringify(parsedData2[key])}}`;
        case 'added':
          return `{"key":${stringify(key)}, "status":${stringify(type)}, "value": ${stringify(parsedData2[key])}}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    }
    return `{"key":${stringify(key)}, "value":[${getStringForJson(children, parsedData1[key], parsedData2[key])}]}`;
  });
  return `${arrOfJsonStrings.join(', ')}`;
};
const getJson = (diff, parsedData1, parsedData2) => {
  const result = `[${getStringForJson(diff, parsedData1, parsedData2)}]`;
  const jsonFormat = JSON.parse(result);
  return JSON.stringify(jsonFormat);
};

export default getJson;
