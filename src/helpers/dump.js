const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const getFileName = content =>
  crypto.createHash('md5').update(content).digest('hex') + '.log'

// Write the given data on a file on disk provided the file doesn’t already
// exist.
// @param {String} data - Data to write in a file
// @param {String} fileName - Name of the file with extension, otherwise generated from the file content
// @param {String} dirName - Name of the directory, typically `__dirname`
// @return {Boolean}
const dump = (data, dirName = __dirname, fileName = getFileName(data)) => {
  const pathName = path.join(dirName, fileName)

  if (!fs.existsSync(pathName)) {
    fs.writeFileSync(pathName, data, 'utf8')
    return true
  }

  return false
}

module.exports = dump
