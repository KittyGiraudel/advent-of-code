import $ from '../../helpers'
import { Point } from '../../types'

// I spent a lot of time trying to making the typing work nicely for 2, 3 or 4
// dimensions but it’s honestly a nightmare and I’m not good enough with TS for
// that, so I ended up converting everything to strings and number[] instead of
// Point/Coords, TriPoint/TriCoords, QuadriPoint/QuadriCoords.
type NeighborCache = Map<string, string[]>
type Mappy = Map<string, string>

const W = (coords: number[]) => $.replace(coords, 0, coords[0] - 1)
const E = (coords: number[]) => $.replace(coords, 0, coords[0] + 1)
const N = (coords: number[]) => $.replace(coords, 1, coords[1] - 1)
const S = (coords: number[]) => $.replace(coords, 1, coords[1] + 1)
const B = (coords: number[]) => $.replace(coords, 2, coords[2] - 1)
const F = (coords: number[]) => $.replace(coords, 2, coords[2] + 1)
const H = (coords: number[]) => $.replace(coords, 3, coords[3] - 1)
const C = (coords: number[]) => $.replace(coords, 3, coords[3] + 1)
const NE = (input: number[]): typeof input => N(E(input))
const SE = (input: number[]): typeof input => S(E(input))
const SW = (input: number[]): typeof input => S(W(input))
const NW = (input: number[]): typeof input => N(W(input))

const Dim2Handlers = [N, NE, E, SE, S, SW, W, NW]
const Dim3Handlers = [
  ...Dim2Handlers,
  ...Dim2Handlers.map(
    (fn: (typeof Dim2Handlers)[number]) => (input: number[]) => fn(B(input))
  ).concat(B),
  ...Dim2Handlers.map(
    (fn: (typeof Dim2Handlers)[number]) => (input: number[]) => fn(F(input))
  ).concat(F),
]
const Dim4Handlers = [
  ...Dim3Handlers,
  ...Dim3Handlers.map(
    (fn: (typeof Dim3Handlers)[number]) => (input: number[]) => fn(H(input))
  ).concat(H),
  ...Dim3Handlers.map(
    (fn: (typeof Dim3Handlers)[number]) => (input: number[]) => fn(C(input))
  ).concat(C),
]
const FNS = {
  '2': Dim2Handlers,
  '3': Dim3Handlers,
  '4': Dim4Handlers,
}

// Return the coordinates of all the neighbourds of the cell at the given coord-
// inates, on the given number of dimensions (3 or 4).
// @param coords - Stringified coordinates
// @param dimensions - Either 3 or 4 dimensions
// @param cache - Coordinates cache
// @return Stringified coordinates of all neighbours (26 or 80)
const getNeighborCoords = (
  coords: string,
  dimensions: number,
  cache: NeighborCache
) => {
  if (cache.has(coords)) return cache.get(coords) as (typeof coords)[]

  const coordinates = $.toCoords(coords as Point)
  const functions = FNS[String(dimensions) as keyof typeof FNS]
  const neighbourCoords = functions.map(fn => $.toPoint(fn(coordinates)))

  cache.set(coords, neighbourCoords)

  return neighbourCoords
}

// Determine whether a cell is alive.
// @param cell - Cell value
const isAlive = (cell: string) => cell === '#'

// Return the new value for the cell given its amount of alive neighbours.
// @param cell - Cell value
// @param count - Amount of alive neighbours
const mutate = (cell: string, count: number) =>
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
  coords: string,
  origin: Mappy,
  dimensions: number,
  cache: NeighborCache
) => {
  const cell = origin.get(coords) as string
  const neighbourCoords = getNeighborCoords(coords, dimensions, cache)
  const neighbours = neighbourCoords.map(coords => origin.get(coords))
  const count = neighbours.filter(isAlive).length

  return mutate(cell, count)
}

// Perform a cycle.
// @param origin - Storage map
// @param dimensions - Either 3 or 4 dimensions
// @param cache - Coordinates cache
const cycle = (
  origin: Mappy = new Map(),
  dimensions: number,
  cache: NeighborCache
) =>
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
const init = (rows: string[]) =>
  rows.reduce<Mappy>(
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
const count = (map: Map<string, string>) =>
  Array.from(map.values()).filter(isAlive).length

// Run the game of life on the given initial input for a certain amount of
// cycles on a given amount of dimensions.
// @param input - Rows
// @param cycles - Amount of cycles
// @param dimensions - Amount of dimensions (3 or 4)
// @param cache - Coordinates cache
export const gameOfLife = (
  input: string[],
  cycles: number,
  dimensions: number = 3,
  cache: NeighborCache = new Map()
) =>
  count(
    $.array(cycles).reduce(map => cycle(map, dimensions, cache), init(input))
  )
