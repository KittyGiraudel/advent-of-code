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

const getBorderingCoords = getCoords(false)
const getSurroundingCoords = getCoords(true)

module.exports = { getBorderingCoords, getSurroundingCoords }
