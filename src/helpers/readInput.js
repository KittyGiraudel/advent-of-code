const fs = require('fs')
const path = require('path')

const readInput = (file, split = '\n') =>
  fs.readFileSync(path.resolve(file), 'utf8').split(split).filter(Boolean)

module.exports = readInput
