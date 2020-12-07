const getCombinations = require('../helpers/getCombinations')
const sum = require('../helpers/sum')
const product = require('../helpers/product')

// Find set of `size` items from `input` array summing to 2020.
// @param {Number[]} input - Array of numbers
// @param {Number} size - Amount of items whose sum is 2020
// @return {Number[]}
const findMatches = (numbers, size) =>
  getCombinations(numbers, size).find(set => sum(set) === 2020)

module.exports = { findMatches }
