const $ = require('../../helpers')

const makeGrid = rows =>
  $.createGrid(rows, oc => ({ value: +oc, flashed: false }))

const countNewFlashes = grid => $.sum($.gridMap(grid, oc => +oc.flashed).flat())

const processFlashes = grid => {
  const toIncrement = []

  $.gridForEach(grid, (oc, ri, ci) => {
    if (!oc.flashed && oc.value > 9) {
      oc.flashed = true
      toIncrement.push(...$.getSurroundingCoords(ri, ci))
    }
  })

  toIncrement.forEach(([ri, ci]) => {
    const oc = grid?.[ri]?.[ci]
    if (oc) oc.value++
  })

  if (toIncrement.length > 0) processFlashes(grid)
}

const cycle = grid => {
  // 1. Increment
  $.gridForEach(grid, oc => oc.value++)

  // 2. Flashes
  processFlashes(grid)

  // 2b. Count flashes
  const flashes = countNewFlashes(grid)

  // 3. Reset
  $.gridForEach(grid, oc => {
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

const isSynced = grid => $.gridEvery(grid, oc => oc.value === 0)

const findSynchronocity = rows => {
  const grid = makeGrid(rows)
  let i = 0

  while (!isSynced(grid)) i++, cycle(grid)

  return i
}

module.exports = { countFlashes, findSynchronocity }
