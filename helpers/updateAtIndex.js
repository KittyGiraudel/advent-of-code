// Return a new array with the value at given index updated with the given
// value.
// @param {Array} array - Array to update (non-mutative)
// @param {Number} index - Index to update
// @param {*} value - New value for index
// @return {Array}
const updateAtIndex = (array, index, value) => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1),
]

export default updateAtIndex
