const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const isBinary = require('isbinaryfile')

function render(source, additionalData = {}, ejsOptions = {}) {
  const baseDir = extractCallDir() // path/node_modules/@vue/cli-service/generator
  if (isString(source)) {
    // source: './template'
    source = path.resolve(baseDir, source)
    this._injectFileMiddleware(async files => {
      const data = this._resolveData(additionalData)
      const globby = require('globby')
      const _files = await globby(['**/*'], { cwd: source }) // 匹配 ./template 目录下面的文件
      /**
       * _file:
       * ['_gitignore','public/favicon.ico','public/index.html','src/App.vue','src/main.js', 'src/assets/logo.png','src/components/HelloWorld.vue']
       *
       */
      for (const rawPath of _files) {
        const targetPath = rawPath
          .split('/')
          .map(filename => {
            // dotfiles are ignored when published to npm, therefore in templates
            // we need to use underscore instead (e.g. "_gitignore")
            // 将 _fileName 类型的文件还原成 .fileName 类型的文件
            if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
              return `.${filename.slice(1)}`
            }
            if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
              return `${filename.slice(1)}`
            }
            return filename
          })
          .join('/')
        const sourcePath = path.resolve(source, rawPath)
        const content = renderFile(sourcePath, data, ejsOptions)
        // only set file if it's not all whitespace, or is a Buffer (binary files)
        if (Buffer.isBuffer(content) || /[^\s]/.test(content)) {
          files[targetPath] = content
        }
      }
    })
  } else if (isObject(source)) {
    this._injectFileMiddleware(files => {
      const data = this._resolveData(additionalData)
      for (const targetPath in source) {
        const sourcePath = path.resolve(baseDir, source[targetPath])
        const content = renderFile(sourcePath, data, ejsOptions)
        if (Buffer.isBuffer(content) || content.trim()) {
          files[targetPath] = content
        }
      }
    })
  } else if (isFunction(source)) {
    this._injectFileMiddleware(source)
  }
}

function renderFile(name, data, ejsOptions) {
  if (isBinary.sync(name)) {
    // 检测是否为二进制文件
    return fs.readFileSync(name) // return buffer
  }
  const template = fs.readFileSync(name, 'utf-8')

  // custom template inheritance via yaml front matter.
  // ---
  // extend: 'source-file'
  // replace: !!js/regexp /some-regex/
  // OR
  // replace:
  //   - !!js/regexp /foo/
  //   - !!js/regexp /bar/
  // ---
  const yaml = require('yaml-front-matter')
  const parsed = yaml.loadFront(template)
  const content = parsed.__content
  let finalTemplate = content.trim() + `\n`
  if (parsed.extend) {
    const extendPath = path.isAbsolute(parsed.extend) ? parsed.extend : resolve.sync(parsed.extend, { basedir: path.dirname(name) })
    finalTemplate = fs.readFileSync(extendPath, 'utf-8')
    if (parsed.replace) {
      if (Array.isArray(parsed.replace)) {
        const replaceMatch = content.match(replaceBlockRE)
        if (replaceMatch) {
          const replaces = replaceMatch.map(m => {
            return m.replace(replaceBlockRE, '$1').trim()
          })
          parsed.replace.forEach((r, i) => {
            finalTemplate = finalTemplate.replace(r, replaces[i])
          })
        }
      } else {
        finalTemplate = finalTemplate.replace(parsed.replace, content.trim())
      }
    }
    if (parsed.when) {
      finalTemplate = `<%_ if (${parsed.when}) { _%>` + finalTemplate + `<%_ } _%>`
    }
  }

  return ejs.render(finalTemplate, data, ejsOptions)
}
