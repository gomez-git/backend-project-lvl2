import path from 'path';
import parse from '../lib/parsers.js';

test('testing parse function', () => {
  const jsonParser = 'filename => JSON.parse(filename)';
  const yamlParser = 'filename => yaml.load(filename)';

  const filepath1 = 'file1.json';
  const extension1 = path.extname(filepath1);

  expect(`${parse(extension1)}`).toEqual(jsonParser);

  const filepath2 = 'file1.yaml';
  const extention2 = path.extname(filepath2);

  expect(`${parse(extention2)}`).toEqual(yamlParser);

  const filepath3 = 'file1.yml';
  const extention3 = path.extname(filepath3);

  expect(`${parse(extention3)}`).toEqual(yamlParser);
});
