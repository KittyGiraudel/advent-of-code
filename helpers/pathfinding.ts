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
export type SearchGraph = Record<string, string>
export type SearchOutput<T> = { from: SearchGraph; end: T }
export type SearchOptions<T> = {
  start: T
  getNextNodes: (curr: T) => T[]
  toKey?: (curr: T) => string
  isGoal?: (curr: T) => boolean
  emptyAfterGoal?: boolean
}

const isEmpty = <T>(frontier: Frontier<T>): boolean =>
  frontier instanceof PriorityQueue ? frontier.isEmpty() : frontier.length === 0

const pop = <T>(frontier: Frontier<T>) =>
  frontier instanceof PriorityQueue ? frontier.pop()[0] : frontier.pop()

const core = <T>(
  handler: (curr: T) => (next: T) => void,
  frontier: Frontier<T>,
  getNextNodes: SearchOptions<T>['getNextNodes'],
  isGoal: SearchOptions<T>['isGoal'] = DEFAULT_OPTIONS.isGoal,
  emptyAfterGoal: SearchOptions<T>['emptyAfterGoal'] = DEFAULT_OPTIONS.emptyAfterGoal
) => {
  let end = null

  while (!isEmpty(frontier)) {
    const curr = pop(frontier)

    if (isGoal(curr)) {
      end = curr
      if (emptyAfterGoal) continue
      else break
    }

    getNextNodes(curr).forEach(handler(curr))
  }

  return end
}

export const bfs = <T>({
  start,
  getNextNodes,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
  emptyAfterGoal = DEFAULT_OPTIONS.emptyAfterGoal,
}: SearchOptions<T>): SearchOutput<T> => {
  const frontier: T[] = [start]
  const from: SearchOutput<T>['from'] = { [toKey(start)]: null }

  const handler = (curr: T) => (next: T) => {
    if (!(toKey(next) in from)) {
      frontier.unshift(next)
      from[toKey(next)] = toKey(curr)
    }
  }

  const end: T = core(handler, frontier, getNextNodes, isGoal, emptyAfterGoal)

  return { end, from }
}

export const gbfs = <T>({
  start,
  getNextNodes,
  heuristic,
  isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
  emptyAfterGoal = DEFAULT_OPTIONS.emptyAfterGoal,
}: SearchOptions<T> & { heuristic: Heuristic<T> }): SearchOutput<T> => {
  const frontier = new PriorityQueue<[T, number]>((a, b) => a[1] - b[1])
  frontier.push([start, 0])
  const from: SearchGraph = { [toKey(start)]: null }

  const handler = (curr: T) => (next: T) => {
    if (!(toKey(next) in from)) {
      frontier.push([next, heuristic(next)])
      from[toKey(next)] = toKey(curr)
    }
  }

  const end: T = core(handler, frontier, getNextNodes, isGoal, emptyAfterGoal)

  return { from, end }
}

export const dijkstra = <T>({
  start,
  getNextNodes,
  getCost,
  isGoal = DEFAULT_OPTIONS.isGoal,
  toKey = DEFAULT_OPTIONS.toKey,
}: SearchOptions<T> & { getCost: GetCost<T> }): SearchOutput<T> & {
  costs: SearchCosts
} => {
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

  const end: T = core(handler, frontier, getNextNodes, isGoal)

  return { from, costs, end }
}

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
}): SearchOutput<T> & { costs: SearchCosts } => {
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

  const end: T = core(handler, frontier, getNextNodes, isGoal)

  return { from, costs, end }
}

const reconstruct = (graph: SearchGraph, start: unknown, end: unknown) => {
  let path = []
  let current = typeof end === 'string' ? end : String(end)
  start = typeof start === 'string' ? start : String(start)

  while (current !== start) {
    path.push(current)
    current = graph[current]
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
