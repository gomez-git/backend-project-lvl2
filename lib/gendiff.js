import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';

export const genDiff = (file1, file2, ext1, ext2) => {
  const obj1 = parse(ext1)(file1);
  const obj2 = parse(ext2)(file2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const mergedKeys = [...keys1, ...keys2];
  const filteredKeys = _.uniq(mergedKeys);
  const sortedKeys = _.sortBy(filteredKeys);

  const diff = sortedKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`    ${key}: ${obj1[key]}`);
      } else {
        acc.push(`  - ${key}: ${obj1[key]}`);
        acc.push(`  + ${key}: ${obj2[key]}`);
      }
    } else if (!_.has(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}`);
    } else {
      acc.push(`  + ${key}: ${obj2[key]}`);
    }

    return acc;
  }, ['{']);
  diff.push('}');
  return diff.join('\n');
};

export default (filepath1, filepath2) => {
  const extention1 = path.extname(filepath1);
  const extention2 = path.extname(filepath2);

  if (path.isAbsolute(filepath1) && path.isAbsolute(filepath2)) {
    return genDiff(
      readFileSync(filepath1, 'utf8'),
      readFileSync(filepath2, 'utf8'),
      extention1,
      extention2,
    );
  }
  return genDiff(
    readFileSync(path.resolve(filepath1), 'utf8'),
    readFileSync(path.resolve(filepath2), 'utf8'),
    extention1,
    extention2,
  );
};
