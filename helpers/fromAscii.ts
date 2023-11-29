/**
 * Convert an array of ASCII codes into a string.
 */
const fromAscii = (codes: Array<number>) =>
  codes.map(code => String.fromCharCode(code)).join('')

export default fromAscii
