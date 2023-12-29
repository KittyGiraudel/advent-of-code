import $ from '../../helpers'
import { Coords, Point } from '../../types'

type State = { keys: string; positions: string; steps: number }
type Distance = { distance: number; locks: string[] }
type Distances = Record<string, Record<string, Distance>>

const KEY_RE = /[a-z]/
const DOOR_RE = /[A-Z]/

const toKey = (curr: State) => curr.positions + ':' + curr.keys

// I wasn’t able to solve it without looking for hints on Reddit. Basically, we
// need to pre-compute the distance between every pair of keys as well as the
// robot with BFS (or GBFS), and from there run Dijkstra so that we focus only
// on the positions that really matter and skip everything in between. Still, it
// took me a while to write all the code but I’m happy I made it.
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

  $.Grid.fromRows(input).forEach((value, ...coords) => {
    const point = $.toPoint(coords)
    if (value === '@') startPositions.push(point)
    if (KEY_RE.test(value)) keys[point] = value
    if (DOOR_RE.test(value)) doors[point] = value
    if (value !== '#') lookup.add(point)
  })

  // For part 2, we need to mark the normal starting position and its 4
  // bordering positions as walls, and then define the new 4 starting positions
  // as the 4 diagonals to the previous starting point.
  if (part2) {
    const start = startPositions.pop()!
    const [N, NE, E, SE, S, SW, W, NW] = $.surrounding(start)

    ;[start, N, E, S, W].forEach(point => lookup.delete(point))
    ;[NE, SE, SW, NW].forEach(point => startPositions.push(point))
  }

  const distances: Distances = {}
  const keyPoints = Object.keys(keys) as Point[]
  const keyCount = keyPoints.length
  const combinations = $.combinations([...keyPoints, ...startPositions], 2)

  combinations.forEach(([a, b]) => {
    const { end, getPath } = $.search.gbfs<Point>({
      start: a,
      heuristic: curr => $.manhattan($.toCoords(curr), $.toCoords(b)),
      isGoal: curr => curr === b,
      getNextNodes: curr =>
        $.bordering(curr).filter(point => lookup.has(point)),
    })
    if (!end) return
    const path = getPath() as Point[]
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
          positions: $.replace(curr.positions, i, nextKey),
          // It took me a while to realise that sorting the keys is important,
          // as this is what makes it possible for the search to avoid visiting
          // similar states multiple times. Semantically, abc is the same as acb
          // or bca, or cab.
          keys: Array.from(curr.keys + nextKey)
            .sort()
            .join(''),
          steps: curr.steps + dict[nextKey].distance,
        }))
      )
    }

    return nodes
  }

  const getCost = (curr: State, next: State) => {
    const index = Array.from(curr.positions).findIndex(
      (position, index) => position !== next.positions[index]
    )

    return distances[curr.positions[index]][next.positions[index]].distance
  }

  const { end } = $.search.dijkstra<State>({
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
