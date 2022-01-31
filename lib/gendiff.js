import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatter from './formatters/index.js';

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
      switch (true) {
        case !_.has(obj2, key):
          return { key, value: obj1[key], status: 'removed' };
        case !_.has(obj1, key):
          return { key, value: obj2[key], status: 'added' };
        case obj1[key] === obj2[key]:
          return { key, value: obj1[key], status: 'unchanged' };
        case obj1[key] instanceof Object && obj2[key] instanceof Object:
          return { key, value: iter(obj1[key], obj2[key]), status: 'unchanged' };
        default:
          return {
            key, oldValue: obj1[key], newValue: obj2[key], status: 'changed',
          };
      }
    });

  return iter(object1, object2);
};

export default (filepath1, filepath2, format) => {
  const getExtention = (filepath) => path.extname(filepath);
  const getNewFilepath = (filepath) => (
    path.isAbsolute(filepath)
      ? filepath
      : path.resolve(filepath)
  );
  const diff = genDiffFromFiles(
    readFileSync(getNewFilepath(filepath1), 'utf8'),
    readFileSync(getNewFilepath(filepath2), 'utf8'),
    getExtention(filepath1),
    getExtention(filepath2),
  );
  const formattedDiff = formatter(format, diff);

  return formattedDiff;
};
