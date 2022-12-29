// Transform the given string into an array of ASCII codes, with an additional
// line break character at the end.
// @param {String} string - String to encode
// @param {Boolean} withLineBreak - Whether to encode an extra line break
// @return {Number[]}
const toAscii = (string, withLineBreak = true) =>
  Array.from(string + (withLineBreak ? '\n' : '')).map(c => c.charCodeAt())

export default toAscii
