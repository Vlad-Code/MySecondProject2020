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

const dif = (firstConfig, secondConfig) => {
  const keysOfObject1 = Object.keys(firstConfig);
  const keysOfObject2 = Object.keys(secondConfig);
  const checkfirstConfig = keysOfObject1.reduce((acc, key) => {
    if (keysOfObject2.includes(key) && (isObject(firstConfig[key]))
    && (isObject(secondConfig[key]))) {
      acc[key] = dif(firstConfig[key], secondConfig[key]);
    } else {
      if (!keysOfObject2.includes(key)) {
        acc[key] = 'deleted';
      }
      if (keysOfObject2.includes(key)) {
        if (secondConfig[key] === firstConfig[key]) {
          acc[key] = 'not changed';
        } else {
          acc[key] = 'changed';
        }
      }
    }
    return acc;
  }, {});
  const checkSecondConfig = keysOfObject2.reduce((acc, key) => {
    if (keysOfObject1.includes(key) && (isObject(firstConfig[key])
      && isObject(secondConfig[key]))) {
      acc[key] = dif(firstConfig[key], secondConfig[key]);
    }
    if (!keysOfObject1.includes(key)) {
      acc[key] = 'added';
    }
    return acc;
  }, checkfirstConfig);
  return checkSecondConfig;
};

export default dif;
