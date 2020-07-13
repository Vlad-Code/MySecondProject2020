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
  const plainNodes = diff.flatMap((node) => {
    const {
      key, type, children, value, valueBefore, valueAfter,
    } = node;
    const accamulatedPath = `${path}${key}`;
    switch (type) {
      case 'added':
        return { key: accamulatedPath, type, value };
      case 'deleted':
        return { key: accamulatedPath, type };
      case 'not changed':
        return { key: accamulatedPath, type };
      case 'changed':
        return {
          key: accamulatedPath, type, valueBefore, valueAfter,
        };
      case 'parent':
        return getPlainNodes(children, `${accamulatedPath}.`);
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return plainNodes;
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
