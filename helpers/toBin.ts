/**
 * Convert a decimal number into a binary one.
 */
const toBin = (value: number): string =>
  (value >>> 0).toString(2).padStart(36, '0')

export default toBin
