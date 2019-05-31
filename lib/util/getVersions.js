const getPackageVersion = require('./getPackageVersion')

async function getLatestVersions(local) {
  const res = await getPackageVersion('webpack-page-cli', 'latest')
  if (res.statusCode === 200) {
    const versions = res.body.version
    return versions
  }
  return local
}
module.exports = async function getVersions() {
  /* eslint-disable-next-line */
  const local = require('../../package.json').version
  const latest = await getLatestVersions(local)

  return {
    current: local,
    latest
  }
}
