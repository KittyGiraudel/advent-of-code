import $ from '../../helpers'
import { Coords, Grid } from '../../types'

const getCost = (grid: Grid<number>, [ri, ci]: Coords) => {
  const width = grid[0].length
  const height = grid.length
  const riInc = Math.floor(ri / height)
  const ciInc = Math.floor(ci / width)

  return ((grid[ri % height][ci % width] + riInc + ciInc - 1) % 9) + 1
}

const getLowestCost = (grid: Grid<number>, mapSize = 1) => {
  const width = grid[0].length * mapSize - 1
  const height = grid.length * mapSize - 1
  const start: Coords = [0, 0]
  const end: Coords = [height, width]

  const withinBounds = ([ri, ci]: Coords) =>
    $.isClamped(ri, 0, height) && $.isClamped(ci, 0, width)
  const getNextNodes = (coords: Coords) =>
    $.bordering(coords, 'COORDS').filter(withinBounds)

  const { costs } = $.pathfinding.aStar({
    start,
    getNextNodes,
    getCost: (_, to) => getCost(grid, to),
    isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
    heuristic: next => $.manhattan(next, end),
  })

  return costs[$.toPoint(end)]
}

export const getLowestRisk = (input: string[], mapSize: number = 1) =>
  getLowestCost($.grid.from(input, Number), mapSize)
