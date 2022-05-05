[![Maintainability](https://api.codeclimate.com/v1/badges/f10fc0b023d0434b2c55/maintainability)](https://codeclimate.com/github/gomez-git/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f10fc0b023d0434b2c55/test_coverage)](https://codeclimate.com/github/gomez-git/backend-project-lvl2/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/gomez-git/backend-project-lvl2/badge.svg)](https://snyk.io/test/github/gomez-git/backend-project-lvl2)
[![Actions Status](https://github.com/gomez-git/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/gomez-git/backend-project-lvl2/actions)
[![Actions Status](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/NodeCI.yml/badge.svg)](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/NodeCI.yml)
# Annotation
This is my second JavaScript project based on Hexlet backend courses. I built a difference generator for json, yaml and ini files.
## How to install
```
git clone git@github.com:gomez-git/backend-project-lvl2.git
cd backend-project-lvl2
make install
make test
```
## How to use
You can use it as a script in terminal or as a library in your JavaScript project. It support json, yaml and ini files. You can format difference in three styles: stylish (default), plain and json with default or custom replacer.

In terminal:

Install dependencies with command `make install` in directory with my project.
```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format [type]    output format (default: "stylish")
  -r, --replacer [char]  output replacer (default: "    ")
  -h, --help             output usage information
```
In your project:

Install dependencies with command `make install` in directory with my project. Move library to your node_modules directory: `mv backend-project-lvl2 /path/to/your/project/node_modules/gendiff`
```
import genDiff from 'gendiff';

const diff = genDiff(filepath1, filepath2[, format[, replacer]]);
console.log(diff);
```
## Preview of gendiff util
### Installation process
[![asciicast](https://asciinema.org/a/4XGwh6VBPnmBfvPeN9lLfYjB6.svg)](https://asciinema.org/a/4XGwh6VBPnmBfvPeN9lLfYjB6)
### Compare files in stylish format
[![asciicast](https://asciinema.org/a/WloVQZ8ZOANc2mbcckPmjOGHx.svg)](https://asciinema.org/a/WloVQZ8ZOANc2mbcckPmjOGHx)
### Compare files in plain format
[![asciicast](https://asciinema.org/a/fqhEdFNgwAPUAy8J9VNrAo8m2.svg)](https://asciinema.org/a/fqhEdFNgwAPUAy8J9VNrAo8m2)
### Compare files in json format with custom replacer
[![asciicast](https://asciinema.org/a/6nFs7WoPmBAdtfMakhCPI1T3w.svg)](https://asciinema.org/a/6nFs7WoPmBAdtfMakhCPI1T3w)
