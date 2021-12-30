const loopOnGrid =
  (handler = 'forEach') =>
  (grid, callback) =>
    grid[handler]((row, ri) =>
      row[handler]((item, ci) => callback(item, ri, ci))
    )

const gridForEach = loopOnGrid('forEach')
const gridMap = loopOnGrid('map')
const gridEvery = loopOnGrid('every')

module.exports = { gridForEach, gridMap, gridEvery }
