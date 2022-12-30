import $ from '../../helpers'
import { Coords } from '../../types'

const VECTORS: Coords[] = [
  '1,0,0',
  '-1,0,0',
  '0,1,0',
  '0,-1,0',
  '0,0,1',
  '0,0,-1',
].map($.toCoords)

const getSides = (curr: Coords) =>
  VECTORS.map(vector => $.applyVector(curr, vector))

const getArea = (cubes: Coords[], predicate: Function) =>
  cubes
    .flatMap(getSides)
    .map($.toPoint)
    .filter(point => predicate(point)).length

export const getSurfaceArea = (
  points: string[],
  advanced: boolean = false
): number => {
  const cubes = points.map($.toCoords)
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
