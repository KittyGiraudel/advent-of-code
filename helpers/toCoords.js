// Split a string into its numeric part (separated by commas), typically
// coordinates.
// @param {String} point - Point to split
// @return {Number[]}
const toCoords = point => point.split(',').map(Number)

module.exports = toCoords
