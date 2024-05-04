#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/index';

program
  .name('gendiff')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .versionOption('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepat1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .action((filepath1, filepath2, option) => {
    const result = genDiff(filepath1, filepath2, option.format);
    console.log(result);
  });

program.parse();
