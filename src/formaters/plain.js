import isObject from '../isObject';

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
  const arrOfKeys = Object.keys(diff);
  return arrOfKeys.map((key) => {
    if (!isObject(diff[key])) {
      return `${path}${key}`;
    }
    const newPath = `${path}${key}.`;
    return iter(diff[key], newPath);
  });
};
const getValue = (path, object) => {
  const arrOfPath = path.split('.');
  const value = arrOfPath.reduce((acc, item) => {
    const newValue = acc[item];
    return newValue;
  }, object);
  return value;
};
const getPlain = (diff, firstConfig, secondConfig, path = '') => {
  const pathes = iter(diff, path).flat(Infinity).sort();
  const arrOfStr = pathes.map((item) => {
    switch (getValue(item, diff)) {
      case 'not changed':
        return `Property '${item}' was not changed`;
      case 'deleted':
        return `Property '${item}' was deleted`;
      case 'changed':
        return `Property '${item}' was changed from ${stringify(getValue(item, firstConfig))} to ${stringify(getValue(item, secondConfig))}`;
      case 'added':
        return `Property '${item}' was added with value: ${stringify(getValue(item, secondConfig))}`;
      default:
        return null;
    }
  });
  return arrOfStr.join('\n');
};

export default getPlain;
