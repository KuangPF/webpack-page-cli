const fs = require('fs-extra')
const path = require('path')
const { clearConsole } = require('./util/clearConsole')
async function create(projectName, options) {
  const cwd = options.cwd || process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  if (fs.existsSync(targetDir)){
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      await clearConsole()
    }
    console.log('targetDir exist')
  }
  console.log('create starting...')
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    console.log(err)
    process.exit(1)
  })
}
