import $ from '../../helpers'
import type { Coords, Grid } from '../../types'

const getCost = (grid: Grid<number>, [ri, ci]: Coords) => {
  const riInc = Math.floor(ri / grid.height)
  const ciInc = Math.floor(ci / grid.width)

  return (
    ((grid.get([ri % grid.height, ci % grid.width]) + riInc + ciInc - 1) % 9) +
    1
  )
}

const getLowestCost = (grid: Grid<number>, mapSize = 1) => {
  const width = grid.width * mapSize - 1
  const height = grid.height * mapSize - 1
  const start: Coords = [0, 0]
  const end: Coords = [height, width]

  const withinBounds = ([ri, ci]: Coords) =>
    $.isClamped(ri, 0, height) && $.isClamped(ci, 0, width)
  const getNext = (coords: Coords) => $.bordering(coords).filter(withinBounds)

  const { costs } = $.search.aStar({
    start,
    getNext,
    getCost: (_, to) => getCost(grid, to),
    isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
    heuristic: next => $.manhattan(next, end),
  })

  return costs[$.toPoint(end)]
}

export const run = (input: string[], mapSize = 1) =>
  getLowestCost($.Grid.fromRows(input, Number), mapSize)
