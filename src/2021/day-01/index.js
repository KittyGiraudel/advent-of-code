// Count the amount of numbers which are higher than the previous one in the
// array.
// @param {Number[]} input - Array of numbers
// @return {Number}
const countIncreases = input =>
  input.reduce((acc, n, i, a) => acc + (n > (a[i - 1] || n) ? 1 : 0), 0)

// Count the amount of window of numbers (series of 3 successive items) which
// are higher than the previous one in the array.
// @param {Number[]} input - Array of numbers
// @return {Number}
const countWindowIncreases = input =>
  countIncreases(
    input.reduce(
      (acc, n, i, a) => (i < 2 ? acc : [...acc, n + a[i - 1] + a[i - 2]]),
      []
    )
  )

module.exports = { countIncreases, countWindowIncreases }
