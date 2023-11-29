import $ from '../../helpers'
import { Coords, Point } from '../../types'

type NeighborCache = Map<Point, Array<Point>>
type Mappy = Map<Point, string>

const W = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 0, coords[0] - 1) as Coords
const E = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 0, coords[0] + 1) as Coords
const N = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 1, coords[1] - 1) as Coords
const S = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 1, coords[1] + 1) as Coords
const B = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 2, coords[2] - 1) as Coords
const F = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 2, coords[2] + 1) as Coords
const H = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 3, coords[3] - 1) as Coords
const C = (coords: Coords): Coords =>
  $.updateAtIndex(coords, 3, coords[3] + 1) as Coords
const NE = $.compose(N, E)
const SE = $.compose(S, E)
const SW = $.compose(S, W)
const NW = $.compose(N, W)

const FNS = {}
FNS['2'] = [N, NE, E, SE, S, SW, W, NW]
FNS['3'] = [
  ...FNS['2'],
  ...FNS['2'].map((fn: Function) => $.compose(fn, B)).concat(B),
  ...FNS['2'].map((fn: Function) => $.compose(fn, F)).concat(F),
]
FNS['4'] = [
  ...FNS['3'],
  ...FNS['3'].map((fn: Function) => $.compose(fn, H)).concat(H),
  ...FNS['3'].map((fn: Function) => $.compose(fn, C)).concat(C),
]

// Return the coordinates of all the neighbourds of the cell at the given coord-
// inates, on the given number of dimensions (3 or 4).
// @param coords - Stringified coordinates
// @param dimensions - Either 3 or 4 dimensions
// @param cache - Coordinates cache
// @return Stringified coordinates of all neighbours (26 or 80)
const getNeighborCoords = (
  coords: Point,
  dimensions: number,
  cache: NeighborCache
): Array<Point> => {
  if (cache.has(coords)) return cache.get(coords)

  const coordinates = $.toCoords(coords)
  const functions = FNS[String(dimensions)]
  const neighbourCoords = functions.map((fn: Function) =>
    $.toPoint(fn(coordinates))
  )

  cache.set(coords, neighbourCoords)

  return neighbourCoords
}

// Determine whether a cell is alive.
// @param cell - Cell value
const isAlive = (cell: string): boolean => cell === '#'

// Return the new value for the cell given its amount of alive neighbours.
// @param cell - Cell value
// @param count - Amount of alive neighbours
const mutate = (cell: string, count: number): string =>
  cell === '#'
    ? count === 2 || count === 3
      ? '#'
      : '.'
    : count === 3
    ? '#'
    : '.'

// Return the new value for the cell at given coords, based on its value in the
// origin dimensional space, across dimensions, leveraging cache.
// @param coords - Stringified coordinates
// @param origin - Origin map prior to cycling
// @param dimensions - Either 3 or 4 dimensions
// @param cache - Coordinates cache
const transition = (
  coords: Point,
  origin: Mappy,
  dimensions: number,
  cache: NeighborCache
): string => {
  const cell = origin.get(coords)
  const neighbourCoords = getNeighborCoords(coords, dimensions, cache)
  const neighbours = neighbourCoords.map(coords => origin.get(coords))
  const count = neighbours.filter(isAlive).length

  return mutate(cell, count)
}

// Perform a cycle.
// @param origin - Storage map
// @param dimensions - Either 3 or 4 dimensions
// @param cache - Coordinates cache
const cycle = (origin: Mappy, dimensions: number, cache: NeighborCache) =>
  Array.from(origin.keys()).reduce((acc, key) => {
    // Get the coordinates of all the neighbours to the current cell. For each
    // neighbouring coordinates which does not exist in the dimensional space,
    // compute the value of the cell and set it in the dimensional space.
    getNeighborCoords(key, dimensions, cache).forEach(coords => {
      if (acc.has(coords)) return
      acc.set(coords, transition(coords, origin, dimensions, cache))
    })

    // Set the new value of the cell in the dimensional space.
    return acc.set(key, transition(key, origin, dimensions, cache))
  }, new Map(origin))

// Initialise the storage map
// @param rows - Rows
const init = (rows: Array<string>): Mappy =>
  rows.reduce(
    (map, row, y) =>
      row
        .split('')
        .reduce(
          (map, value, x) => map.set($.toPoint([x, y, 0, 0]), value),
          map
        ),
    new Map()
  )

// Count the amount of alive cells in the map.
// @param map - Storage map
const count = (map: Mappy): number =>
  Array.from(map.values()).filter(isAlive).length

// Run the game of life on the given initial input for a certain amount of
// cycles on a given amount of dimensions.
// @param input - Rows
// @param cycles - Amount of cycles
// @param dimensions - Amount of dimensions (3 or 4)
// @param cache - Coordinates cache
export const gameOfLife = (
  input: Array<string>,
  cycles: number,
  dimensions: number = 3,
  cache: NeighborCache = new Map()
): number =>
  count(
    $.array(cycles).reduce(map => cycle(map, dimensions, cache), init(input))
  )
