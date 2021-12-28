// Sum all values in array, starting with initial value.
// @param {Number[]} values - Values to sum
// @return {Number}
const sum = (values, init = 0) => values.reduce((a, b) => a + b, init)

module.exports = sum
