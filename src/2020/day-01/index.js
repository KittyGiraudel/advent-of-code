const $ = require('../../helpers')

// Find set of `size` items from `input` array summing to 2020.
// @param {Number[]} input - Array of numbers
// @param {Number} size - Amount of items whose sum is 2020
// @return {Number[]}
const findMatches = (numbers, size, expectation = 2020) =>
  $.getCombinations(numbers, size).find(set => $.sum(set) === expectation)

module.exports = { findMatches }
