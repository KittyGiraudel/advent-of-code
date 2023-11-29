/**
 * Transform the given string into an array of ASCII codes, with an additional
 * line break character at the end.
 */
const toAscii = (string: string, withLineBreak: boolean = true) =>
  Array.from(string + (withLineBreak ? '\n' : '')).map(c => c.charCodeAt(0))

export default toAscii
