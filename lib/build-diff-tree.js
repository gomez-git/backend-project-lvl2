import _ from 'lodash';

const getSortedUniqKeys = (obj1, obj2) => {
  const unionUniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedUniqKeys = _.sortBy(unionUniqKeys);

  return sortedUniqKeys;
};

const makeNestedNode = (name, status, children) => ({ name, status, children });
const makeFlatNode = (name, status, value) => ({ name, status, value });

const buildDiffTree = (obj1, obj2) => getSortedUniqKeys(obj1, obj2)
  .map((key) => {
    switch (true) {
      case _.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]):
        return makeNestedNode(key, 'nested', buildDiffTree(obj1[key], obj2[key]));
      case !_.has(obj2, key):
        return makeFlatNode(key, 'deleted', obj1[key]);
      case !_.has(obj1, key):
        return makeFlatNode(key, 'added', obj2[key]);
      case obj1[key] === obj2[key]:
        return makeFlatNode(key, 'unchanged', obj1[key]);
      default:
        return makeFlatNode(key, 'changed', { oldValue: obj1[key], newValue: obj2[key] });
    }
  });

export default buildDiffTree;
