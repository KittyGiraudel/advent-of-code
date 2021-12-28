const findGCD = require('./findGCD')

// Find the lowest common denominator for the two given numbers.
// @param {Number} a
// @param {Number} b
// @return {Number}
const findLCM = (a, b) => (a * b) / findGCD(a, b)

module.exports = findLCM
