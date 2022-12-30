// Read the input file of the given directory, and split its (optionally
// trimmed) content on the given delimiter.
const sample = (
  string: string,
  delimiter: string = '\n',
  trim: boolean = true,
  deindent: boolean = true
): string[] => {
  let content = string

  if (deindent) content = content.replace(/^[ \t]{2,}/gm, '')
  if (trim) content = content.trim()

  return delimiter ? content.split(delimiter) : [content]
}

export default sample
