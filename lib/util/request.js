const request = require('request-promise-native')

exports.request = {
  get(uri) {
    // lazy require
    const reqOpts = {
      method: 'GET',
      resolveWithFullResponse: true,
      json: true,
      uri
    }

    return request(reqOpts)
  }
}
