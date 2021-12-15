const sum = require('../../helpers/sum')
const createGrid = require('../../helpers/createGrid')
const { getSurroundingCoords } = require('../../helpers/getNeighborCoords')

const makeGrid = rows =>
  createGrid(rows, oc => ({ value: +oc, flashed: false }))

const countNewFlashes = grid =>
  sum(grid.map(row => row.map(oc => +oc.flashed)).flat())

const processFlashes = grid => {
  const toIncrement = []

  grid.forEach((row, ri) => {
    row.forEach((oc, ci) => {
      if (!oc.flashed && oc.value > 9) {
        oc.flashed = true
        toIncrement.push(...getSurroundingCoords(ri, ci))
      }
    })
  })

  toIncrement.forEach(([ri, ci]) => {
    const oc = grid?.[ri]?.[ci]
    if (oc) oc.value++
  })

  if (toIncrement.length > 0) processFlashes(grid)
}

const cycle = grid => {
  // 1. Increment
  grid.forEach(row => row.forEach(oc => oc.value++))

  // 2. Flashes
  processFlashes(grid)

  // 2b. Count flashes
  const flashes = countNewFlashes(grid)

  // 3. Reset
  grid.forEach(row => {
    row.forEach(oc => {
      oc.flashed = false
      if (oc.value > 9) oc.value = 0
    })
  })

  return flashes
}

const countFlashes = (rows, steps) => {
  const grid = makeGrid(rows)
  let flashes = 0

  for (let s = 0; s < steps; s++) flashes += cycle(grid)

  return flashes
}

const isSynced = grid => grid.every(row => row.every(oc => oc.value === 0))

const findSynchronocity = rows => {
  const grid = makeGrid(rows)
  let i = 0

  while (!isSynced(grid)) i++, cycle(grid)

  return i
}

module.exports = { countFlashes, findSynchronocity }
