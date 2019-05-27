const { execSync } = require('child_process')

exports.hasYarn = () => {
  if (process.env.WEBPACK_PAGE_CLI_TEST) {
    return true
  }
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
