/**
 * Convert a decimal number into a binary one.
 * @param value - Value to convert
 */
const toBin = (value: number) => (value >>> 0).toString(2).padStart(36, '0')

export default toBin
