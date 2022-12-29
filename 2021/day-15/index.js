import $ from '../../helpers'

const getCost = (grid, [ri, ci]) => {
  const width = grid[0].length
  const height = grid.length
  const riInc = Math.floor(ri / height)
  const ciInc = Math.floor(ci / width)

  return ((grid[ri % height][ci % width] + riInc + ciInc - 1) % 9) + 1
}

const getLowestCost = (grid, mapSize = 1) => {
  const width = grid[0].length * mapSize - 1
  const height = grid.length * mapSize - 1
  const start = [0, 0]
  const end = [height, width]

  const withinBounds = ([ri, ci]) =>
    $.isClamped(ri, 0, height) && $.isClamped(ci, 0, width)
  const getNeighbors = coords =>
    $.bordering(coords, 'COORDS').filter(withinBounds)

  const { costs } = $.pathfinding.search({
    start,
    getNeighbors,
    getCost: (from, to) => getCost(grid, to),
    isDone: ([ri, ci]) => ri === end[0] && ci === end[1],
    heuristic: next => $.manhattan(next, end),
  })

  return costs[end]
}

export const getLowestRisk = (input, mapSize = 1) =>
  getLowestCost($.grid.create(input, Number), mapSize)
