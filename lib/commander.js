import { Command } from 'commander';
import genDiff from './gendiff.js';
import formatter from './formatters/index.js';

export default () => {
  const program = new Command();

  program
    .helpOption('-h, --help', 'output usage information')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.2')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>');

  const option = program.opts();

  program.action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    const formattedDiff = formatter(option.format, diff);
    console.log(formattedDiff);
  });

  program.parse();
};
