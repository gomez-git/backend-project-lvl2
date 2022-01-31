import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import { genDiffFromFiles } from '../lib/gendiff.js';
import formatter from '../lib/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('stylish format', () => {
  const expected = `${readFile('expected-stylish-file.json')}`;

  test.each([
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yaml'],
    ['file1.json', 'file2.yaml'],
  ])('stylish', (filepath1, filepath2) => {
    const ext1 = path.extname(filepath1);
    const ext2 = path.extname(filepath2);
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);
    const diff = genDiffFromFiles(file1, file2, ext1, ext2);
    const formattedDiff = formatter('stylish', diff);

    expect(formattedDiff).toEqual(expected);
  });
});

describe('plain format', () => {
  const expected = `${readFile('expected-plain-file.json')}`;

  test.each([
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yaml'],
    ['file1.json', 'file2.yaml'],
  ])('plain', (filepath1, filepath2) => {
    const ext1 = path.extname(filepath1);
    const ext2 = path.extname(filepath2);
    const file1 = readFile(filepath1);
    const file2 = readFile(filepath2);
    const diff = genDiffFromFiles(file1, file2, ext1, ext2);
    const formattedDiff = formatter('plain', diff);

    expect(formattedDiff).toEqual(expected);
  });
});
