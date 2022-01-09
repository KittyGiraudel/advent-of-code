const gcd = require('./gcd')

// Find the lowest common denominator for the two given numbers.
// @param {Number} a
// @param {Number} b
// @return {Number}
const lcm = (a, b) => (a * b) / gcd(a, b)

module.exports = lcm
