import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Read the input file of the given directory, and optionally split its
// (optionally trimmed) content on the given delimiter.
// @param {Object} meta - Import meta object from the module
// @param {String} delimiter - Split delimiter for the content
// @param {Boolean} trim - Whether to trim the content
// @param {String} name - File name
// @return {String|String[]}
const readInput = (
  meta,
  { delimiter = '\n', trim = true, name = 'input.txt' } = {}
) => {
  const directory = path.dirname(fileURLToPath(meta.url))
  const filePath = path.join(directory, name)

  let content = fs.readFileSync(path.resolve(filePath), 'utf8')

  if (trim) content = content.trim()
  if (delimiter) content = content.split(delimiter)

  return content
}

export default readInput
