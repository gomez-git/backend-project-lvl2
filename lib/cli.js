import { Command, Option } from 'commander';
import genDiff from './gendiff.js';

export default () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .helpOption('-h, --help', 'output usage information')
    .version('1.0.10', '-v, --version', 'output the version number')
    .addOption(
      new Option('-f, --format <type>', 'output format')
        .default('stylish')
        .choices(['plain', 'json']),
    )
    .option('-r, --replacer <char>', 'output replacer', '    ')
    .addOption(
      new Option('-s, --sort-order <type>', 'output sort')
        .default('asc')
        .choices(['desc', 'none']),
    );

  program
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const diff = genDiff(filepath1, filepath2, program.opts());
      console.log(diff);
    });

  program.parse();
};
