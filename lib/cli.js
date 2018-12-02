#!/usr/bin/env node
'use strict';

const {doit} = require("./badgets.js")

var argv = require('yargs') // eslint-disable-line
  .option('outdated', {
    alias: 'o',
    describe: 'outdated badge',
    default: false
  })
  .boolean("outdated")
  .option('vulnerabilities', {
    alias: 'v',
    describe: 'vulnerabilities badge',
    default: false
  })
  .boolean("vulnerabilities")
  .option('dir', {
    alias: 'd',
    describe: 'output path',
    demandOption: true
  })
  .normalize('dir')
  .help('help')
  .epilog("if no badge (o,v) is specified all badges are generated")
  .argv

  doit(argv)
