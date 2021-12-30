const fs = require('fs')
const path = require('path')

const readInput = (dir, delimiter = '\n') =>
  fs
    .readFileSync(path.resolve(dir + '/input.txt'), 'utf8')
    .trim()
    .split(delimiter)

module.exports = readInput
