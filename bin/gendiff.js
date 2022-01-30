#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../lib/gendiff.js';

const program = new Command();

program
  .helpOption('-h, --help', 'output usage information')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --force [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

program.parse();
