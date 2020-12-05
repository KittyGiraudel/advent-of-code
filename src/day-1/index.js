const getCombinations = require('../helpers/getCombinations')

const getProduct = (input, size) =>
  findMatches(input, size).reduce((a, b) => a * b, 1)

const findMatches = (input, size) =>
  getCombinations(input, size).find(
    set => set.reduce((a, b) => a + b, 0) === 2020
  )

module.exports = {
  getProduct,
  findMatches,
}
