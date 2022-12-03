const $ = require('../../helpers')

const makeGrid = rows =>
  $.grid.create(rows, oc => ({ value: +oc, flashed: false }))

const countNewFlashes = grid =>
  $.grid.reduce(grid, (acc, oc) => acc + +oc.flashed, 0)

const processFlashes = grid => {
  const toIncrement = []

  $.grid.forEach(grid, (oc, ri, ci) => {
    if (!oc.flashed && oc.value > 9) {
      oc.flashed = true
      toIncrement.push(...$.surrounding([ri, ci], 'COORDS'))
    }
  })

  toIncrement.forEach(coords => {
    const oc = $.access(grid, coords)
    if (oc) oc.value++
  })

  if (toIncrement.length > 0) processFlashes(grid)
}

const cycle = grid => {
  // 1. Increment
  $.grid.forEach(grid, oc => oc.value++)

  // 2. Flashes
  processFlashes(grid)

  // 2b. Count flashes
  const flashes = countNewFlashes(grid)

  // 3. Reset
  $.grid.forEach(grid, oc => {
    oc.flashed = false
    if (oc.value > 9) oc.value = 0
  })

  return flashes
}

const countFlashes = (rows, steps) => {
  const grid = makeGrid(rows)
  let flashes = 0

  for (let s = 0; s < steps; s++) flashes += cycle(grid)

  return flashes
}

const isSynced = grid => $.grid.every(grid, oc => oc.value === 0)

const findSynchronocity = rows => {
  const grid = makeGrid(rows)
  let i = 0

  while (!isSynced(grid)) i++, cycle(grid)

  return i
}

module.exports = { countFlashes, findSynchronocity }
