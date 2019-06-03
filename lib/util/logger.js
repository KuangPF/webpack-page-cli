const chalk = require('chalk')
const padStart = require('string.prototype.padstart')
const EventEmitter = require('events')
const ora = require('ora')

const spinner = ora()
let lastMsg = null

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

exports.logWithSpinner = (symbol, msg) => {
  if (!msg) {
    msg = symbol
    symbol = chalk.green('✔')
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  }
  spinner.text = ` ${msg}`
  lastMsg = {
    symbol: `${symbol} `,
    text: msg
  }
  spinner.start()
}

exports.stopSpinner = persist => {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text
    })
  } else {
    spinner.stop()
  }
  lastMsg = null
}
