import { isObject } from 'lodash';

const stringify = (value) => {
  if (isObject(value)) {
    return '[comlex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};
const iter = (diff, path = '') => {
  const accumulatedPath = diff.map((node) => {
    const [key, state] = node;
    if (!isObject(state)) {
      const pathToValue = `${path}${key}`;
      return { [pathToValue]: state };
    }
    const newPath = `${path}${key}.`;
    return iter(state, newPath);
  });
  return accumulatedPath;
};
const getValue = (path, object) => {
  const arrOfPath = path.split('.');
  const value = arrOfPath.reduce((acc, item) => {
    const newValue = acc[item];
    return newValue;
  }, object);
  return value;
};
const getPlain = (diff, fileContent1, fileContent2, path = '') => {
  const pathesAndValues = iter(diff, path).flat(Infinity).sort();
  const arrOfStr = pathesAndValues.map((item) => {
    const [accumulatedPath, state] = Object.entries(item).flat();
    switch (state) {
      case 'not changed':
        return `Property '${accumulatedPath}' was not changed`;
      case 'deleted':
        return `Property '${accumulatedPath}' was deleted`;
      case 'changed':
        return `Property '${accumulatedPath}' was changed from ${stringify(getValue(accumulatedPath, fileContent1))} to ${stringify(getValue(accumulatedPath, fileContent2))}`;
      case 'added':
        return `Property '${accumulatedPath}' was added with value: ${stringify(getValue(accumulatedPath, fileContent2))}`;
      default:
        throw new Error(`Unknown state: ${state}`);
    }
  });
  return arrOfStr.sort().join('\n');
};

export default getPlain;
