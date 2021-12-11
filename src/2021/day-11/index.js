const makeGrid = rows =>
  rows.map(row => row.split('').map(oc => ({ value: +oc, flashed: false })))

const countNewFlashes = grid =>
  grid.reduce(
    (total, row) =>
      total + row.reduce((subTotal, oc) => subTotal + +oc.flashed, 0),
    0
  )

const getNeighborCoords = (ri, ci) => [
  /* N  */ [ri - 1, ci],
  /* NE */ [ri - 1, ci + 1],
  /* E  */ [ri, ci + 1],
  /* SE */ [ri + 1, ci + 1],
  /* S  */ [ri + 1, ci],
  /* SW */ [ri + 1, ci - 1],
  /* W  */ [ri, ci - 1],
  /* NW */ [ri - 1, ci - 1],
]

const processFlashes = grid => {
  const toIncrement = []

  grid.forEach((row, ri) => {
    row.forEach((oc, ci) => {
      if (!oc.flashed && oc.value > 9) {
        oc.flashed = true
        toIncrement.push(...getNeighborCoords(ri, ci))
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

const printGrid = grid => {
  console.log('')
  console.log(
    grid
      .map(row => row.map(oc => String(oc.value).padStart(2, ' ')).join(' '))
      .join('\n')
  )
  console.log('')
}

const countFlashes = (rows, steps) => {
  let flashes = 0
  const grid = makeGrid(rows)

  for (let s = 0; s < steps; s++) flashes += cycle(grid)

  return flashes
}

const areOcSynced = grid => grid.every(row => row.every(oc => oc.value === 0))

const findSynchronocity = rows => {
  const grid = makeGrid(rows)
  let i = 0

  while (true) {
    i++
    cycle(grid)
    if (areOcSynced(grid)) return i
  }
}

module.exports = { countFlashes, findSynchronocity }
