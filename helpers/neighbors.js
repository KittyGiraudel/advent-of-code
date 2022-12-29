import toPoint from './toPoint'
const cache = new Map()

// Return the coordinates of the cells around (4 or 8, depending on whether
// diagonals are considered) the cells at `ri` (row index) and `ci` (column
// index) as [Y, X] tuples (Y first because rows are read before columns in a
// bi-dimensional array, e.g. `grid[row][column]`).
// @param {Boolean} withDiagonals - Whether to return NE, SE, SW and NW coords
// @param {Number[]} coords - Row index (Y) + Column index (X)
// @param {String} strategy - COORDS, POINTS or BOTH
// @return {Number[][]}
const getCoords = withDiagonals => {
  return ([ri, ci], strategy = 'BOTH') => {
    const key = ri + ',' + ci + '-' + withDiagonals + '-' + strategy

    if (cache.has(key)) {
      return cache.get(key)
    }

    let neighbors = [
      /* N  */ [ri - 1, ci],
      withDiagonals && /* NE */ [ri - 1, ci + 1],
      /* E  */ [ri, ci + 1],
      withDiagonals && /* SE */ [ri + 1, ci + 1],
      /* S  */ [ri + 1, ci],
      withDiagonals && /* SW */ [ri + 1, ci - 1],
      /* W  */ [ri, ci - 1],
      withDiagonals && /* NW */ [ri - 1, ci - 1],
    ].filter(Boolean)

    if (strategy === 'POINTS') {
      neighbors = neighbors.map(toPoint)
    } else if (strategy === 'BOTH') {
      neighbors = neighbors.map(coords => ({ coords, point: toPoint(coords) }))
    }

    cache.set(key, neighbors)

    return neighbors
  }
}

export const bordering = getCoords(false)
export const surrounding = getCoords(true)
