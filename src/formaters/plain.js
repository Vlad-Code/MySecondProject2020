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
    return '[comlex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};
const iter = (dif, path = '') => {
  const arrOfKeys = Object.keys(dif);
  return arrOfKeys.map((key) => {
    if (!isObject(dif[key])) {
      return `${path}${key}`;
    }
    const newPath = `${path}${key}.`;
    return iter(dif[key], newPath);
  });
};
const getValue = (path, object) => {
  const arr = path.split('.');
  const value = arr.reduce((acc, item) => {
    const value1 = acc[item];
    return value1;
  }, object);
  return value;
};
const plain = (dif, firstConfig, secondConfig, path = '') => {
  const pathes = iter(dif, path).flat(Infinity).sort();
  const arr = pathes.map((item) => {
    switch (getValue(item, dif)) {
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
  return arr.join('\n');
};

export default plain;
