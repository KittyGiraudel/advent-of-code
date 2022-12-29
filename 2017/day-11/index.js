import $ from '../../helpers'

const VECTORS = {
  n: [0, -2],
  ne: [+1, -1],
  se: [+1, +1],
  s: [0, +2],
  sw: [-1, +1],
  nw: [-1, -1],
}

// See: https://www.redblobgames.com/grids/hexagons/#distances
const distance = $.memo(([xA, yA], [xB, yB]) => {
  const dX = Math.abs(xA - xB)
  const dY = Math.abs(yA - yB)

  return dX + Math.max(0, (dY - dX) / 2)
})

const getNeighbors = curr =>
  Object.values(VECTORS).map(vector => $.applyVector(curr, vector))

const createGraph = (start, end) =>
  $.pathfinding.search({
    start,
    getNeighbors,
    // Because we need to be able to visit the same points several times, the
    // cost needs to be lower than 1 — otherwise it means we cannot visit the
    // same cell twice.
    getCost: () => 0,
    isDone: curr => curr[0] === end[0] && curr[1] === end[1],
    heuristic: next => distance(next, end),
  }).from

const walk = steps =>
  steps.reduce(
    (acc, step) => {
      acc.position = $.applyVector(acc.position, VECTORS[step])
      acc.visited.add($.toPoint(acc.position))
      return acc
    },
    { position: [0, 0], visited: new Set(['0,0']) }
  )

const getPathLength = (start, end) =>
  $.pathfinding.path(createGraph(start, end), start, end).length

export const run = instructions => {
  const { position: end, visited } = walk(instructions)
  const start = [0, 0]
  const furthest = Array.from(visited)
    .map($.toCoords)
    .sort((a, b) => distance(a, start) - distance(b, start))
    .pop()

  return [
    // Find the minimum amount of steps to reach the destination.
    getPathLength(start, end),
    // Find the maximum amount of steps ever reached.
    getPathLength(start, furthest),
  ]
}
