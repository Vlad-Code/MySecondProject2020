import isObject from './isObject';

const getDiff = (firstConfig, secondConfig) => {
  const keysOfFile1 = Object.keys(firstConfig);
  const keysOfFile2 = Object.keys(secondConfig);
  const checkfirstConfig = keysOfFile1.reduce((acc, key) => {
    if (keysOfFile2.includes(key) && (isObject(firstConfig[key]))
    && (isObject(secondConfig[key]))) {
      acc[key] = getDiff(firstConfig[key], secondConfig[key]);
    } else {
      if (!keysOfFile2.includes(key)) {
        acc[key] = 'deleted';
      }
      if (keysOfFile2.includes(key)) {
        if (secondConfig[key] === firstConfig[key]) {
          acc[key] = 'not changed';
        } else {
          acc[key] = 'changed';
        }
      }
    }
    return acc;
  }, {});
  const checkSecondConfig = keysOfFile2.reduce((acc, key) => {
    if (keysOfFile1.includes(key) && (isObject(firstConfig[key])
      && isObject(secondConfig[key]))) {
      acc[key] = getDiff(firstConfig[key], secondConfig[key]);
    }
    if (!keysOfFile1.includes(key)) {
      acc[key] = 'added';
    }
    return acc;
  }, checkfirstConfig);
  return checkSecondConfig;
};

export default getDiff;
