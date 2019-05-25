exports.getPromptModules = () => {
  /* eslint-disable-next-line */
  return ['cssPreprocessors', 'eslint', 'stylelint'].map(file => require(`../promptModules/${file}`))
}
