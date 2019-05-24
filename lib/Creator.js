const PromptModuleAPI = require('./PromptModuleAPI')

module.exports = class Creator {
  constructor(name, context, promptModules) {
    this.name = name
    this.context = context
    this.injectedPrompts = [] // prompts

    const promptAPI = new PromptModuleAPI(this)

    promptModules.forEach(m => m(promptAPI))
  }
}
