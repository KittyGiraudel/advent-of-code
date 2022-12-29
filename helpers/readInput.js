import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Read the input file of the given directory, and split its (optionally
// trimmed) content on the given delimiter.
// @param {String} dir - Directory to read the file from
// @param {String} delimiter - Split delimiter for the content
// @param {Boolean} trim - Whether to trim the content
// @return {String}
const readInput = (meta, delimiter = '\n', trim = true, name = 'input.txt') => {
  const dir = path.dirname(fileURLToPath(meta.url))
  let content = fs.readFileSync(path.resolve(path.join(dir, name)), 'utf8')
  if (trim) content = content.trim()
  if (delimiter) content = content.split(delimiter)
  return content
}

export default readInput
