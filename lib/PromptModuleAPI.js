module.exports = class PromptModuleAPI {
  constructor (creator) {
    this.creator = creator
  }
  
  injectPrompt (prompt) {
    this.creator.injectedPrompts.push(prompt)
  }
}
