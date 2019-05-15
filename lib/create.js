async function create(projectName, options) {
  const pwd = options.cwd || process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  console.log('create starting...')
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    console.log('error')
    process.exit(1)
  })
}
