import { isObject } from 'lodash';

const stringify = (object, space) => {
  if (isObject(object)) {
    const keysOfObject = Object.keys(object);
    const arrOfStr = keysOfObject.reduce((acc, key) => {
      acc.push(`      ${key}: ${object[key]}`);
      return acc;
    }, []);
    return `{\n${space}${arrOfStr.join('\n')}\n${space}  }`;
  }
  return object;
};
const getStylish = (firstConfig, secondConfig, diff, space) => {
  const keysOfDiff = Object.keys(diff).sort();
  const arrOfStr = keysOfDiff.reduce((acc, key) => {
    if (isObject(diff[key])) {
      acc.push(`  ${space}${key}: {\n${getStylish(firstConfig[key], secondConfig[key], diff[key], `${space}    `)}\n${space}  }`);
    } else {
      switch (diff[key]) {
        case 'not changed':
          acc.push(`${space}  ${key}: ${stringify(firstConfig[key], space)}`);
          break;
        case 'deleted':
          acc.push(`${space}- ${key}: ${stringify(firstConfig[key], space)}`);
          break;
        case 'changed':
          acc.push(`${space}- ${key}: ${stringify(firstConfig[key], space)}`);
          acc.push(`${space}+ ${key}: ${stringify(secondConfig[key], space)}`);
          break;
        case 'added':
          acc.push(`${space}+ ${key}: ${stringify(secondConfig[key], space)}`);
          break;
        default:
          return null;
      }
    }
    return acc;
  }, []);
  const result = arrOfStr.join('\n');
  return result;
};
const getResultStylish = (firstConfig, secondConfig, diff, space) => `{\n${getStylish(firstConfig, secondConfig, diff, space)}\n}`;

export default getResultStylish;
