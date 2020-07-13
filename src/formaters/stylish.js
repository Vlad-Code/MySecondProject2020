import { isObject } from 'lodash';

const stringify = (value, space) => {
  if (!isObject(value)) {
    return value;
  }
  const keysOfObject = Object.keys(value);
  const comlexValues = keysOfObject.map((key) => `      ${key}: ${value[key]}`);
  return `{\n${space}${comlexValues.join('\n')}\n${space}  }`;
};
const getStylish = (diff, space) => {
  const keyStates = diff.flatMap((node) => {
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
  const result = keyStates.join('\n');
  return result;
};
const getResultStylish = (diff, space) => `{\n${getStylish(diff, space)}\n}`;

export default getResultStylish;
