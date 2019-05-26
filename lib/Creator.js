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
    if (process.env.WEBPACK_PAGE_CLI_TEST) {
      preset = {
        features: ['css-preprocessor', 'eslint', 'stylelint'],
        cssPreprocessor: 'sass',
        eslintConfig: 'base',
        stylelintConfig: 'recessOrder'
      }
    } else {
      preset = await this.promptAndResolvePreset()
    }
    const file = await render('./template', Object.assign(preset, { name: this.name }))
    const finalFile = await this.extractFinalFiles(preset, file)
    await writeFileTree(this.context, finalFile)
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

  // eslint-disable-next-line
  async extractFinalFiles(preset, file) {
    // delete .eslintrc and .eslintignore files if the features not include eslint
    if (!preset.features.indexOf('eslint') > -1) {
      delete file['.eslintrc']
      delete file['.eslintignore']
    }
    // css-preprocessors
    file = this.extractCssFile(preset, file)
    return file
  }

  // eslint-disable-next-line
  async extractCssFile(preset, file) {
    const cssSuffixNameConfig = {
      less: 'less',
      sass: 'scss',
      stylus: 'styl'
    }
    const cssSuffixName = preset.features.indexOf('css-preprocessor') > -1 ? cssSuffixNameConfig[preset.cssPreprocessor] : 'css'
    const cssFileList = []
    const cssSuffixNameList = ['css', 'less', 'scss', 'styl']
    cssSuffixNameList.forEach(item => {
      cssFileList.push(`src/css/index.${item}`)
      cssFileList.push(`src/css/about.${item}`)
      cssFileList.push(`src/css/reset.${item}`)
    })
    cssFileList.forEach(item => {
      if (item.indexOf(`.${cssSuffixName}`) < 0) {
        delete file[item]
      }
    })

    return file
  }
}
