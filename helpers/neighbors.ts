import { Coords, Point, CoordsAndPoint } from '../types'
import toPoint from './toPoint'

type Strategy = 'COORDS' | 'POINTS' | 'BOTH'

const cache: Map<string, Coords[] | Point[] | CoordsAndPoint[]> = new Map()

/**
 * Return the coordinates of the cells around (4 or 8, depending on whether
 * diagonals are considered) the cells at `ri` (row index) and `ci` (column
 * index) as [Y, X] tuples (Y first because rows are read before columns in a
 * bi-dimensional array, e.g. `grid[row][column]`).
 * @param withDiagonals - Whether to return NE, SE, SW and NW coords
 * @param coords - Row index (Y) + Column index (X)
 * @param strategy - COORDS, POINTS or BOTH
 */
function getCoords(
  [ri, ci]: Coords,
  withDiagonals: boolean,
  strategy: Strategy = 'BOTH'
) {
  const key = ri + ',' + ci + '-' + withDiagonals + '-' + strategy

  if (cache.has(key)) {
    return cache.get(key)
  }

  const neighbors = [
    /* N  */ [ri - 1, ci],
    withDiagonals && /* NE */ [ri - 1, ci + 1],
    /* E  */ [ri, ci + 1],
    withDiagonals && /* SE */ [ri + 1, ci + 1],
    /* S  */ [ri + 1, ci],
    withDiagonals && /* SW */ [ri + 1, ci - 1],
    /* W  */ [ri, ci - 1],
    withDiagonals && /* NW */ [ri - 1, ci - 1],
  ].filter(Boolean) as Coords[]

  let result

  if (strategy === 'POINTS') {
    result = neighbors.map<Point>(coords => toPoint(coords))
  } else if (strategy === 'COORDS') {
    result = neighbors
  } else if (strategy === 'BOTH') {
    result = neighbors.map<CoordsAndPoint>(coords => ({
      coords,
      point: toPoint(coords),
    }))
  }

  if (!result) {
    throw new Error(`Could not return neighbors for key ${key}.`)
  }

  cache.set(key, result)

  return result
}

export function bordering(coords: Coords, strategy: 'BOTH'): CoordsAndPoint[]
export function bordering(coords: Coords, strategy: 'POINTS'): Point[]
export function bordering(coords: Coords, strategy: 'COORDS'): Coords[]
export function bordering(coords: Coords, strategy?: Strategy) {
  return getCoords(coords, false, strategy)
}

export function surrounding(coords: Coords, strategy: 'BOTH'): CoordsAndPoint[]
export function surrounding(coords: Coords, strategy: 'POINTS'): Point[]
export function surrounding(coords: Coords, strategy: 'COORDS'): Coords[]
export function surrounding(coords: Coords, strategy?: Strategy) {
  return getCoords(coords, true, strategy)
}
