const { request } = require('./request')
const shouldUseTaobao = require('./shouldUseTaobao')

module.exports = async function getPackageVersion(id, range = '') {
  const registry = (await shouldUseTaobao()) ? 'https://registry.npm.taobao.org' : 'https://registry.npmjs.org'

  let result

  try {
    // https://registry.npm.taobao.org/webpack-page-cli/latest
    result = await request.get(`${registry}/${encodeURIComponent(id).replace(/^%40/, '@')}/${range}`)
  } catch (e) {
    return e
  }
  return result
}
