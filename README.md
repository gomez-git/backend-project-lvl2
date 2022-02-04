[![Actions Status](https://github.com/gomez-git/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/gomez-git/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/f10fc0b023d0434b2c55/maintainability)](https://codeclimate.com/github/gomez-git/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f10fc0b023d0434b2c55/test_coverage)](https://codeclimate.com/github/gomez-git/backend-project-lvl2/test_coverage)
[![linter](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/linter.yml/badge.svg)](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/linter.yml)
[![test](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/test.yml/badge.svg)](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/test.yml)
# Annotation
This is my second JavaScript project based on Hexlet backend courses. I build a difference generator for flat and nested json and yaml files.
## How to install
```
git clone git@github.com:gomez-git/backend-project-lvl2.git
cd backend-project-lvl2
make install
```
## How to use
You can use it as a script in terminal or as a library in your JavaScript project. It supported json and yaml files. You can format difference in three styles: stylish (default), plain and json format.

In terminal:

Install dependencies with command `make install` in directory with my project.
```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```
In your project:

Move library to your node_modules directory `mv backend-project-lvl2 your_project_name/node_modules/gendiff`.
```
import genDiff from 'gendiff';

const diff = genDiff(filepath1, filepath2, format);
console.log(diff);
```
## Preview of gendiff util
### Compare flat json files
[![asciicast](https://asciinema.org/a/NXZDslf6ECIRh6Vc2NjZRCu1h.svg)](https://asciinema.org/a/NXZDslf6ECIRh6Vc2NjZRCu1h)
### Compare flat yaml files
[![asciicast](https://asciinema.org/a/FSoI2cw2bWaD8atGkzlOaUrLZ.svg)](https://asciinema.org/a/FSoI2cw2bWaD8atGkzlOaUrLZ)
### Compare nested files in stylish format
[![asciicast](https://asciinema.org/a/y062kKcChCyoLDjAiPDCwRTvH.svg)](https://asciinema.org/a/y062kKcChCyoLDjAiPDCwRTvH)
### Compare nested files in plain format
[![asciicast](https://asciinema.org/a/u5C1aqvMLqkF8cqsZv0FPTOT6.svg)](https://asciinema.org/a/u5C1aqvMLqkF8cqsZv0FPTOT6)
### Compare nested files in json format
[![asciicast](https://asciinema.org/a/eJjmih650SWb283kdzUFOC3zu.svg)](https://asciinema.org/a/eJjmih650SWb283kdzUFOC3zu)
