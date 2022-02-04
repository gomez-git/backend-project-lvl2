import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './build-diff-tree.js';
import formatDiffTree from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  const getExtention = (filepath) => path.extname(filepath);
  const getNewFilepath = (filepath) => (
    path.isAbsolute(filepath)
      ? filepath
      : path.resolve(filepath)
  );
  const parsedFile1 = parse(
    getExtention(filepath1),
    readFileSync(getNewFilepath(filepath1), 'utf8'),
  );
  const parsedFile2 = parse(
    getExtention(filepath2),
    readFileSync(getNewFilepath(filepath2), 'utf8'),
  );
  const diffTree = buildDiffTree(parsedFile1, parsedFile2);
  const formattedDiff = formatDiffTree(format, diffTree);

  return formattedDiff;
};
