
> badges from npm audit and outdated commands. No other online services involved

![outdated][outdated-image] ![Vulnerabilities][vulnerabilities-image]

## Installation

```sh
$ npm install --save badgets
```

## Usage

```
$ badgets -h
Options:
  --version              Show version number                           [boolean]
  --outdated, -o         outdated badge               [boolean] [default: false]
  --issues  , -i         vulnerabilities badge        [boolean] [default: false]
  --dir, -d              output path                         [string] [required]
  --help                 Show help                                     [boolean]

if no badge (o,i) is specified, all badges are generated
```
## License

Apache-2.0 © [Reda Bendiar]()


[npm-image]: https://badge.fury.io/js/badgets.svg
[npm-url]: https://npmjs.org/package/badgets
[travis-image]: https://travis-ci.org/redben/badgets.svg?branch=master
[travis-url]: https://travis-ci.org/redben/badgets
[daviddm-image]: https://david-dm.org/redben/badgets.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/redben/badgets
[coveralls-image]: https://coveralls.io/repos/redben/badgets/badge.svg
[coveralls-url]: https://coveralls.io/r/redben/badgets
[outdated-image]: ./badges/outdated.svg
[vulnerabilities-image]: ./badges/vulnerabilities.svg
