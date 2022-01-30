import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import { genDiffFromFiles } from '../lib/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('testing flat json', () => {
  const expected = `${readFile('expected-file.json')}`;
  const filepath1 = 'file1.json';
  const filepath2 = 'file2.json';
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  expect(genDiffFromFiles(file1, file2, ext1, ext2)).toEqual(expected);
});

test('testing flat yaml', () => {
  const expected = `${readFile('expected-file.json')}`;
  const filepath1 = 'file1.yml';
  const filepath2 = 'file2.yaml';
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  expect(genDiffFromFiles(file1, file2, ext1, ext2)).toEqual(expected);
});

test('testing flat mix files', () => {
  const expected = `${readFile('expected-file.json')}`;
  const filepath1 = 'file1.yml';
  const filepath2 = 'file2.json';
  const ext1 = path.extname(filepath1);
  const ext2 = path.extname(filepath2);
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);

  expect(genDiffFromFiles(file1, file2, ext1, ext2)).toEqual(expected);
});
