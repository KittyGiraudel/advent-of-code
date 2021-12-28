// Find the greatest common denominator for the two given numbers.
// @param {Number} a
// @param {Number} b
// @return {Number}
const findGCD = (a, b) => (b ? findGCD(b, a % b) : a)

module.exports = findGCD
