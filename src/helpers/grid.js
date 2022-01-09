const loopOnGrid =
  (handler = 'forEach') =>
  (grid, callback) =>
    grid[handler]((row, ri) =>
      row[handler]((item, ci) => callback(item, ri, ci))
    )

const gridReduce = (grid, callback, acc) =>
  grid.reduce(
    (accRow, row, ri) =>
      row.reduce((accCol, item, ci) => callback(accCol, item, ri, ci), accRow),
    acc
  )

const gridForEach = loopOnGrid('forEach')
const gridMap = loopOnGrid('map')
const gridEvery = loopOnGrid('every')

const identity = value => value
const createGrid = (rows, mapper = identity) =>
  rows.map(row => row.split('').map(mapper))
const cloneGrid = grid => grid.slice(0).map(row => row.slice(0))

const initGrid = (width, height = width, value = null) =>
  Array.from({ length: height }, (_, ri) =>
    Array.from({ length: width }, (_, ci) =>
      typeof value === 'function' ? value(ci, ri) : value
    )
  )

const renderGrid = (grid, separator = '', mapper = v => v) =>
  grid.map(row => row.map(mapper).join(separator)).join('\n')

const grid = {
  forEach: gridForEach,
  map: gridMap,
  every: gridEvery,
  reduce: gridReduce,
  create: createGrid,
  clone: cloneGrid,
  init: initGrid,
  render: renderGrid,
}

module.exports = grid
