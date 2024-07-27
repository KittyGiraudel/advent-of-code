import $ from '../../helpers'
import type { Coords, Point } from '../../types'

const VECTORS: Record<string, Coords> = {
  n: [0, -2],
  ne: [+1, -1],
  se: [+1, +1],
  s: [0, +2],
  sw: [-1, +1],
  nw: [-1, -1],
}

// See: https://www.redblobgames.com/grids/hexagons/#distances
const distance = $.memo(([xA, yA]: Coords, [xB, yB]: Coords) => {
  const dX = Math.abs(xA - xB)
  const dY = Math.abs(yA - yB)

  return dX + Math.max(0, (dY - dX) / 2)
})

const getNext = (curr: Coords) =>
  Object.values(VECTORS).map(vector => $.applyVector(curr, vector))

const walk = (steps: string[]) =>
  steps.reduce<{ position: Coords; visited: Set<Point> }>(
    (acc, step) => {
      acc.position = $.applyVector(acc.position, VECTORS[step])
      acc.visited.add($.toPoint(acc.position))
      return acc
    },
    { position: [0, 0], visited: new Set<Point>(['0,0']) }
  )

const search = (start: Coords, end: Coords) =>
  $.search.gbfs({
    start,
    getNext,
    isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
    heuristic: next => distance(next, end),
  })

export const run = (instructions: string[], part2 = false) => {
  const { position: end, visited } = walk(instructions)
  const start: Coords = [0, 0]
  const furthest = Array.from(visited)
    .map($.toCoords)
    .sort((a, b) => distance(b, start) - distance(a, start))[0]

  return search(start, part2 ? furthest : end).getPath().length
}
