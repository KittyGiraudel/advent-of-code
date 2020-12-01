const getCombinations = require('../helpers/getCombinations')
const readInput = require('../helpers/readInput')

const numbers = readInput('./src/day-1/input.txt').map(Number)

const getResult = size => findMatches(numbers, size).reduce((a, b) => a * b, 1)

const findMatches = (input, size) =>
  getCombinations(input, size).find(
    set => set.reduce((a, b) => a + b, 0) === 2020
  )

module.exports = {
  getResult,
  findMatches,
}
