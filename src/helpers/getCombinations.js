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

module.exports = getCombinations
