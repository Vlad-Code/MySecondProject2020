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
const getPlainNodes = (diff, path = '') => {
  const plainNodes = diff.map((node) => {
    const { key, type, children } = node;
    if (type !== 'parent') {
      const accPath = `${path}${key}`;
      return { ...node, key: accPath };
    }
    const newPath = `${path}${key}.`;
    return getPlainNodes(children, newPath);
  });
  return plainNodes.flat(Infinity);
};
const getPlain = (diff, path = '') => {
  const plainNodes = getPlainNodes(diff, path);
  const strings = plainNodes.map((node) => {
    const {
      key, type, value, valueBefore, valueAfter,
    } = node;
    switch (type) {
      case 'not changed':
        return `Property '${key}' was not changed`;
      case 'deleted':
        return `Property '${key}' was deleted`;
      case 'changed':
        return `Property '${key}' was changed from ${stringify(valueBefore)} to ${stringify(valueAfter)}`;
      case 'added':
        return `Property '${key}' was added with value: ${stringify(value)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return strings.join('\n');
};

export default getPlain;
