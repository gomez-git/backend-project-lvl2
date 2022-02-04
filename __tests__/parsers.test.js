import parse from '../lib/parsers.js';

describe('parse file with unknown extention', () => {
  test.each([
    ['file', '.txt'],
    ['eslint', '.cjs'],
    ['README', '.md'],
  ])('%s%s', (filename, extention) => {
    expect(() => {
      parse(extention, filename);
    }).toThrow(`Unknown extention: '${extention}'!`);
  });
});
