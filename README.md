# Grep-cli

[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]
[![NPM version][npm-v-image]][npm-url]
[![NPM Downloads][npm-dm-image]][npm-url]
[![Test Coverage][coveralls-image]][coveralls-url]


[Grep](https://en.wikipedia.org/wiki/Grep) utility for **windows**.

## Installation
```sh
npm install -g grep-cli
```

--------------------------------------------------------------------------------

## Usage CLI
Use the string as a pattern

```sh
type package.json | grep start
# or
cat package.json | grep start
```

![Screenshot](/README/screenshot-1.png)

Or regexp

```sh
dir | grep "/[0-9]{1,2}:[0-9]{1,2}/i"
# or
ls | grep "/[0-9]{1,2}:[0-9]{1,2}/i"
```

![Screenshot](/README/screenshot-2.png)

--------------------------------------------------------------------------------

## Changelog
### 0.1.0 [`Stable`]
```diff
+ First realise
```

--------------------------------------------------------------------------------

## License
Copyright (c)  2016 [Alexander Krivoshhekov][github-author-link]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[github-author-link]: http://github.com/SuperPaintman
[npm-url]: https://www.npmjs.com/package/grep-cli
[npm-v-image]: https://img.shields.io/npm/v/grep-cli.svg
[npm-dm-image]: https://img.shields.io/npm/dm/grep-cli.svg
[travis-image]: https://img.shields.io/travis/SuperPaintman/grep-cli/master.svg?label=linux
[travis-url]: https://travis-ci.org/SuperPaintman/grep-cli
[appveyor-image]: https://img.shields.io/appveyor/ci/SuperPaintman/grep-cli/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/SuperPaintman/grep-cli
[coveralls-image]: https://img.shields.io/coveralls/SuperPaintman/grep-cli/master.svg
[coveralls-url]: https://coveralls.io/r/SuperPaintman/grep-cli?branch=master
