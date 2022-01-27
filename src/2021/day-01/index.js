// Count the amount of numbers which are higher than the previous one in the
// array.
// @param {Number[]} input - Array of numbers
// @return {Number}
const countIncreases = input =>
  input.reduce(
    (acc, number, index, array) =>
      acc + (number > (array[index - 1] || number) ? 1 : 0),
    0
  )

// Count the amount of window of numbers (series of 3 successive items) which
// are higher than the previous one in the array.
// @param {Number[]} input - Array of numbers
// @return {Number}
const countWindowIncreases = input =>
  countIncreases(
    input.reduce(
      (acc, number, index, array) =>
        index < 2
          ? acc
          : [...acc, number + array[index - 1] + array[index - 2]],
      []
    )
  )

module.exports = { countIncreases, countWindowIncreases }
