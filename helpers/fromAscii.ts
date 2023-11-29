/**
 * Convert an array of ASCII codes into a string.
 */
const fromAscii = (codes: number[]) =>
  codes.map(code => String.fromCharCode(code)).join('')

export default fromAscii
