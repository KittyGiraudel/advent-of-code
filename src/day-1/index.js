const sum = require('../helpers/sum')

// Return all possible unique combinations of size `n` from given `array`.
// @param {Array} array - Array to compute combinations for
// @param {Number} n - Combination size
// @param {Array} start - Internal
// @param {Array} tmp - Internal
// @return {Array}
const getCombinations = (array, n, start = [], tmp = []) =>
  array.reduce((acc, item, index, array) => {
    if (n > 1) {
      tmp.push(item)
      getCombinations(array.slice(index + 1), n - 1, acc, tmp)
    } else {
      acc.push((tmp.push(item), tmp).slice(0))
    }

    tmp.pop()

    return acc
  }, start)

// Find set of `size` items from `input` array summing to 2020.
// @param {Number[]} input - Array of numbers
// @param {Number} size - Amount of items whose sum is 2020
// @return {Number[]}
const findMatches = (numbers, size) =>
  getCombinations(numbers, size).find(set => sum(set) === 2020)

module.exports = { findMatches }
