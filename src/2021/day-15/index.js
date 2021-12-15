const Graph = require('node-dijkstra')

const getNeighborCoords = (ri, ci) => [
  [ri - 1, ci],
  [ri, ci + 1],
  [ri + 1, ci],
  [ri, ci - 1],
]

const createGraph = grid => {
  const xMax = grid[0].length
  const yMax = grid.length
  const getValue = ([ri, ci]) => grid[ri][ci]
  const route = new Graph()

  grid.forEach((row, ri) => {
    row.forEach((_, ci) => {
      const neighbors = getNeighborCoords(ri, ci)
        .filter(([ri, ci]) => !(ri < 0 || ci < 0 || ri >= xMax || ci >= yMax))
        .reduce(
          (acc, coords) => ({ ...acc, [coords.join(',')]: getValue(coords) }),
          {}
        )

      route.addNode(ri + ',' + ci, neighbors)
    })
  })

  return route
}

const createGrid = rows => rows.map(row => row.split('').map(Number))

const createMegaGrid = rows => {
  const ratio = 5
  const inc = col => (col === 9 ? 1 : col + 1)

  // Generate the entire first row of the mega grid. If the initial grid as 10
  // rows for instance, this generates a grid of 10 rows * 50 columns.
  const grid = Array.from({ length: rows.length }).reduce((acc, _, ri) => {
    const row = Array.from({ length: ratio - 1 }).reduce(
      (acc, _, index) => [...acc, acc[index].map(inc)],
      [rows[ri].split('').map(Number)]
    )

    return [...acc, row.flat()]
  }, [])

  // Generate the the missing rows from the mega grid now that all columns are
  // defined.
  return Array.from({ length: ratio - 1 })
    .reduce(
      (acc, _, index) => [...acc, acc[index].map(row => row.map(inc))],
      [grid]
    )
    .flat()
}

const getLowestRisk = grid =>
  createGraph(grid).path('0,0', `${grid.length - 1},${grid[0].length - 1}`, {
    cost: true,
  }).cost

module.exports = { createGrid, createMegaGrid, getLowestRisk }
