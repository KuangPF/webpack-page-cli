module.exports = cli => {
  cli.injectFeature({
    name: 'stylelint',
    value: 'stylelint',
    short: 'stylelint',
    description: 'Check CSS code with stylelint',
    link: '',
    checked: false
  })

  cli.injectPrompt({
    name: 'stylelintConfig',
    when: answers => answers.features.includes('stylelint'),
    type: 'list',
    message: 'Pick a stylelint config:',
    description: 'Checking CSS and order CSS properties is recommended.',
    choices: [
      {
        name: 'stylelint with error prevention only',
        value: 'base',
        short: 'Basic'
      },
      {
        name: 'stylelint + stylelint-config-recess-order',
        value: 'recessOrder',
        short: 'stylelint-config-recess-order'
      }
    ]
  })
}
