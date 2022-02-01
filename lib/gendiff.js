import { readFileSync } from 'fs';
import path from 'path';
import buildTree from './build-tree.js';
import formatTree from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  const getExtention = (filepath) => path.extname(filepath);
  const getNewFilepath = (filepath) => (
    path.isAbsolute(filepath)
      ? filepath
      : path.resolve(filepath)
  );
  const diff = buildTree(
    readFileSync(getNewFilepath(filepath1), 'utf8'),
    readFileSync(getNewFilepath(filepath2), 'utf8'),
    getExtention(filepath1),
    getExtention(filepath2),
  );
  const formattedDiff = formatTree(format, diff);

  return formattedDiff;
};
