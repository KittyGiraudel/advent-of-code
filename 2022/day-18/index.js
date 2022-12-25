const $ = require('../../helpers')

const VECTORS = ['1,0,0', '-1,0,0', '0,1,0', '0,-1,0', '0,0,1', '0,0,-1'].map(
  v => v.split(',').map(Number)
)

const getSides = curr => VECTORS.map(vector => $.applyVector(curr, vector))

const getArea = (cubes, predicate) =>
  cubes.flatMap(getSides).map($.toPoint).filter(predicate).length

const getSurfaceArea = (points, advanced = false) => {
  const cubes = points.map(point => point.split(',').map(Number))
  const [minX, maxX, minY, maxY, minZ, maxZ] = $.boundaries(cubes)
  const isWithinBounds = ([x, y, z]) =>
    $.isClamped(x, minX - 1, maxX + 1) &&
    $.isClamped(y, minY - 1, maxY + 1) &&
    $.isClamped(z, minZ - 1, maxZ + 1)

  if (!advanced) {
    return getArea(cubes, point => !points.includes(point))
  }

  // Walk the entire space from a water perspective (flood-fill). Start outside
  // of the bounding box on purpose, and flood the gaps (which are positions
  // that are not listed as part of our input).
  const start = [minX - 1, minY - 1, minZ - 1]
  const { from: flooded } = $.pathfinding.search({
    start,
    getNeighbors: coords =>
      getSides(coords)
        .filter(coords => !points.includes($.toPoint(coords)))
        .filter(isWithinBounds),
  })

  return getArea(cubes, point => point in flooded)
}

module.exports = { getSurfaceArea }
