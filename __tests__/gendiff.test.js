import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import { genDiffFromJSON } from '../lib/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('testing flat json', () => {
  const expected = `${readFile('expected-file.json')}`;
  const filepath1 = readFile('file1.json');
  const filepath2 = readFile('file2.json');

  expect(genDiffFromJSON(filepath1, filepath2)).toEqual(expected);
});
