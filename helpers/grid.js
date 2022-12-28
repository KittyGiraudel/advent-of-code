const _loopOnGrid =
  (handler = 'forEach') =>
  (grid, callback) =>
    grid[handler]((row, ri) =>
      row[handler]((item, ci) => callback(item, ri, ci))
    )

const gridForEach = _loopOnGrid('forEach')
const gridMap = _loopOnGrid('map')
const gridFlatMap = _loopOnGrid('flatMap')
const gridEvery = _loopOnGrid('every')
const gridReduce = (grid, callback, acc) =>
  grid.reduce(
    (accRow, row, ri) =>
      row.reduce((accCol, item, ci) => callback(accCol, item, ri, ci), accRow),
    acc
  )

const identity = value => value
const createGrid = (rows, mapper = identity) =>
  rows.map((row, ri) => row.split('').map((item, ci) => mapper(item, ri, ci)))
const cloneGrid = grid => grid.slice(0).map(row => row.slice(0))

const initGrid = (width, height = width, value = null) =>
  Array.from({ length: height }, (_, ri) =>
    Array.from({ length: width }, (_, ci) =>
      typeof value === 'function' ? value(ci, ri) : value
    )
  )

const gridRotate = grid =>
  grid[0].map((_, index) => grid.map(row => row[index]).reverse())

const renderGrid = (grid, separator = '', mapper = v => v) =>
  gridMap(grid, mapper)
    .map(row => row.join(separator))
    .join('\n')

const gridVariants = grid => {
  const variants = []
  const clone = cloneGrid(grid)

  const rotate = (grid, rotations = 0) => {
    for (let i = 0; i < rotations; i++) grid = gridRotate(grid)
    return grid
  }

  for (let i = 0; i <= 3; i++) {
    const matrix = rotate(clone, i)
    variants.push(matrix)
    variants.push(matrix.slice(0).reverse())
  }

  return variants
}

const grid = {
  forEach: gridForEach,
  map: gridMap,
  flatMap: gridFlatMap,
  every: gridEvery,
  rotate: gridRotate,
  reduce: gridReduce,
  create: createGrid,
  clone: cloneGrid,
  init: initGrid,
  render: renderGrid,
  variants: gridVariants,
}

module.exports = grid
