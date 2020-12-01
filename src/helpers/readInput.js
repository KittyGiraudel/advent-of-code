const fs = require('fs')
const path = require('path')

const readInput = file =>
  fs.readFileSync(path.resolve(file), 'utf8').split('\n').filter(Boolean)

module.exports = readInput
