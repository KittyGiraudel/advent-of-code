// Return a generator that loops between the given minimum and maximum value
// (both included).
// @param {Number} min - Minimum value
// @param {Number} max- Maximum value
// @return {Generator}
function* loopIndex(min, max) {
  let index = min
  while (true) {
    yield index++
    if (index === max + 1) index = min
  }
}

module.exports = loopIndex
