#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node

// 将包名转化为驼峰命令方式  package-name => packageName
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(`You are using Node ${process.version}, but this version of ${id} requires Node ${wanted} .\nPlease upgrade your Node version.`))
    process.exit(1)
  }
}
checkNodeVersion(requiredVersion, 'webpack-page-cli')
program.version(require('../package').version).usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new project powered by webpack-page-cli')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    /* eslint-disable global-require */
    require('../lib/create')(name, options)
  })

program
  .command('upgrade')
  .description('upgrade webpack-page-cli')
  .action(() => {
    /* eslint-disable global-require */
    require('../lib/upgrade')()
  })

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
  program.outputHelp()
  console.log()
  console.log(`  ${chalk.red(`Unknown command ${chalk.yellow(cmd)}.`)}`)
  console.log()
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
