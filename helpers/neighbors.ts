import { Coords, Point, CoordsAndPoint } from '../types'
import toPoint from './toPoint'

type Strategy = 'COORDS' | 'POINTS' | 'BOTH'

const cache: Map<string, Coords[] | Point[] | CoordsAndPoint[]> = new Map()

// Return the coordinates of the cells around (4 or 8, depending on whether
// diagonals are considered) the cells at `ri` (row index) and `ci` (column
// index) as [Y, X] tuples (Y first because rows are read before columns in a
// bi-dimensional array, e.g. `grid[row][column]`).
// @param withDiagonals - Whether to return NE, SE, SW and NW coords
// @param coords - Row index (Y) + Column index (X)
// @param strategy - COORDS, POINTS or BOTH
const getCoords = (withDiagonals: boolean) => {
  return ([ri, ci]: Coords, strategy: Strategy = 'BOTH') => {
    const key = ri + ',' + ci + '-' + withDiagonals + '-' + strategy

    if (cache.has(key)) {
      return cache.get(key)
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
    ].filter(Boolean) as Coords[]

    let result

    if (strategy === 'POINTS') {
      result = neighbors.map(toPoint) as Point[]
    } else if (strategy === 'COORDS') {
      result = neighbors
    } else if (strategy === 'BOTH') {
      result = neighbors.map(coords => ({
        coords,
        point: toPoint(coords),
      })) as CoordsAndPoint[]
    }

    cache.set(key, result)

    return result
  }
}

export const bordering = getCoords(false)
export const surrounding = getCoords(true)
