import { PriorityQueue } from '@datastructures-js/priority-queue'

const DEFAULT_OPTIONS = {
  isGoal: () => false,
  toKey: String,
  emptyAfterGoal: false,
}

type Heuristic<T> = (curr: T) => number
type GetCost<T> = (curr: T, next: T) => number
type Frontier<T> = PriorityQueue<[T, number]> | T[]
type GetPath<T> = (start?: T, end?: T) => string[]

export type SearchCosts = Record<string, number>
export type SearchGraph = Record<string, string | null>
export type SearchOutput<T> = {
  graph: SearchGraph
  end: T | null
  getPath: GetPath<T>
}
export type SearchOutputWithCosts<T> = SearchOutput<T> & { costs: SearchCosts }
export type SearchOptions<T> = {
  start: T
  getNext: (curr: T) => T[]
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
  getNext: SearchOptions<T>['getNext'],
  isGoal: SearchOptions<T>['isGoal'] = DEFAULT_OPTIONS.isGoal,
  emptyAfterGoal: SearchOptions<T>['emptyAfterGoal'] = DEFAULT_OPTIONS.emptyAfterGoal
) => {
  let end: T | null = null

  while (!isEmpty(frontier)) {
    const curr = pop(frontier)
    if (!curr) break

    if (isGoal(curr)) {
      end = curr
      if (emptyAfterGoal) continue
      else break
    }

    getNext(curr).forEach(handler(curr))
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
  getNext,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
  emptyAfterGoal = DEFAULT_OPTIONS.emptyAfterGoal,
}: SearchOptions<T>): SearchOutput<T> => {
  const frontier: T[] = [start]
  const graph: SearchOutput<T>['graph'] = { [toKey(start)]: null }

  const handler = (curr: T) => (next: T) => {
    if (!(toKey(next) in graph)) {
      frontier.unshift(next)
      graph[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNext, isGoal, emptyAfterGoal)

  return {
    end,
    graph,
    getPath: (a?: T, b?: T) =>
      getPath(graph, toKey(a ?? start), b ? toKey(b) : end ? toKey(end) : null),
  }
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
  getNext,
  heuristic,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
  emptyAfterGoal = DEFAULT_OPTIONS.emptyAfterGoal,
}: SearchOptions<T> & { heuristic: Heuristic<T> }): SearchOutput<T> => {
  const frontier = new PriorityQueue<[T, number]>((a, b) => a[1] - b[1])
  frontier.push([start, 0])
  const graph: SearchGraph = { [toKey(start)]: null }

  const handler = (curr: T) => (next: T) => {
    if (!(toKey(next) in graph)) {
      frontier.push([next, heuristic(next)])
      graph[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNext, isGoal, emptyAfterGoal)

  return {
    graph,
    end,
    getPath: (a?: T, b?: T) =>
      getPath(graph, toKey(a ?? start), b ? toKey(b) : end ? toKey(end) : null),
  }
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
  getNext,
  getCost,
  isGoal = DEFAULT_OPTIONS.isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
}: SearchOptions<T> & { getCost: GetCost<T> }): SearchOutputWithCosts<T> => {
  const frontier = new PriorityQueue<[T, number]>((a, b) => a[1] - b[1])
  frontier.push([start, 0])
  const graph: SearchGraph = { [toKey(start)]: null }
  const costs: SearchCosts = { [toKey(start)]: 0 }

  const handler = (curr: T) => (next: T) => {
    const currKey = toKey(curr)
    const nextKey = toKey(next)
    const newCost = costs[currKey] + getCost(curr, next)

    if (!(nextKey in costs) || newCost < costs[nextKey]) {
      frontier.push([next, newCost])
      costs[toKey(next)] = newCost
      graph[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNext, isGoal)

  return {
    graph,
    costs,
    end,
    getPath: (a?: T, b?: T) =>
      getPath(graph, toKey(a ?? start), b ? toKey(b) : end ? toKey(end) : null),
  }
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
  getNext,
  getCost,
  heuristic,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
}: SearchOptions<T> & {
  getCost: GetCost<T>
  heuristic: Heuristic<T>
}): SearchOutputWithCosts<T> => {
  const frontier = new PriorityQueue<[T, number]>((a, b) => a[1] - b[1])
  frontier.push([start, 0])
  const graph: SearchGraph = { [toKey(start)]: null }
  const costs: SearchCosts = { [toKey(start)]: 0 }

  const handler = (curr: T) => (next: T) => {
    const currKey = toKey(curr)
    const nextKey = toKey(next)
    const newCost = costs[currKey] + getCost(curr, next)

    if (!(nextKey in costs) || newCost < costs[nextKey]) {
      frontier.push([next, newCost + heuristic(next)])
      costs[toKey(next)] = newCost
      graph[toKey(next)] = toKey(curr)
    }
  }

  const end = _core(handler, frontier, getNext, isGoal)

  return {
    graph,
    costs,
    end,
    getPath: (a?: T, b?: T) =>
      getPath(graph, toKey(a ?? start), b ? toKey(b) : end ? toKey(end) : null),
  }
}

const getPath = (graph: SearchGraph, start: string, end: string | null) => {
  const path: string[] = []
  let current = end

  if (!end) {
    throw new Error('Cannot reconstruct path as no end node was provided.')
  }

  while (current && current !== start) {
    path.push(current)
    current = current ? graph[current] : null
  }

  return path
}

export default {
  bfs,
  gbfs,
  dijkstra,
  aStar,
}
