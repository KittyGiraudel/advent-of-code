// Apply the given vector to the given X,Y coords.
// @param {Number[]} coords - Set of X,Y coords
// @param {Number[]} vector - Vector to shift coords by
// @return {Number[]}
const applyVector = (coords, vector) => [
  coords[0] + vector[0],
  coords[1] + vector[1],
]

module.exports = applyVector
