import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './build-diff-tree.js';
import formatDiffTree from './formatters/index.js';

const getObject = (pathToFile) => {
  const fullPathToFile = path.resolve(pathToFile);
  const extention = path.extname(pathToFile);
  const data = readFileSync(fullPathToFile, 'utf8');
  const object = parse(data, extention);

  return object;
};

export default (pathToFile1, pathToFile2, format, replacer = '    ') => {
  const config1 = getObject(pathToFile1);
  const config2 = getObject(pathToFile2);

  const diffTree = buildDiffTree(config1, config2);
  const formattedDiff = formatDiffTree(diffTree, format, replacer);

  return formattedDiff;
};
