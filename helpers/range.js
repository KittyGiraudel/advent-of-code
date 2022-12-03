// Return an array of consecutive numbers of the expected size.
// @param {Number} size - Array size
// @param {Number} startAt - Initial value
// @return {Number[]}
const range = (size, startAt = 0) =>
  [...Array(size).keys()].map(i => i + startAt)

module.exports = range
