exports.getPromptModules = () => {
  /* eslint-disable-next-line */
  return ['base'].map(file => require(`../promptModules/${file}`))
}
