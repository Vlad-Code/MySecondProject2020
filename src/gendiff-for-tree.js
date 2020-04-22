const isObject = (value) => {
  const isArray = Object.prototype.toString.call(value) === '[object Array]';
  if (value === null) {
    return false;
  }
  if (typeof (value) === 'object' && isArray === false) {
    return true;
  }
  return false;
};
const stringify = (object, space) => {
  if (isObject(object)) {
    const keys = Object.keys(object);
    const arr = keys.reduce((acc, key) => {
      acc.push(`      ${key}: ${object[key]}`);
      return acc;
    }, []);
    return `{\n${space}${arr.join('\n')}\n${space}  }`;
  }
  return object;
};
const render = (firstConfig, secondConfig, dif, space) => {
  const keysOfDif = Object.keys(dif).sort();
  const arrOfStr = keysOfDif.reduce((acc, key) => {
    if (isObject(dif[key])) {
      acc.push(`  ${space}${key}: {\n${render(firstConfig[key], secondConfig[key], dif[key], `${space}    `)}\n${space}  }`);
    } else {
      switch (dif[key]) {
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
const resultRender = (firstConfig, secondConfig, dif, space) => `{\n${render(firstConfig, secondConfig, dif, space)}\n}`;

export default resultRender;
