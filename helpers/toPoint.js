// Join a coordinate expressed as an array into a string separated by comma,
// typically to use it as a key for a map or a set.
// @param {Number[]} coords - Coords to serialize
// @return {String}
const toPoint = coords => coords.join(',')

module.exports = toPoint
