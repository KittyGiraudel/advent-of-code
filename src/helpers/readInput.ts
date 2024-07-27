import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

type Options = {
  delimiter?: string
  trim?: boolean
  name?: string
}

/**
 * Read the input file of the given directory, and optionally split its
 * (optionally trimmed) content on the given delimiter.
 */
const readInput = (
  meta: ImportMeta,
  { delimiter = '\n', trim = true, name = 'input.txt' }: Options = {}
) => {
  const directory = path.dirname(fileURLToPath(meta.url))
  const filePath = path.join(directory, name)

  let content = fs.readFileSync(path.resolve(filePath), 'utf8')

  if (trim) content = content.trim()

  return delimiter ? content.split(delimiter) : [content]
}

export default readInput
