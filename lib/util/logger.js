const chalk = require('chalk')
const padStart = require('string.prototype.padstart')
const EventEmitter = require('events')

exports.events = new EventEmitter()

/* eslint-disable-next-line */
function _log(type, tag, message) {
  if (message) {
    exports.events.emit('log', {
      message,
      type,
      tag
    })
  }
}

const format = (label, msg) => {
  return msg
    .split('\n')
    .map((line, i) => {
      return i === 0 ? `${label} ${line}` : padStart(line, chalk.reset(label).length)
    })
    .join('\n')
}

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

exports.log = (msg = '', tag = null) => {
  // eslint-disable-next-line no-unused-expressions
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
  _log('log', tag, msg)
}
