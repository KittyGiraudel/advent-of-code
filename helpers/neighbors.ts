import { Coords, Point, CoordsAndPoint } from '../types'
import toCoords from './toCoords'
import toPoint from './toPoint'

const cache = new Map<string, Coords[] | Point[] | CoordsAndPoint[]>()

/**
 * Return the coordinates of the cells around (4 or 8, depending on whether
 * diagonals are considered) the cells at `ri` (row index) and `ci` (column
 * index) as [Y, X] tuples (Y first because rows are read before columns in a
 * bi-dimensional array, e.g. `grid[row][column]`).
 * @param coords - Either a point, a set of Y,X coords, or both
 * @param withDiagonals - Whether to return NE, SE, SW and NW coords
 */
function getNeighbors<T extends Coords | Point | CoordsAndPoint>(
  position: T,
  withDiagonals: boolean
) {
  const [ri, ci] =
    typeof position === 'string'
      ? toCoords(position)
      : Array.isArray(position)
      ? position
      : position.coords

  let strategy = 'BOTH'
  if (typeof position === 'string') strategy = 'POINTS'
  if (Array.isArray(position)) strategy = 'COORDS'

  const key = ri + ',' + ci + '-' + withDiagonals + '-' + strategy

  if (cache.has(key)) {
    return cache.get(key) as T[]
  }

  const neighbors: Coords[] = [
    /* N  */ [ri - 1, ci],
    withDiagonals && /* NE */ [ri - 1, ci + 1],
    /* E  */ [ri, ci + 1],
    withDiagonals && /* SE */ [ri + 1, ci + 1],
    /* S  */ [ri + 1, ci],
    withDiagonals && /* SW */ [ri + 1, ci - 1],
    /* W  */ [ri, ci - 1],
    withDiagonals && /* NW */ [ri - 1, ci - 1],
  ].filter((coords): coords is Coords => Boolean(coords))

  if (strategy === 'POINTS') {
    const results: Point[] = neighbors.map(coords => toPoint(coords))
    cache.set(key, results)
    return results
  } else if (strategy === 'COORDS') {
    const results: Coords[] = neighbors
    cache.set(key, results)
    return results
  } else if (strategy === 'BOTH') {
    const results: CoordsAndPoint[] = neighbors.map(coords => ({
      coords,
      point: toPoint(coords),
    }))
    cache.set(key, results)
    return results
  }

  throw new Error('Invalid strategy ' + strategy)
}

export function bordering(position: Coords): Coords[]
export function bordering(position: Point): Point[]
export function bordering(position: CoordsAndPoint): CoordsAndPoint[]
export function bordering(position: Coords | Point | CoordsAndPoint) {
  return getNeighbors(position, false)
}

export function surrounding(position: Coords): Coords[]
export function surrounding(position: Point): Point[]
export function surrounding(position: CoordsAndPoint): CoordsAndPoint[]
export function surrounding(position: Coords | Point | CoordsAndPoint) {
  return getNeighbors(position, true)
}
