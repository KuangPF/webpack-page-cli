#!/usr/bin/env node
const program = require('commander')

program.version(require('../package').version).usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new project powered by webpack-page-cli')
  .option('-f, --force [message]', 'Overwrite target directory if it exists')
  .action((name, cmd) => {
    const options = cleanArgs(cmd)
    require('../lib/create')(name, options)
  })

program.parse(process.argv)

// 将包名转化为驼峰命令方式  package-name => packageName
function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
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
