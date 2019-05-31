const chalk = require('chalk')
const semver = require('semver')
const getVersions = require('./getVersions')
const { clearConsole } = require('./clearConsole')

exports.generateTitle = async checkUpdate => {
  const { current, latest } = await getVersions()
  let title = chalk.bold.blue(`Webpack-Page CLI v${current}`)
  if (checkUpdate && semver.gt(latest, current)) {
    title += chalk.green(`
    ┌────────────────────${'─'.repeat(latest.length)}──┐
    │  Update available: ${latest}  │
    └────────────────────${'─'.repeat(latest.length)}──┘`)
  }
  return title
}

exports.clearConsole = async function clearConsoleWithTitle(checkUpdate) {
  const title = await exports.generateTitle(checkUpdate)
  clearConsole(title)
}
