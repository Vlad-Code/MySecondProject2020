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

export default isObject;
