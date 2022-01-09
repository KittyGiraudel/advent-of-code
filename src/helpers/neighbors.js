// Return the coordinates of the cells around (4 or 8, depending on whether
// diagonals are considered) the cells at `ri` (row index) and `ci` (column
// index) as [Y, X] tuples (Y first because rows are read before columns in a
// bi-dimensional array, e.g. `grid[row][column]`).
// @param {Boolean} withDiagonals - Whether to return NE, SE, SW and NW coords
// @param {Number} ri - Row index (Y)
// @param {Number} ci - Column index (X)
// @return {Number[][]}
const getCoords = withDiagonals => (ri, ci) =>
  [
    /* N  */ [ri - 1, ci],
    withDiagonals && /* NE */ [ri - 1, ci + 1],
    /* E  */ [ri, ci + 1],
    withDiagonals && /* SE */ [ri + 1, ci + 1],
    /* S  */ [ri + 1, ci],
    withDiagonals && /* SW */ [ri + 1, ci - 1],
    /* W  */ [ri, ci - 1],
    withDiagonals && /* NW */ [ri - 1, ci - 1],
  ].filter(Boolean)

module.exports = { bordering: getCoords(false), surrounding: getCoords(true) }
