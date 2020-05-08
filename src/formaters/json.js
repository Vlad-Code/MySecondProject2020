import isObject from '../isObject';

const stringify = (value) => {
  if (isObject(value)) {
    const keysOfValue = Object.keys(value);
    const arrOfStr = keysOfValue.reduce((acc, key) => {
      acc.push(`"${key}": "${value[key]}"`);
      return acc;
    }, []);
    return `{ ${arrOfStr.join(',')} }`;
  }
  if (typeof (value) === 'string') {
    return `"${value}"`;
  }
  return value;
};
const getStringForJson = (diff, firstConfig, secondConfig) => {
  const keysOfDiff = Object.keys(diff).sort();
  const arrOfJsons = keysOfDiff.reduce((acc, key) => {
    if (!isObject(diff[key])) {
      switch (diff[key]) {
        case 'not changed':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(diff[key])}}`);
          break;
        case 'deleted':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(diff[key])}}`);
          break;
        case 'changed':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(diff[key])}, "value-before":${stringify(firstConfig[key])}, "value-after":${stringify(secondConfig[key])}}`);
          break;
        case 'added':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(diff[key])}, "value": ${stringify(secondConfig[key])}}`);
          break;
        default:
          return null;
      }
    } else {
      acc.push(`{"key":${stringify(key)}, "value":[${getStringForJson(diff[key], firstConfig[key], secondConfig[key])}]}`);
    }
    return acc;
  }, []);
  return `${arrOfJsons.join(', ')}`;
};
const getJson = (diff, firstConfig, secondConfig) => {
  const result = `[${getStringForJson(diff, firstConfig, secondConfig)}]`;
  const jsonFormat = JSON.parse(result);
  return JSON.stringify(jsonFormat);
};

export default getJson;
