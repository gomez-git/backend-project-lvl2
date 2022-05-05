import { Command } from 'commander';
import genDiff from './gendiff.js';

export default () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .version('1.0.9')
    .option('-f, --format [type]', 'output format', 'stylish')
    .option('-r, --replacer [char]', 'output replacer', '    ');

  program
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const { format, replacer } = program.opts();
      const diff = genDiff(filepath1, filepath2, format, replacer);
      console.log(diff);
    });

  program.parse();
};
