const $ = require('../../helpers')

const getCost = (grid, coords) => {
  const width = grid[0].length
  const height = grid.length
  const [y, x] = coords
  const yInc = Math.floor(y / height)
  const xInc = Math.floor(x / width)

  return ((grid[y % height][x % width] + yInc + xInc - 1) % 9) + 1
}

const getLowestCost = (grid, mapSize = 1) => {
  const maxWidth = grid[0].length * mapSize - 1
  const maxHeight = grid.length * mapSize - 1
  const start = '0,0'
  const end = $.toPoint([maxHeight, maxWidth])
  const frontier = new $.PriorityQueue()
  const costs = { [start]: 0 }

  // Push the starting point into the queue.
  frontier.push([{ point: start, coords: $.toCoords(start) }, 0])

  const isWithinBounds = ({ coords: [ri, ci] }) =>
    $.isClamped(ri, 0, maxHeight) && $.isClamped(ci, 0, maxWidth)

  while (frontier.length) {
    const [curr] = frontier.pop()

    if (curr.point === end) break

    const neighbors = $.bordering(curr.coords).filter(isWithinBounds)

    for (let next of neighbors) {
      const cost = getCost(grid, next.coords)
      const newCost = costs[curr.point] + cost

      // If the node hasn’t been visited yet, or if the new path is cheaper
      // than the previously recorded one, visit the node.
      if (!(next.point in costs) || newCost < costs[next.point]) {
        // It feels marginally faster without the Manhattan heuristic.
        // const distance = $.manhattan(end.coords, next.coords)
        frontier.push([next, newCost /* + distance */])
        costs[next.point] = newCost
      }
    }
  }

  return costs[end]
}

const getLowestRisk = (input, mapSize = 1) =>
  getLowestCost($.grid.create(input, Number), mapSize)

module.exports = { getLowestRisk }
