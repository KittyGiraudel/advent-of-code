const sum = require('../helpers/sum')
const { findMatches } = require('../day-1')

// Find the first number in `input` which cannot be obtained by summing 2
// numbers in its preamble (`size` previous numbers).
// @param {Number[]} input - Array of numbers
// @param {Number} size - Size of the preamble
// @return {Number}
const findWeakness = (input, size = 25) =>
  input.find(
    (number, index, array) =>
      index >= size && !findMatches(array.slice(index - size, index), 2, number)
  )

// Find a contiguous set of at least two numbers whose sum is equal to the
// input’s weakness, and sum the lowest and highest numbers of this set.
// @param {Number[]} input - Array of numbers
// @param {Number} size - Size of the preamble
// @return {Number}
const breakWeakness = (input, size = 25) => {
  const weakness = findWeakness(input, size)

  for (let i = 0; i < input.length; i += 1) {
    for (let j = i + 1; j < input.length; j += 1) {
      const range = input.slice(i, j)
      const total = sum(range)
      if (total > weakness) break
      if (total === weakness) return Math.min(...range) + Math.max(...range)
    }
  }

  return null
}

module.exports = { findWeakness, breakWeakness }
