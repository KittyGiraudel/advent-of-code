const fs = require('fs')
const path = require('path')

// Read the input file of the given directory, and split its (optionally
// trimmed) content on the given delimiter.
// @param {String} dir - Directory to read the file from
// @param {String} delimiter - Split delimiter for the content
// @param {Boolean} trim - Whether to trim the content
// @return {String}
const readInput = (dir, delimiter = '\n', trim = true) => {
  let content = fs.readFileSync(path.resolve(dir + '/input.txt'), 'utf8')
  if (trim) content = content.trim()
  if (delimiter) content = content.split(delimiter)
  return content
}

module.exports = readInput
