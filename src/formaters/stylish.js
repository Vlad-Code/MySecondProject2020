import { isObject } from 'lodash';

const stringify = (value, space) => {
  if (!isObject(value)) {
    return value;
  }
  const keysOfObject = Object.keys(value);
  const arrOfStr = keysOfObject.reduce((acc, key) => [...acc, `      ${key}: ${value[key]}`], []);
  return `{\n${space}${arrOfStr.join('\n')}\n${space}  }`;
};
const getStylish = (diff, space) => {
  const keyStates = diff.map((node) => {
    const {
      key, type, children, value, valueBefore, valueAfter,
    } = node;
    switch (type) {
      case 'not changed':
        return `${space}  ${key}: ${stringify(value, space)}`;
      case 'deleted':
        return `${space}- ${key}: ${stringify(value, space)}`;
      case 'changed':
        return [`${space}- ${key}: ${stringify(valueBefore, space)}`,
          `${space}+ ${key}: ${stringify(valueAfter, space)}`];
      case 'added':
        return `${space}+ ${key}: ${stringify(value, space)}`;
      case 'parent':
        return `  ${space}${key}: {\n${getStylish(children, `${space}    `)}\n${space}  }`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  const result = keyStates.flat().join('\n');
  return result;
};
const getResultStylish = (diff, space) => `{\n${getStylish(diff, space)}\n}`;

export default getResultStylish;
