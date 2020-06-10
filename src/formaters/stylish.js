import { isObject } from 'lodash';
import compareKeys from './normalize';

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
const getStylish = (parsedData1, parsedData2, diff, space) => {
  const normalizeDiff = diff.sort(compareKeys);
  const arrOfStr = normalizeDiff.map((node) => {
    const { key, type, children } = node;
    if (!children) {
      switch (type) {
        case 'not changed':
          return `${space}  ${key}: ${stringify(parsedData1[key], space)}`;
        case 'deleted':
          return `${space}- ${key}: ${stringify(parsedData1[key], space)}`;
        case 'changed':
          return [`${space}- ${key}: ${stringify(parsedData1[key], space)}`,
            `${space}+ ${key}: ${stringify(parsedData2[key], space)}`];
        case 'added':
          return `${space}+ ${key}: ${stringify(parsedData2[key], space)}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    }
    return `  ${space}${key}: {\n${getStylish(parsedData1[key], parsedData2[key], children, `${space}    `)}\n${space}  }`;
  });
  const result = arrOfStr.flat().join('\n');
  return result;
};
const getResultStylish = (parsedData1, parsedData2, diff, space) => `{\n${getStylish(parsedData1, parsedData2, diff, space)}\n}`;

export default getResultStylish;
