module.exports = cli => {
  cli.injectFeature({
    name: 'eslint',
    value: 'eslint',
    short: 'eslint',
    description: 'Check and enforce code quality with ESLint',
    link: '',
    checked: false
  })

  cli.injectPrompt({
    name: 'eslintConfig',
    when: answers => answers.features.includes('eslint'),
    type: 'list',
    message: 'Pick a linter / formatter config:',
    description: 'Checking code errors and enforcing an homogeoneous code style is recommended.',
    choices: [
      {
        name: 'ESLint with error prevention only',
        value: 'base',
        short: 'Basic'
      },
      {
        name: 'ESLint + Airbnb config',
        value: 'airbnb',
        short: 'Airbnb'
      },
      {
        name: 'ESLint + Standard config',
        value: 'standard',
        short: 'Standard'
      }
    ]
  })
}
