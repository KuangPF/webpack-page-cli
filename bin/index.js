#!/usr/bin/env node
const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [options]')


program.parse(process.argv)