import { union, isObject, has } from 'lodash';

const getDiff = (object1, object2) => {
  const commonKeys = union(Object.keys(object1), Object.keys(object2)).sort();
  const diff = commonKeys.map((key) => {
    if (!has(object1, key)) {
      return { key, type: 'added', value: object2[key] };
    }
    if (!has(object2, key)) {
      return { key, type: 'deleted', value: object1[key] };
    }
    if (isObject(object1[key]) && isObject(object2[key])) {
      return { key, type: 'parent', children: getDiff(object1[key], object2[key]) };
    }
    if (object1[key] === object2[key]) {
      return { key, type: 'not changed', value: object1[key] };
    }
    return {
      key, type: 'changed', valueBefore: object1[key], valueAfter: object2[key],
    };
  });
  return diff;
};

export default getDiff;
