import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './build-diff-tree.js';
import formatDiffTree from './formatters/index.js';

export default (pathToFile1, pathToFile2, format) => {
  const getFullFilepath = (pathToFile) => (
    path.isAbsolute(pathToFile)
      ? pathToFile
      : path.resolve(pathToFile)
  );
  const fullPathToFile1 = getFullFilepath(pathToFile1);
  const fullPathToFile2 = getFullFilepath(pathToFile2);

  const extention1 = path.extname(pathToFile1);
  const extention2 = path.extname(pathToFile2);

  const config1 = parse(
    extention1,
    readFileSync(fullPathToFile1, 'utf8'),
  );
  const config2 = parse(
    extention2,
    readFileSync(fullPathToFile2, 'utf8'),
  );
  const diffTree = buildDiffTree(config1, config2);
  const formattedDiff = formatDiffTree(format, diffTree);

  return formattedDiff;
};
