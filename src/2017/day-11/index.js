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
  const [xA, yA] = $.toCoords(pA)
  const [xB, yB] = $.toCoords(pB)
  const dX = Math.abs(xA - xB)
  const dY = Math.abs(yA - yB)

  return dX + Math.max(0, (dY - dX) / 2)
})

const getNeighbors = $.memo(point =>
  Object.values(VECTORS)
    .map(vector => $.applyVector($.toCoords(point), vector))
    .map($.toPoint)
)

const getPath = (start, end) => {
  const graph = createGraph(start, end)
  const path = []
  let current = end

  while (current != start) {
    path.push(current)
    current = graph[current]
  }

  return path
}

const createGraph = (start, end) => {
  // The use of a priority queue over a regular array is really only to speed up
  // the whole thing with a distance, otherwise it’s excrutiatingly slow.
  const frontier = new $.PriorityQueue([start, 0])
  const from = { [start]: null }

  while (frontier.length) {
    const [curr] = frontier.pop()
    if (curr === end) break

    getNeighbors(curr)
      .filter(next => !(next in from))
      .forEach(next => {
        // In theory, we could just unshift (push left) the next item in the
        // queue, but we can optimize performance by computing the distance
        // between the next item and the goal, so that we visit nodes in order
        // of closest to furthest.
        frontier.push([next, distance(end, next)])
        from[next] = curr
      })
  }

  return from
}

const walk = steps =>
  steps.reduce(
    (acc, step) => {
      acc.position = $.applyVector(acc.position, VECTORS[step])
      acc.visited.add($.toPoint(acc.position))
      return acc
    },
    { position: [0, 0], visited: new Set(['0,0']) }
  )

const run = instructions => {
  const { position, visited } = walk(instructions)
  const start = '0,0'
  const end = $.toPoint(position)
  const furthest = Array.from(visited)
    .sort((a, b) => distance(a, start) - distance(b, start))
    .pop()

  return [
    // Find the minimum amount of steps to reach the destination.
    getPath(start, end).length,
    // Find the maximum amount of steps ever reached.
    getPath(start, furthest).length,
  ]
}

module.exports = { run }
