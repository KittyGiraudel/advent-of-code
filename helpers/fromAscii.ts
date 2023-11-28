/**
 * Convert an array of ASCII codes into a string.
 */
const fromAscii = (codes: number[]): string =>
  codes.map(code => String.fromCharCode(code)).join('')

export default fromAscii
