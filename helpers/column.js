// Return the column at given index in a bi-dimensional array.
// @param {Array[]} grid - Grid to read the column from
// @param {Number} index - Index of the column
// @return {Array}
const column = (grid, index) => grid.map(row => row[index])

module.exports = column
