import { PriorityQueue } from '@datastructures-js/priority-queue'

const DEFAULT_OPTIONS = {
  isGoal: () => false,
  toKey: String,
  emptyAfterGoal: false,
}

type Heuristic<T> = (curr: T) => number
type GetCost<T> = (curr: T, next: T) => number
type Frontier<T> = PriorityQueue<[T, number]> | T[]

export type SearchCosts = Record<string, number>
export type SearchGraph = Record<string, string | null>
export type SearchOutput<T> = { from: SearchGraph; end: T }
export type SearchOptions<T> = {
  start: T
  getNextNodes: (curr: T) => T[]
  toKey?: (curr: T) => string
  isGoal?: (curr: T) => boolean
  emptyAfterGoal?: boolean
}

const isEmpty = <T>(frontier: Frontier<T>) =>
  frontier instanceof PriorityQueue ? frontier.isEmpty() : frontier.length === 0

const pop = <T>(frontier: Frontier<T>) =>
  frontier instanceof PriorityQueue ? frontier.pop()[0] : frontier.pop()

const _core = <T>(
  handler: (curr: T) => (next: T) => void,
  frontier: Frontier<T>,
  getNextNodes: SearchOptions<T>['getNextNodes'],
  isGoal: SearchOptions<T>['isGoal'] = DEFAULT_OPTIONS.isGoal,
  emptyAfterGoal: SearchOptions<T>['emptyAfterGoal'] = DEFAULT_OPTIONS.emptyAfterGoal
) => {
  let end = null

  while (!isEmpty(frontier)) {
    const curr = pop(frontier)!

    if (isGoal(curr)) {
      end = curr
      if (emptyAfterGoal) continue
      else break
    }

    getNextNodes(curr).forEach(handler(curr))
  }

  return end
}

/**
 * Breadth First Search (BFS for short) explores equally in all directions. It
 * is suited when all moves cost the same (i.e. “unweighted edges”) — otherwise
 * prefer Dijkstra. If there is only one source and one destination, prefer GBFS
 * if all moves cost the same, or A* otherwise.
 *
 * Potential cases for BFS:
 * - Mark all reachable nodes in a graph.
 * - Find paths from one node to all other nodes, or from all nodes to one node.
 * - Measure distances from one node to all other nodes.
 *
 * Ref: https://www.redblobgames.com/pathfinding/a-star/introduction.html#breadth-first-search
 * Ref: https://www.redblobgames.com/pathfinding/tower-defense/
 */
export const bfs = <T>({
  start,
  getNextNodes,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
  emptyAfterGoal = DEFAULT_OPTIONS.emptyAfterGoal,
}: SearchOptions<T>) => {
  const frontier: T[] = [start]
  const from: SearchOutput<T>['from'] = { [toKey(start)]: null }

  const handler = (curr: T) => (next: T) => {
    if (!(toKey(next) in from)) {
      frontier.unshift(next)
      from[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNextNodes, isGoal, emptyAfterGoal)

  return { end, from } as SearchOutput<T>
}

/**
 * Greedy Breadth First Search (GBFS for short) is good when there is *one*
 * source and *one* destination. This is why it can make use of a “heuristic”.
 * If the destination is unknown, prefer BFS. Note that GBFS does not guarantee
 * the shortest path: it’s a performance improvement, not an accuracy one.
 *
 * Ref: https://www.redblobgames.com/pathfinding/a-star/introduction.html#greedy-best-first
 */
export const gbfs = <T>({
  start,
  getNextNodes,
  heuristic,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
  emptyAfterGoal = DEFAULT_OPTIONS.emptyAfterGoal,
}: SearchOptions<T> & { heuristic: Heuristic<T> }) => {
  const frontier = new PriorityQueue<[T, number]>((a, b) => a[1] - b[1])
  frontier.push([start, 0])
  const from: SearchGraph = { [toKey(start)]: null }

  const handler = (curr: T) => (next: T) => {
    if (!(toKey(next) in from)) {
      frontier.push([next, heuristic(next)])
      from[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNextNodes, isGoal, emptyAfterGoal)

  return { from, end } as SearchOutput<T>
}

/**
 * Dijkstra is a variant of BFS that prioritizes paths to explore. Instead of
 * exploring all possible paths equally, it favors lower cost paths. When
 * movement costs vary, we use this instead of BFS. It makes use of a cost
 * function to determine the frontier priority. If it needs to support negative
 * weights, prefer Bellman-Ford (not implemented here).
 *
 * Ref: https://www.redblobgames.com/pathfinding/a-star/introduction.html#dijkstra
 */
export const dijkstra = <T>({
  start,
  getNextNodes,
  getCost,
  isGoal = DEFAULT_OPTIONS.isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
}: SearchOptions<T> & { getCost: GetCost<T> }) => {
  const frontier = new PriorityQueue<[T, number]>((a, b) => a[1] - b[1])
  frontier.push([start, 0])
  const from: SearchGraph = { [toKey(start)]: null }
  const costs: SearchCosts = { [toKey(start)]: 0 }

  const handler = (curr: T) => (next: T) => {
    const currKey = toKey(curr)
    const nextKey = toKey(next)
    const newCost = costs[currKey] + getCost(curr, next)

    if (!(nextKey in costs) || newCost < costs[nextKey]) {
      frontier.push([next, newCost])
      costs[toKey(next)] = newCost
      from[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNextNodes, isGoal)

  return { from, costs, end } as SearchOutput<T> & { costs: SearchCosts }
}

/**
 * A* is a variant of Dijkstra that is optimized for a single destination.
 * Dijkstra can find paths to all locations; A* finds paths to one location, or
 * the closest of several locations. It prioritizes paths that seem to be
 * leading closer to a goal. In a way, it’s a combination of Dijkstra (costs)
 * and GBFS (heuristic).
 *
 * Ref: https://www.redblobgames.com/pathfinding/a-star/introduction.html#astar
 */
export const aStar = <T>({
  start,
  getNextNodes,
  getCost,
  heuristic,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
}: SearchOptions<T> & {
  getCost: GetCost<T>
  heuristic: Heuristic<T>
}) => {
  const frontier = new PriorityQueue<[T, number]>((a, b) => a[1] - b[1])
  frontier.push([start, 0])
  const from: SearchGraph = { [toKey(start)]: null }
  const costs: SearchCosts = { [toKey(start)]: 0 }

  const handler = (curr: T) => (next: T) => {
    const currKey = toKey(curr)
    const nextKey = toKey(next)
    const newCost = costs[currKey] + getCost(curr, next)

    if (!(nextKey in costs) || newCost < costs[nextKey]) {
      frontier.push([next, newCost + heuristic(next)])
      costs[toKey(next)] = newCost
      from[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNextNodes, isGoal)

  return { from, costs, end } as SearchOutput<T> & { costs: SearchCosts }
}

const reconstruct = (graph: SearchGraph, start: unknown, end: unknown) => {
  let path = []
  let current: string | null = typeof end === 'string' ? end : String(end)
  start = typeof start === 'string' ? start : String(start)

  while (current !== start) {
    path.push(current)
    current = current ? graph[current] : current
  }

  return path
}

export default {
  bfs,
  gbfs,
  dijkstra,
  aStar,
  path: reconstruct,
}
