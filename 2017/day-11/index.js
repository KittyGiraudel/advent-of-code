const $ = require('../../helpers')

const VECTORS = {
  n: [0, -2],
  ne: [+1, -1],
  se: [+1, +1],
  s: [0, +2],
  sw: [-1, +1],
  nw: [-1, -1],
}

// See: https://www.redblobgames.com/grids/hexagons/#distances
const distance = $.memo((pA, pB) => {
  const [xA, yA] = pA.coords || $.toCoords(pA)
  const [xB, yB] = pB.coords || $.toCoords(pB)
  const dX = Math.abs(xA - xB)
  const dY = Math.abs(yA - yB)

  return dX + Math.max(0, (dY - dX) / 2)
})

const getNeighbors = curr =>
  Object.values(VECTORS)
    .map(vector => $.applyVector(curr.coords, vector))
    .map(coords => ({ coords, point: $.toPoint(coords) }))

const createGraph = (start, end) =>
  $.astar.graph(
    { point: start, coords: $.toCoords(start) },
    { point: end, coords: $.toCoords(end) },
    getNeighbors,
    { skipVisited: true, heuristic: distance }
  )

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
  $.astar.path(createGraph(start, end), start, end).length

const run = instructions => {
  const { position, visited } = walk(instructions)
  const start = '0,0'
  const end = $.toPoint(position)
  const furthest = Array.from(visited)
    .sort((a, b) => distance(a, start) - distance(b, start))
    .pop()

  return [
    // Find the minimum amount of steps to reach the destination.
    getPathLength(start, end),
    // Find the maximum amount of steps ever reached.
    getPathLength(start, furthest),
  ]
}

module.exports = { run }
