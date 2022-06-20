import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../lib/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const files = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.json', 'file2.yaml'],
  ['file1.ini', 'file2.ini'],
];

describe('default values', () => {
  test.each(files)('compare %s with %s', (filename1, filename2) => {
    const expectedValue = readFile('expected-default-file.md');
    const actualValue = genDiff(
      getFixturePath(filename1),
      getFixturePath(filename2),
    );

    expect(actualValue).toEqual(expectedValue);
  });
});

describe.each([
  ['stylish', '  ', 'none', 'expected-stylish-file.md'],
  ['plain', '', 'asc', 'expected-plain-file.md'],
  ['json', '  ', 'desc', 'expected-json-file.json'],
])('gendiff in %s format', (format, replacer, sortOrder, filename3) => {
  const expectedValue = readFile(filename3);

  test.each(files)('compare %s with %s', (filename1, filename2) => {
    const actualValue = genDiff(
      getFixturePath(filename1),
      getFixturePath(filename2),
      { format, replacer, sortOrder },
    );

    expect(actualValue).toEqual(expectedValue);
  });
});

describe('negative cases', () => {
  test('unsupported file format', () => {
    expect(() => {
      genDiff('.gitignore');
    }).toThrow('Unknown extention: \'\'!');
  });

  const pathToFile1 = getFixturePath('file1.json');
  const pathToFile2 = getFixturePath('file2.json');

  test('unsupported format', () => {
    expect(() => {
      genDiff(pathToFile1, pathToFile2, { format: 'format' });
    }).toThrow('Unknown format: \'format\'!');
  });

  test('unsupported sort order', () => {
    expect(() => {
      genDiff(pathToFile1, pathToFile2, { sortOrder: '' });
    }).toThrow('Unknown sort order: \'\'!');
  });
});
