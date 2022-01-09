const toAscii = (string, withLineBreak = true) =>
  Array.from(string + (withLineBreak ? '\n' : '')).map(c => c.charCodeAt())

module.exports = toAscii
