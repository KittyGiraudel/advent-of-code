const fs = require('fs')
const path = require('path')

module.exports = (dir, delimiter = '\n') =>
  fs
    .readFileSync(path.resolve(dir + '/input.txt'), 'utf8')
    .trim()
    .split(delimiter)
