import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';

const getSortedUniqKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const mergedKeys = [...keys1, ...keys2];
  const uniqKeys = _.uniq(mergedKeys);
  const sortedUniqKeys = _.sortBy(uniqKeys);

  return sortedUniqKeys;
};

export const genDiffFromFiles = (file1, file2, ext1, ext2) => {
  const object1 = parse(ext1, file1);
  const object2 = parse(ext2, file2);

  const iter = (obj1, obj2) => getSortedUniqKeys(obj1, obj2)
    .map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
          return [{ key, value: iter(obj1[key], obj2[key]), status: 'unchanged' }];
        }
        if (obj1[key] === obj2[key]) {
          return [{ key, value: obj1[key], status: 'unchanged' }];
        }
        return [{ key, value: [obj1[key], obj2[key]], status: 'changed' }];
      }
      if (!_.has(obj2, key)) {
        return [{ key, value: obj1[key], status: 'removed' }];
      }
      return [{ key, value: obj2[key], status: 'added' }];
    });

  return iter(object1, object2);
};

export default (filepath1, filepath2) => {
  const extention1 = path.extname(filepath1);
  const extention2 = path.extname(filepath2);

  if (path.isAbsolute(filepath1) && path.isAbsolute(filepath2)) {
    return genDiffFromFiles(
      readFileSync(filepath1, 'utf8'),
      readFileSync(filepath2, 'utf8'),
      extention1,
      extention2,
    );
  }
  return genDiffFromFiles(
    readFileSync(path.resolve(filepath1), 'utf8'),
    readFileSync(path.resolve(filepath2), 'utf8'),
    extention1,
    extention2,
  );
};
