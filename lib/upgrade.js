const chalk = require('chalk')
const semver = require('semver')
const { clearConsole } = require('./util/clearConsole')
const { logWithSpinner, stopSpinner, log } = require('./util/logger')
const getVersions = require('./util/getVersions')

async function upgrade() {
  logWithSpinner('Fetching webpack-page-cli latest version... ')
  const { current, latest } = await getVersions()
  const isNeedUpgrade = semver.gt(latest, current)
  stopSpinner()
  let title
  if (isNeedUpgrade) {
    // upgrade
    title = chalk.bold.blue(`Webpack-Page CLI Current Version: ${chalk.green(`${current}`)}`)
    title += chalk.green(`
    ┌────────────────────${'─'.repeat(latest.length)}──┐
    │  Update available: ${latest}  │
    └────────────────────${'─'.repeat(latest.length)}──┘`)
  } else {
    title = chalk.blue(`🎉 The local version ${chalk.green(`${current}`)} is up to date, no need to upgrade.`)
  }

  clearConsole(title)
  if (isNeedUpgrade) {
    log()
    log(`👉  Upgrade Webpack-Page-ClI with the following commands:\n\n
      Upgrade with npm: ${chalk.cyan(`npm install -g webpack-page-cli@${latest} \n`)}
      Upgrade with yarn: ${chalk.cyan(`yarn global add webpack-page-cli@${latest} \n`)}`)
    log()
  }
}

module.exports = () => {
  return upgrade().catch(err => {
    console.log(err)
    process.exit(1)
  })
}
