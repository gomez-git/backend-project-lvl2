import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import buildTree from '../lib/build-tree.js';
import formatTree from '../lib/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['stylish', 'expected-stylish-file.json'],
  ['plain', 'expected-plain-file.json'],
  ['json', 'expected-json-file.json'],
])('gendiff in %s format', (format, filepath3) => {
  const expected = readFile(filepath3);

  test.each([
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yaml'],
    ['file1.json', 'file2.yaml'],
  ])('compare %s with %s', (filepath1, filepath2) => {
    const ext1 = path.extname(filepath1);
    const ext2 = path.extname(filepath2);
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);
    const diff = buildTree(file1, file2, ext1, ext2);
    const formattedDiff = formatTree(format, diff);

    expect(formattedDiff).toEqual(expected);
  });
});
