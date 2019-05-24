exports.getPromptModules = () => {
  return [
    'base'
  ].map(file => require(`../promptModules/${file}`))
}
