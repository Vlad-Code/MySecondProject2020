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
const getStringForJson = (diff, fileContent1, fileContent2) => {
  const normalizeDiff = diff.sort();
  const arrOfJsonStrings = normalizeDiff.map((node) => {
    const [key, state] = node;
    if (!isObject(state)) {
      switch (state) {
        case 'not changed':
          return `{"key":${stringify(key)}, "status":${stringify(state)}}`;
        case 'deleted':
          return `{"key":${stringify(key)}, "status":${stringify(state)}}`;
        case 'changed':
          return `{"key":${stringify(key)}, "status":${stringify(state)}, "value-before":${stringify(fileContent1[key])}, "value-after":${stringify(fileContent2[key])}}`;
        case 'added':
          return `{"key":${stringify(key)}, "status":${stringify(state)}, "value": ${stringify(fileContent2[key])}}`;
        default:
          throw new Error(`Unknown state: ${state}`);
      }
    }
    return `{"key":${stringify(key)}, "value":[${getStringForJson(state, fileContent1[key], fileContent2[key])}]}`;
  });
  return `${arrOfJsonStrings.join(', ')}`;
};
const getJson = (diff, fileContent1, fileContent2) => {
  const result = `[${getStringForJson(diff, fileContent1, fileContent2)}]`;
  const jsonFormat = JSON.parse(result);
  return JSON.stringify(jsonFormat);
};

export default getJson;
