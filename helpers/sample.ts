type Options = {
  delimiter?: string
  trim?: boolean
  deindent?: boolean
}

/**
 * Read the input file of the given directory, and split its (optionally
 * trimmed) content on the given delimiter.
 */
const sample = (
  string: string,
  { delimiter = '\n', trim = true, deindent = true }: Options = {}
) => {
  let content = string

  if (deindent) content = content.replace(/^[ \t]{2,}/gm, '')
  if (trim) content = content.trim()

  return delimiter ? content.split(delimiter) : [content]
}

export default sample
