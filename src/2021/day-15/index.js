const { Graph, astar } = require('javascript-astar')
const $ = require('../../helpers')

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

const getLowestRisk = grid => {
  const graph = new Graph(grid)
  const height = graph.grid.length - 1
  const width = graph.grid[0].length - 1
  const start = graph.grid[0][0]
  const end = graph.grid[height][width]

  return $.sum(astar.search(graph, start, end).map(node => node.weight))
}

module.exports = { createMegaGrid, getLowestRisk }
