import $ from '../../helpers'
import { Coords, Point } from '../../types'

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

const getNextNodes = (curr: Coords) =>
  Object.values(VECTORS).map(vector => $.applyVector(curr, vector))

const createGraph = (start: Coords, end: Coords) =>
  $.pathfinding.gbfs({
    start,
    getNextNodes,
    isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
    heuristic: next => distance(next, end),
  }).from

const walk = (steps: Array<string>) =>
  steps.reduce(
    (acc, step) => {
      acc.position = $.applyVector(acc.position, VECTORS[step])
      acc.visited.add($.toPoint(acc.position))
      return acc
    },
    { position: [0, 0] as Coords, visited: new Set(['0,0']) as Set<Point> }
  )

const getPathLength = (start: Coords, end: Coords) =>
  $.pathfinding.path(createGraph(start, end), start, end).length

export const run = (instructions: Array<string>): [number, number] => {
  const { position: end, visited } = walk(instructions)
  const start: Coords = [0, 0]
  const furthest = Array.from(visited)
    .map($.toCoords)
    .sort((a, b) => distance(a, start) - distance(b, start))
    .pop()!

  return [
    // Find the minimum amount of steps to reach the destination.
    getPathLength(start, end),
    // Find the maximum amount of steps ever reached.
    getPathLength(start, furthest),
  ]
}
