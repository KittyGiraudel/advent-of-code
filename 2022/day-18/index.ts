import $ from '../../helpers'
import { TriCoords, TriPoint } from '../../types'

const VECTORS: TriCoords[] = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

const getSides = (curr: TriCoords) =>
  VECTORS.map(vector => $.applyVector(curr, vector))

const getArea = (cubes: TriCoords[], predicate: (point: TriPoint) => boolean) =>
  cubes
    .flatMap(getSides)
    .map(coords => $.toPoint(coords))
    .filter(point => predicate(point)).length

export const getSurfaceArea = (points: TriPoint[], part2: boolean = false) => {
  const cubes: TriCoords[] = points.map(point => $.toCoords(point))
  const [minX, maxX, minY, maxY, minZ, maxZ] = $.boundaries(cubes)
  const isWithinBounds = ([x, y, z]: TriCoords) =>
    $.isClamped(x, minX - 1, maxX + 1) &&
    $.isClamped(y, minY - 1, maxY + 1) &&
    $.isClamped(z!, minZ - 1, maxZ + 1)

  if (!part2) {
    return getArea(cubes, point => !points.includes(point))
  }

  // Walk the entire space from a water perspective (flood-fill). Start outside
  // of the bounding box on purpose, and flood the gaps (which are positions
  // that are not listed as part of our input).
  const start: TriCoords = [minX - 1, minY - 1, minZ - 1]
  const { graph: flooded } = $.search.bfs({
    start,
    getNextNodes: (coords: TriCoords) =>
      getSides(coords)
        .filter(coords => !points.includes($.toPoint(coords)))
        .filter(isWithinBounds),
  })

  return getArea(cubes, point => point in flooded)
}
