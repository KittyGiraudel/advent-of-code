// Apply the given vector to the given X,Y(,Z) coords.
// @param {Number[]} coords - Set of X,Y(,Z) coords
// @param {Number[]} vector - Vector to shift coords by
// @return {Number[]}
const applyVector = (coords, vector) =>
  [
    coords[0] + vector[0],
    coords[1] + vector[1],
    !isNaN(coords[2]) && !isNaN(vector[2]) ? coords[2] + vector[2] : null,
  ].filter(segment => !isNaN(segment))

module.exports = applyVector
