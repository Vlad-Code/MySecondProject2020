import { union, isObject, has } from 'lodash';

const compareKeys = (node1, node2) => {
  if (node1.key > node2.key) {
    return 1;
  }
  if (node1.key < node2.key) {
    return -1;
  }
  return 0;
};
const getDiff = (object1, object2) => {
  const commonKeys = union(Object.keys(object1), Object.keys(object2));
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
  const sortedDiff = diff.sort(compareKeys);
  return sortedDiff;
};

export default getDiff;
