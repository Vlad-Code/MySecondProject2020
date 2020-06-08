import { union, isObject, has } from 'lodash';

const getDiff = (object1, object2) => {
  const commonKeys = union(Object.keys(object1), Object.keys(object2));
  const diff = commonKeys.map((key) => {
    if (object1[key] && object2[key]) {
      if (isObject(object1[key]) && isObject(object2[key])) {
        return { key, type: 'unknown', children: getDiff(object1[key], object2[key]) };
      }
      if (object1[key] === object2[key]) {
        return { key, type: 'not changed' };
      }
      return { key, type: 'changed' };
    }
    if (has(object1, key) && !has(object2, key)) {
      return { key, type: 'deleted' };
    }
    return { key, type: 'added' };
  });
  return diff;
};

export default getDiff;
