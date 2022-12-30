import { Coords, Point } from '../types'
import toPoint from './toPoint'

type SearchOptions<Node> = {
  start: Node
  getNeighbors: (curr: Node) => Node[]
  getCost?: (curr: Node, next: Node) => number
  heuristic?: (next: Node) => number
  toKey?: (next: Node) => string
  isDone?: (curr: Node) => boolean
}

export type SearchCosts = { [point: Point]: number }
export type SearchGraph = { [point: Point]: Point }

export type SearchResult<Node> = {
  end?: Node
  from: SearchGraph
  costs: SearchCosts
}

const pathfinding = <Node>({
  getNeighbors,
  getCost,
  start,
  heuristic,
  toKey = curr => toPoint(curr as Coords) as string,
  isDone = () => false,
}: SearchOptions<Node>): SearchResult<Node> => {
  const withPriority =
    typeof getCost === 'function' || typeof heuristic === 'function'
  const frontier: [unknown, number][] = [[start, 0]]
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
      const newCost = costs[currKey] + (getCost?.(curr, next) ?? 1)
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

const reconstruct = (
  graph: SearchGraph,
  start: Coords | Point,
  end: Coords | Point
) => {
  let path = []
  let current = typeof end === 'string' ? end : toPoint(end)
  start = typeof start === 'string' ? start : toPoint(start)

  while (current !== start) {
    path.push(current)
    current = graph[current]
  }

  return path
}

export default { search: pathfinding, path: reconstruct }
