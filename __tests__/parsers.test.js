import parse from '../lib/parsers.js';

describe('parse file with unknown extention', () => {
  test.each([
    [''],
    ['.cjs'],
    ['.md'],
  ])('extention: %s', (extention) => {
    expect(() => {
      parse(extention, '');
    }).toThrow(`Unknown extention: '${extention}'!`);
  });
});
