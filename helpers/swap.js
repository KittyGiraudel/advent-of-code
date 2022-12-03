// Swap the values at indices a and b in given array.
// @param {Array} array - Array to modify
// @param {Number} a - First index
// @param {Number} b - Second index
// @return {Array}
const swap = (array, a, b) => {
  ;[array[a], array[b]] = [array[b], array[a]]
  return array
}

module.exports = swap
