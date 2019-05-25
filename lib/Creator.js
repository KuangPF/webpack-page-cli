const debug = require('debug')
const inquirer = require('inquirer')
const PromptModuleAPI = require('./PromptModuleAPI')
const { clearConsole } = require('./util/clearConsole')
const { render } = require('./util/render')
const writeFileTree = require('./util/writeFileTree')

module.exports = class Creator {
  constructor(name, context, promptModules) {
    this.name = name
    this.context = context
    const { featurePrompt } = this.resolveIntroPrompts()
    this.featurePrompt = featurePrompt
    this.injectedPrompts = [] // prompts

    const promptAPI = new PromptModuleAPI(this)

    promptModules.forEach(m => m(promptAPI))
  }

  // eslint-disable-next-line
  async create(cliOptions = {}, preset = null) {
    console.log('before creating......')
    if (process.env.VUE_CLI_TEST) {
      preset = {
        features: ['css-preprocessor', 'eslint', 'stylelint'],
        cssPreprocessor: 'less',
        eslintConfig: 'airbnb',
        stylelintConfig: 'recessOrder'
      }
    } else {
      preset = await this.promptAndResolvePreset()
    }
    const file = await render('./template', Object.assign(preset, { name: this.name }))
    await writeFileTree(this.context, file)
  }

  async promptAndResolvePreset(answers = null) {
    if (!answers) {
      await clearConsole()
      answers = await inquirer.prompt(this.resolveFinalPrompts())
    }
    debug('webpack-page-cli:answers')(answers)
    return answers
  }

  resolveFinalPrompts() {
    this.injectedPrompts.forEach(prompt => {
      const originalWhen = prompt.when || (() => true)
      prompt.when = answers => {
        return originalWhen(answers)
      }
    })
    const prompts = [this.featurePrompt, ...this.injectedPrompts]
    return prompts
  }

  // eslint-disable-next-line
  resolveIntroPrompts() {
    const featurePrompt = {
      name: 'features',
      when: true,
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [],
      pageSize: 10
    }
    return {
      featurePrompt
    }
  }
}
