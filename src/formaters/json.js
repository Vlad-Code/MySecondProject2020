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
const stringify = (value) => {
  if (isObject(value)) {
    const keys = Object.keys(value);
    const arr = keys.reduce((acc, key) => {
      acc.push(`"${key}": "${value[key]}"`);
      return acc;
    }, []);
    return `{ ${arr.join(',')} }`;
  }
  if (typeof (value) === 'string') {
    return `"${value}"`;
  }
  return value;
};
const getStringForJson = (dif, firstConfig, secondConfig) => {
  const keysOfDif = Object.keys(dif).sort();
  const arr = keysOfDif.reduce((acc, key) => {
    if (!isObject(dif[key])) {
      switch (dif[key]) {
        case 'not changed':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(dif[key])}}`);
          break;
        case 'deleted':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(dif[key])}}`);
          break;
        case 'changed':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(dif[key])}, "value-before":${stringify(firstConfig[key])}, "value-after":${stringify(secondConfig[key])}}`);
          break;
        case 'added':
          acc.push(`{"key":${stringify(key)}, "status":${stringify(dif[key])}, "value": ${stringify(secondConfig[key])}}`);
          break;
        default:
          return null;
      }
    } else {
      acc.push(`{"key":${stringify(key)}, "value":[${getStringForJson(dif[key], firstConfig[key], secondConfig[key])}]}`);
    }
    return acc;
  }, []);
  return `${arr.join(', ')}`;
};
const getJson = (dif, firstConfig, secondConfig) => {
  const result = `[${getStringForJson(dif, firstConfig, secondConfig)}]`;
  const jsonFormat = JSON.parse(result);
  return JSON.stringify(jsonFormat);
};

export default getJson;
