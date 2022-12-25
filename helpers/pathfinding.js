const toPoint = require('./toPoint')

const pathfinding = ({
  getNeighbors,
  getCost,
  start,
  heuristic,
  toKey = toPoint,
  isDone = curr => false,
} = {}) => {
  const withPriority =
    typeof getCost === 'function' || typeof heuristic === 'function'
  const frontier = [[start, 0]]
  const from = { [toKey(start)]: null }
  const costs = { [toKey(start)]: 0 }
  let end = null

  while (frontier.length) {
    if (withPriority) frontier.sort(([, aP], [, bP]) => bP - aP)

    const [curr] = frontier.pop()
    const currKey = toKey(curr)

    if (isDone(curr)) {
      end = curr
      break
    }

    getNeighbors(curr).forEach(next => {
      const nextKey = toKey(next)
      const newCost = costs[currKey] + (getCost?.(curr, next) ?? 0)
      const shouldVisit = !(nextKey in costs) || newCost < costs[nextKey]

      if (shouldVisit) {
        const distance = heuristic ? heuristic(next) : 0

        frontier.unshift([next, newCost + distance])
        from[nextKey] = currKey
        costs[nextKey] = newCost
      }
    })
  }

  return { from, costs, end }
}

const reconstruct = (graph, start, end) => {
  let path = []
  let current = typeof end === 'string' ? end : toPoint(end)
  start = typeof start === 'string' ? start : toPoint(start)

  while (current !== start) {
    path.push(current)
    current = graph[current]
  }

  return path
}

module.exports = { search: pathfinding, path: reconstruct }
