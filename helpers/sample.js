import fs from 'fs'
import path from 'path'

// Read the input file of the given directory, and split its (optionally
// trimmed) content on the given delimiter.
// @param {String} dir - Directory to read the file from
// @param {String} delimiter - Split delimiter for the content
// @param {Boolean} trim - Whether to trim the content
// @param {Boolean} deindent - Whether to deindent the content
// @return {String}
const sample = (string, delimiter = '\n', trim = true, deindent = true) => {
  let content = string
  if (deindent) content = content.replace(/^[ \t]{2,}/gm, '')
  if (trim) content = content.trim()
  if (delimiter) content = content.split(delimiter)
  return content
}

export default sample
