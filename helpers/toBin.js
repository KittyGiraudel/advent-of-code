// Convert a decimal number into a binary one.
// @param {Number} value - Number to convert to binary
// @return {String}
const toBin = value => (value >>> 0).toString(2).padStart(36, '0')

export default toBin
