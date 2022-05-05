import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../lib/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['stylish', 'expected-stylish-file.md'],
  ['plain', 'expected-plain-file.md'],
  ['json', 'expected-json-file.json', '  '],
])('gendiff in %s format', (format, filename3, replacer) => {
  const expectedValue = readFile(filename3);

  test.each([
    ['file1.json', 'file2.json'],
    ['file1.yml', 'file2.yaml'],
    ['file1.json', 'file2.yaml'],
    ['file1.yml', 'file2.ini'],
  ])('compare %s with %s', (filename1, filename2) => {
    const actualValue = genDiff(
      getFixturePath(filename1),
      getFixturePath(filename2),
      format,
      replacer,
    );

    expect(actualValue).toEqual(expectedValue);
  });
});
