import $ from '../../helpers'
import { Coords, Point } from '../../types'

type State = { keys: string; positions: string; steps: number }
type Distance = { distance: number; locks: string[] }
type Distances = Record<string, Record<string, Distance>>

const KEY_RE = /[a-z]/
const DOOR_RE = /[A-Z]/

const toKey = (curr: State) => curr.positions + ':' + curr.keys

export const run = (input: string[], part2: boolean = false) => {
  const startPositions: Point[] = []
  const start: State = {
    keys: '',
    positions: part2 ? '0123' : '0',
    steps: 0,
  }
  const keys: Record<Point, string> = {}
  const doors: Record<Point, string> = {}
  const lookup = new Set<Point>()
  const grid = $.Grid.fromRows<string>(input)

  grid.forEach((value, ...coords) => {
    const point = $.toPoint(coords)
    if (value === '@') startPositions.push(point)
    if (KEY_RE.test(value)) keys[point] = value
    if (DOOR_RE.test(value)) doors[point] = value
    if (value !== '#') lookup.add(point)
  })

  if (part2) {
    const start = startPositions.pop()!
    const [sRi, sCi] = $.toCoords(start)
    lookup.delete(start)
    lookup.delete($.toPoint([sRi, sCi + 1] as Coords))
    lookup.delete($.toPoint([sRi, sCi - 1] as Coords))
    lookup.delete($.toPoint([sRi + 1, sCi] as Coords))
    lookup.delete($.toPoint([sRi - 1, sCi] as Coords))
    startPositions.push($.toPoint([sRi - 1, sCi - 1] as Coords))
    startPositions.push($.toPoint([sRi - 1, sCi + 1] as Coords))
    startPositions.push($.toPoint([sRi + 1, sCi + 1] as Coords))
    startPositions.push($.toPoint([sRi + 1, sCi - 1] as Coords))
  }

  const distances: Distances = {}
  const keyPoints = Object.keys(keys) as Point[]
  const keyCount = keyPoints.length
  const combinations = $.combinations([...keyPoints, ...startPositions], 2)

  combinations.forEach(([a, b]) => {
    const { from, end } = $.pathfinding.gbfs<Point>({
      start: a,
      heuristic: curr => $.manhattan($.toCoords(curr), $.toCoords(b)),
      isGoal: curr => curr === b,
      getNextNodes: curr =>
        $.bordering($.toCoords(curr), 'POINTS').filter(point =>
          lookup.has(point)
        ),
    })
    if (!end) return
    const path = $.pathfinding.path(from, a, b) as Point[]
    const locks = path.filter(p => p in doors).map(p => doors[p].toLowerCase())
    const keyA = keys[a] ?? String(startPositions.indexOf(a))
    const keyB = keys[b] ?? String(startPositions.indexOf(b))
    if (!(keyA in distances)) distances[keyA] = {}
    if (!(keyB in distances)) distances[keyB] = {}
    distances[keyA][keyB] = { distance: path.length, locks }
    distances[keyB][keyA] = { distance: path.length, locks }
  })

  const getNextNodes = (curr: State) => {
    const nodes: State[] = []

    for (let i = 0; i < curr.positions.length; i++) {
      const position = curr.positions[i]
      const dict = distances[position]
      const nextKeys = Object.keys(dict).filter(
        nextKey =>
          !/\d/.test(nextKey) &&
          !curr.keys.includes(nextKey) &&
          dict[nextKey].locks.every(lock => curr.keys.includes(lock))
      )

      nodes.push(
        ...nextKeys.map(nextKey => ({
          positions: $.updateAtIndex(curr.positions, i, nextKey),
          keys: curr.keys + nextKey,
          steps: curr.steps + dict[nextKey].distance,
        }))
      )
    }

    return nodes
  }

  const getCost = (curr: State, next: State) => {
    let index = 0
    for (let i = 0; i < curr.positions.length; i++) {
      if (next.positions[i] !== curr.positions[i]) {
        index = i
        break
      }
    }

    return distances[curr.positions[index]][next.positions[index]].distance
  }

  const { end } = $.pathfinding.dijkstra<State>({
    start,
    toKey,
    isGoal: curr => curr.keys.length === keyCount,
    getCost,
    getNextNodes,
  })

  if (!end) {
    throw new Error('Could not pick up all keys')
  }

  return end.steps
}
