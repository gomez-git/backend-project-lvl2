import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

export const genDiffFromJSON = (file1, file2) => {
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

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
  if (path.isAbsolute(filepath1) && path.isAbsolute(filepath2)) {
    return genDiffFromJSON(
      readFileSync(filepath1, 'utf8'),
      readFileSync(filepath2, 'utf8'),
    );
  }
  return genDiffFromJSON(
    readFileSync(path.resolve(filepath1), 'utf8'),
    readFileSync(path.resolve(filepath2), 'utf8'),
  );
};
