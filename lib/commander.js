import { Command } from 'commander';
import genDiff from './gendiff.js';

export default () => {
  const program = new Command();

  program
    .helpOption('-h, --help', 'output usage information')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.4')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>');

  const option = program.opts();

  program.action((filepath1, filepath2) => {
    const { format } = option;
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  });

  program.parse();
};
