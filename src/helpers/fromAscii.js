// Convert an array of ASCII codes into a string.
// @param {Number[]} codes - ASCII codes
// @return {String}
const fromAscii = codes => codes.map(code => String.fromCharCode(code)).join('')

module.exports = fromAscii
