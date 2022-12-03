// Rotate the given array to the right `n` times.
// @param {Array} array - Array to rotate
// @param {Number} n - Number of iterations
// @return {Array}
const rotate = (array, n = 1) => {
  if (n > 0) {
    while (n--) array.unshift(array.pop())
  } else if (n < 0) {
    while (n++) array.push(array.shift())
  }
  return array
}

module.exports = rotate
