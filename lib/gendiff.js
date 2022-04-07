import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './build-diff-tree.js';
import formatDiffTree from './formatters/index.js';

export default (pathToFile1, pathToFile2, format) => {
  const fullPathToFile1 = path.resolve(pathToFile1);
  const fullPathToFile2 = path.resolve(pathToFile2);

  const extention1 = path.extname(pathToFile1);
  const extention2 = path.extname(pathToFile2);

  const config1 = parse(
    readFileSync(fullPathToFile1, 'utf8'),
    extention1,
  );
  const config2 = parse(
    readFileSync(fullPathToFile2, 'utf8'),
    extention2,
  );

  const diffTree = buildDiffTree(config1, config2);
  const formattedDiff = formatDiffTree(diffTree, format);

  return formattedDiff;
};
