import { Coords, Point } from '../types'
import toPoint from './toPoint'

type SearchFrontier<SearchNode> = [SearchNode, number][]
type SearchOptions<SearchNode> = {
  start: SearchNode
  getNeighbors: (curr: SearchNode) => SearchNode[]
  getCost?: (curr: SearchNode, next: SearchNode) => number
  heuristic?: (next: SearchNode) => number
  toKey?: (next: SearchNode) => string
  isDone?: (curr: SearchNode) => boolean
}

export type SearchCosts = Record<Point, number>
export type SearchGraph = Record<Point, Point>

export type SearchResult<SearchNode> = {
  end?: SearchNode
  from: SearchGraph
  costs: SearchCosts
}

const pathfinding = <SearchNode>({
  getNeighbors,
  getCost,
  start,
  heuristic,
  toKey = curr => toPoint(curr as Coords) as string,
  isDone = () => false,
}: SearchOptions<SearchNode>): SearchResult<SearchNode> => {
  const withPriority =
    typeof getCost === 'function' || typeof heuristic === 'function'
  const frontier: SearchFrontier<SearchNode> = [[start, 0]]
  const from: SearchGraph = { [toKey(start)]: null }
  const costs: SearchCosts = { [toKey(start)]: 0 }
  let end: SearchNode = null

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