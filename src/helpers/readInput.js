const fs = require('fs')
const path = require('path')

const readInput = (dir, delimiter = '\n', trim = true) => {
  let content = fs.readFileSync(path.resolve(dir + '/input.txt'), 'utf8')
  if (trim) content = content.trim()
  if (delimiter) content = content.split(delimiter)
  return content
}

module.exports = readInput
