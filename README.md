[![Maintainability](https://api.codeclimate.com/v1/badges/f10fc0b023d0434b2c55/maintainability)](https://codeclimate.com/github/gomez-git/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f10fc0b023d0434b2c55/test_coverage)](https://codeclimate.com/github/gomez-git/backend-project-lvl2/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/gomez-git/backend-project-lvl2/badge.svg)](https://snyk.io/test/github/gomez-git/backend-project-lvl2)
[![Actions Status](https://github.com/gomez-git/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/gomez-git/backend-project-lvl2/actions)
[![Actions Status](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/NodeCI.yml/badge.svg)](https://github.com/gomez-git/backend-project-lvl2/actions/workflows/NodeCI.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Annotation
This is my second JavaScript project based on Hexlet backend courses. I built a difference generator for json, yaml and ini files.
## How to install
```bash
git clone git@github.com:gomez-git/backend-project-lvl2.git
cd backend-project-lvl2
make install
make test
gendiff -h

```
## How to use
You can use it as a script in terminal or as a library in your JavaScript project. It supports json, yaml and ini files. You can format difference in three styles: stylish (default), plain and json. You can choose replacer: '    ' (default) or custom replacer and one of three sort orders: asc (default), desc and none.

In terminal:

Install dependencies with command `make install` in directory with my project.
```bash
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -v, --version            output the version number
  -f, --format <type>      output format (choices: "plain", "json", default: "stylish")
  -r, --replacer <char>    output replacer (default: "    ")
  -s, --sort-order <type>  output sort (choices: "desc", "none", default: "asc")
  -h, --help               output usage information
```
In your project:

Install my package with:
```bash
npm install https://github.com/gomez-git/backend-project-lvl2

```
Try it in your project:
```javascript
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2[, { format, replacer, sortOrder }]);
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
