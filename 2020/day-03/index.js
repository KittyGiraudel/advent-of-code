const $ = require('../../helpers')

// Count the amount of trees encountered on a slope defined by given vector.
// @param {String[]} grid - Rows of strings
// @param {Number[]} vector - X,Y vector
// @param {Number} Amount of trees
const getTreeCountForSlope = (rows, vector) => {
  const width = rows[0].length
  const coords = [0, 0]
  const pings = []
  const length = Math.ceil(rows.length / vector[1])

  for (let i = 0; i < length; i++) {
    pings.push(rows[coords[1]][coords[0] % width])
    coords[0] += vector[0]
    coords[1] += vector[1]
  }

  return pings.filter(char => char === '#').length
}

// Compute the product of the amount of trees found on the slopes defined by
// the given vectors.
// @param {String[]} grid - Rows of strings
// @param {Number[][]} vectors - Array of X,Y vectors
// @return {Number}
const getResult = (rows, vectors) =>
  $.product(vectors.map(vector => getTreeCountForSlope(rows, vector)))

module.exports = { getTreeCountForSlope, getResult }
