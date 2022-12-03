// Find the greatest common denominator for the two given numbers.
// @param {Number} a
// @param {Number} b
// @return {Number}
const gcd = (a, b) => (b ? gcd(b, a % b) : a)

module.exports = gcd
