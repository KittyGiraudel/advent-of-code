const fs = require('fs')
const path = require('path')

module.exports = (file, delimiter = '\n') =>
  fs.readFileSync(path.resolve(file), 'utf8').trim().split(delimiter)
