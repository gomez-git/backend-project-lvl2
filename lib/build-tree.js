import _ from 'lodash';
import parse from './parsers.js';

const getSortedUniqKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const mergedKeys = [...keys1, ...keys2];
  const uniqKeys = _.uniq(mergedKeys);
  const sortedUniqKeys = _.sortBy(uniqKeys);

  return sortedUniqKeys;
};

export default (file1, file2, ext1, ext2) => {
  const object1 = parse(ext1, file1);
  const object2 = parse(ext2, file2);

  const makeParent = (name, status, children) => ({
    name, type: 'parent', status, children,
  });
  const makeChild = (name, status, value) => ({
    name, type: 'child', status, value,
  });

  const iter = (obj1, obj2) => getSortedUniqKeys(obj1, obj2)
    .map((key) => {
      if (!_.has(obj2, key)) {
        return makeChild(key, 'deleted', obj1[key]);
      }
      if (!_.has(obj1, key)) {
        return makeChild(key, 'added', obj2[key]);
      }
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        return makeParent(key, 'unchanged', iter(obj1[key], obj2[key]));
      }
      return obj1[key] === obj2[key]
        ? makeChild(key, 'unchanged', obj1[key])
        : makeChild(key, 'changed', { oldValue: obj1[key], newValue: obj2[key] });
    });

  return iter(object1, object2);
};
