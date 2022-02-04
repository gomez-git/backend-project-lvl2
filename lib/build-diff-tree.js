import _ from 'lodash';

const getSortedUniqKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const mergedKeys = [...keys1, ...keys2];
  const uniqKeys = _.uniq(mergedKeys);
  const sortedUniqKeys = _.sortBy(uniqKeys);

  return sortedUniqKeys;
};

const makeNested = (name, status, children) => ({ name, status, children });
const makeFlat = (name, status, value) => ({ name, status, value });

const buildDiffTree = (obj1, obj2) => getSortedUniqKeys(obj1, obj2)
  .map((key) => {
    if (!_.has(obj2, key)) {
      return makeFlat(key, 'deleted', obj1[key]);
    }
    if (!_.has(obj1, key)) {
      return makeFlat(key, 'added', obj2[key]);
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return makeNested(key, 'nested', buildDiffTree(obj1[key], obj2[key]));
    }
    return obj1[key] === obj2[key]
      ? makeFlat(key, 'unchanged', obj1[key])
      : makeFlat(key, 'changed', { oldValue: obj1[key], newValue: obj2[key] });
  });

export default buildDiffTree;
