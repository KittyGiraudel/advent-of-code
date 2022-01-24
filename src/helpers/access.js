// Attempt to read the value in the given grid at the given coordinates.
// @param {Array[]} grid - Grid to read value from
// @param {Number[]} coords - Y,X set of coordinates
// @return {*}
const access = (grid, coords) => grid?.[coords[0]]?.[coords[1]]

module.exports = access
