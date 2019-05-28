/* eslint-disable */
const fs = require('fs')
const path = require('path')
const globby = require('globby')
const ejs = require('ejs')
const isBinary = require('isbinaryfile')

function renderFile(name, data, ejsOptions) {
  if (isBinary.isBinaryFileSync(name)) {
    // 检测是否为二进制文件
    return fs.readFileSync(name) // return buffer
  }
  const template = fs.readFileSync(name, 'utf-8')

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

exports.render = async (source, data = {}, ejsOptions = {}) => {
  let files = {}
  const baseDir = path.resolve(__dirname, '../../')
  source = path.resolve(baseDir, source)
  // Allow patterns to match filenames starting with a period,
  // even if the pattern does not explicitly have a period in that spot.
  // Note that by default, a/**/b will not match a/.d/b, unless dot is set.
  const _files = await globby(['**/*'], { cwd: source }) // dot default is false
  for (const rawPath of _files) {
    const targetPath = rawPath
      .split('/')
      .map(filename => {
        // dotfiles are ignored when published to npm, therefore in templates
        // we need to use underscore instead (e.g. "_gitignore")
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
    if (Buffer.isBuffer(content) || /[^\s]/.test(content) || /gitkeep/.test(targetPath)) {
      files[targetPath] = content
    }
  }
  return files
}
