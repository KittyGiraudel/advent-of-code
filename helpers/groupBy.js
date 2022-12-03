// Group an array of objects by a certain key.
// @param {Object[]} array - Array of items to group
// @param {String} key - Object key to group by
// @return {Object}
const groupBy = (array, key) => {
  return array.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

module.exports = groupBy
