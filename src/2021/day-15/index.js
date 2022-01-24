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

const getPath = (grid, start, end) => {
  const graph = createGraph(grid, start, end)
  const path = []
  let current = end

  while (current.point != start.point) {
    path.push(current.coords)
    current = graph[current.point]
  }

  return path
}

const createGraph = (grid, start, end) => {
  const frontier = new $.PriorityQueue([start, 0])
  const from = { [start.point]: null }
  const costs = { [start.point]: 0 }

  while (frontier.length) {
    const [curr] = frontier.pop()

    if (curr.point === end.point) break

    $.bordering(curr.coords)
      .filter(({ coords }) => typeof $.access(grid, coords) === 'number')
      .forEach(next => {
        const newCost = costs[curr.point] + $.access(grid, next.coords)

        // If the node hasn’t been visited yet, or if the new path is cheaper
        // than the previously recorded one, visit the node.
        if (!(next.point in costs) || newCost < costs[next.point]) {
          const priority = newCost + $.manhattan(end.coords, next.coords)
          costs[next.point] = newCost
          from[next.point] = curr
          frontier.push([next, priority])
        }
      })
  }

  return from
}

const getLowestRisk = grid => {
  const height = grid.length - 1
  const width = grid[0].length - 1
  const start = { point: '0,0', coords: [0, 0] }
  const end = { point: height + ',' + width, coords: [height, width] }
  const path = getPath(grid, start, end)

  return $.sum(path.map(coords => $.access(grid, coords)))
}

module.exports = { createMegaGrid, getLowestRisk }
