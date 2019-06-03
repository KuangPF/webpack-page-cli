const execa = require('execa')
const { request } = require('./request')
const registries = require('./registries')

let checked
let result

function removeSlash(url) {
  return url.replace(/\/$/, '')
}

async function ping(registry) {
  await request.get(`${registry}/webpack-page-cli/latest`)
  return registry
}

module.exports = async function shouldUseTaobao(command = 'npm') {
  if (checked) return result
  checked = true
  const userCurrent = (await execa(command, ['config', 'get', 'registry'])).stdout
  const defaultRegistry = registries[command]
  const taobaoRegistry = registries.taobao

  if (removeSlash(userCurrent) === removeSlash(taobaoRegistry)) {
    return true
  }
  if (removeSlash(userCurrent) !== removeSlash(defaultRegistry)) {
    // user has configured custom registry, respect that
    return false
  }

  let faster
  try {
    // Promise.race 哪个结果获取的快就返回哪个
    faster = await Promise.race([ping(defaultRegistry), ping(registries.taobao)])
  } catch (e) {
    return false
  }

  if (faster !== registries.taobao) {
    // default is already faster
    return false
  }

  return true
}
