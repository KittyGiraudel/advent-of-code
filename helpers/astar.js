const PriorityQueue = require('./PriorityQueue')

// A rather simple A* implementation with limited customization options.
// @param {Object} start - An object representing the starting node
// @param {Object} [end] - An object representing the ending node
// @param {Function} getNext - A function that returns adjacent nodes
// @param {Object} [options] - Additional customization options
// @param {Object} [options.heuristic] - A heuristic, switching to a queue
// @param {Object} [options.skipVisited] - Whether to only visit nodes once
// @param {Object} [options.endCheck] - A check to stop if we’ve found the end node
// @return {Object} An object mapping points with their reference point, which
//                  can be walked with $.astar.path().
const getGraph = (
  start,
  end,
  getNext,
  {
    heuristic = null,
    skipVisited = false,
    endCheck = (curr, end) => curr.point === end.point,
  } = {}
) => {
  // If we are given a heuristic function, we switch from a simple array to a
  // proper priority queue as we have a way to optimize the walk.
  const frontier = heuristic ? new PriorityQueue([start, 0]) : [start]
  const from = { [start.point]: null }

  while (frontier.length) {
    let curr = frontier.pop()

    // When dealing with a queue, every item is stored as a tuple with the value
    // first, and the priority level second.
    if (heuristic) curr = curr[0]

    // Check whether we have reached the end. Implementations that want to walk
    // the entire grid instead of ending early can return a falsy value.
    if (endCheck(curr, end)) break

    const nodes = getNext(curr, from)
      // If we are given the `skipVisited` option, we should discard the next
      // nodes we have already visited.
      .filter(next => !skipVisited || !(next.point in from))

    nodes.forEach(next => {
      from[next.point] = curr.point

      if (heuristic) {
        frontier.push([next, heuristic(end, next, curr)])
      } else frontier.unshift(next)
    })
  }

  return from
}

// Return the path between two points as an array of points
// @param {Object} graph - Graph as returned by `getGraph`
// @param {String} start - Starting point as a string
// @param {String} end - Ending point as a string
// @param {String[]} Array of points forming the path between start and end
const getPath = (graph, start, end) => {
  let path = []
  let current = end

  while (current !== start) {
    path.push(current)
    current = graph[current]
  }

  return path
}

module.exports = {
  graph: getGraph,
  path: getPath,
}
