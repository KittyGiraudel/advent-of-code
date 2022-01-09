const Graph = require('node-dijkstra')
const $ = require('../../helpers')

const createGraph = grid => {
  const xMax = grid[0].length - 1
  const yMax = grid.length - 1
  const getValue = ([ri, ci]) => grid[ri][ci]
  const isWithinBounds = ([ri, ci]) =>
    $.isClamped(ri, 0, xMax) && $.isClamped(ci, 0, yMax)
  const route = new Graph()

  $.grid.forEach(grid, (_, ri, ci) => {
    const neighbors = $.neighbors
      .bordering(ri, ci)
      .filter(isWithinBounds)
      .reduce(
        (acc, coords) => ({ ...acc, [coords.join(',')]: getValue(coords) }),
        {}
      )

    route.addNode(ri + ',' + ci, neighbors)
  })

  return route
}

const createMegaGrid = rows => {
  const ratio = 5
  const inc = col => (col === 9 ? 1 : col + 1)

  // Generate the entire first row of the mega grid. If the initial grid as 10
  // rows for instance, this generates a grid of 10 rows * 50 columns.
  const grid = $.array(rows.length).reduce((acc, _, ri) => {
    const row = $.array(ratio - 1).reduce(
      (acc, _, index) => [...acc, acc[index].map(inc)],
      [rows[ri].split('').map(Number)]
    )

    return [...acc, row.flat()]
  }, [])

  // Generate the the missing rows from the mega grid now that all columns are
  // defined.
  return $.array(ratio - 1)
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

module.exports = { createMegaGrid, getLowestRisk }
