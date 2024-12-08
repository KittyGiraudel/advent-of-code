import $ from '../../helpers'
import type { Coords, Grid, Point } from '../../types'

type Orientation = '^' | '>' | 'v' | '<'
type State = { position: Coords; orientation: Orientation }
type Outcome = { type: 'OUT'; path: Set<Point> } | { type: 'LOOP' }

const getVector = (orientation: Orientation): Coords => {
  if (orientation === '^') return [-1, 0]
  if (orientation === '>') return [0, +1]
  if (orientation === 'v') return [+1, 0]
  if (orientation === '<') return [0, -1]
  throw new Error('Invalid orientation')
}

const turnRight = (orientation: Orientation): Orientation => {
  if (orientation === '^') return '>'
  if (orientation === '>') return 'v'
  if (orientation === 'v') return '<'
  if (orientation === '<') return '^'
  throw new Error('Invalid orientation')
}

const navigate = (grid: Grid<string>, initialState: State): Outcome => {
  const state = structuredClone(initialState)
  const cache = new Set<string>()

  while (true) {
    const key = $.toPoint(state.position) + '-' + state.orientation

    // If our position + orientation was already found, it means we have hit a
    // loop, and we can stop.
    if (cache.has(key)) return { type: 'LOOP' }
    else cache.add(key)

    const vector = getVector(state.orientation)
    const nextPosition = $.applyVector(state.position, vector)
    const nextValue = grid.get(nextPosition)

    // If the next value doesn’t exist, it means the guard exited the map after
    // X amount of steps (the size of our cache map).
    if (!nextValue) {
      const extractPoint = (a: string) => a.split('-')[0] as Point
      const points = Array.from(cache).map(extractPoint)
      return { type: 'OUT', path: new Set(points) }
    }

    // If the next value is an obstacle, turn to the right, otherwise, move to
    // the next position.
    if (nextValue === '#') state.orientation = turnRight(state.orientation)
    else state.position = nextPosition
  }
}

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input)
  const startPosition = grid.findCoords(v => v !== '#' && v !== '.') as Coords
  const startOrientation = grid.get(startPosition) as Orientation
  const state = { position: startPosition, orientation: startOrientation }

  // Remove the initial guard position from the grid.
  grid.set(startPosition, '.')

  // First, solve part 1 by letting the guard walk until she exits.
  const navigation = navigate(grid, state)
  if (navigation.type !== 'OUT') throw new Error('Guard never exited the field')

  if (!part2) {
    return navigation.path.size
  }

  return grid.count((_, coords) => {
    const point = $.toPoint(coords)
    // For every position on the guard’s path, except the starting one, try to
    // set up an obstacle, and check whether the guard ends up in a loop.
    if (!navigation.path.has(point) || point === $.toPoint(startPosition))
      return false

    // This is not super pretty, but it’s a major performance optimization by
    // avoiding to clone the map for every position. This way, we keep a single
    // map, which we mutate before and restore after every navigation.
    // See: https://www.reddit.com/r/adventofcode/comments/1h8g6za/2024_day_6_part_2_various_optimization_tricks/
    grid.set(coords, '#')
    const outcome = navigate(grid, state)
    grid.set(coords, '.')

    return outcome.type === 'LOOP'
  })
}
