const generators = require('yeoman-generator')
const Generator = require('yeoman-generator');
const isBlank = s => s.match(/^\W*$/) !== null
const containsWS = s => s.match(/\W/) !== null

module.exports = class extends Generator {

  prompting() {
    this.log('Please ensure that you have typescript, typings, and webpack installed globally before continue.')

    const self = this
    return this.prompt([
      { type: 'input'
      , name: 'slug'
      , message: 'Your project slug'
      , validate: s => !isBlank(s) && !containsWS(s) },
      { type: 'input'
      , name: 'desc'
      , message: 'Description'
      , default: '' },
      { type: 'confirm'
      , name: 'use_redux'
      , message: 'Use Redux'
      , default: false }
    ]).then(answers => self.answers = answers)
  }
  createPackageJson() {
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      { name: this.answers.slug
      , version: '1.0.0'
      , description: this.answers.description
      , scripts: { 'start': 'webpack-dev-server --inline' }}
    )
  }
//   installNpmLibs() {
//     const reacts = ['react', 'react-dom']
//     const additions = this.answers.use_redux? ['redux', 'react-redux'] : []
//     const webpacks = ['webpack-bundle-tracker', 'ts-loader', 'source-map-loader', 'webpack-dev-server']
//     const mandatoryApps = ['typescript', 'webpack']
//     this.npmInstall(reacts.concat(additions).concat(webpacks).concat(mandatoryApps), { saveDev: true })
//   },
  copyFiles() {
    this.fs.copy( this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'))
    this.fs.copy(this.templatePath('src/index.tsx'), this.destinationPath('src/index.tsx'))
    this.fs.copy(this.templatePath('public/index.html'), this.destinationPath('public/index.html'))
  }
//   instal() {
//     const reactTypes = ['dt~react', 'dt~react-dom']
//     const reduxTypes_global = ['dt~redux']
//     const reduxTypes_module = ['dt~react-redux']
//     const types = reactTypes.concat(this.answers.use_redux? reduxTypes_module : [])
//     this.spawnCommand('typings', ['install', '--save'].concat(types))
//     if (this.answers.use_redux) {
//       this.spawnCommand('typings', ['install', '--save', '--global'].concat(reduxTypes_global))
//     }
//   },
  end() {
    this.log('Run `npm start` to see the project works. Happy time!')
  }

}