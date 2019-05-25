exports.getPromptModules = () => {
  /* eslint-disable-next-line */
  return ['cssPreprocessors', 'linter'].map(file => require(`../promptModules/${file}`))
}
