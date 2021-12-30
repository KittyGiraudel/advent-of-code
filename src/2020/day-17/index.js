const $ = require('../../helpers')

const W = coords => $.updateAtIndex(coords, 0, coords[0] - 1)
const E = coords => $.updateAtIndex(coords, 0, coords[0] + 1)
const N = coords => $.updateAtIndex(coords, 1, coords[1] - 1)
const S = coords => $.updateAtIndex(coords, 1, coords[1] + 1)
const B = coords => $.updateAtIndex(coords, 2, coords[2] - 1)
const F = coords => $.updateAtIndex(coords, 2, coords[2] + 1)
const H = coords => $.updateAtIndex(coords, 3, coords[3] - 1)
const C = coords => $.updateAtIndex(coords, 3, coords[3] + 1)
const NE = $.compose(N, E)
const SE = $.compose(S, E)
const SW = $.compose(S, W)
const NW = $.compose(N, W)

const FNS = {}
FNS['2'] = [N, NE, E, SE, S, SW, W, NW]
FNS['3'] = [
  ...FNS['2'],
  ...FNS['2'].map(fn => $.compose(fn, B)).concat(B),
  ...FNS['2'].map(fn => $.compose(fn, F)).concat(F),
]
FNS['4'] = [
  ...FNS['3'],
  ...FNS['3'].map(fn => $.compose(fn, H)).concat(H),
  ...FNS['3'].map(fn => $.compose(fn, C)).concat(C),
]

// Return the coordinates of all the neighbourds of the cell at the given coord-
// inates, on the given number of dimensions (3 or 4).
// @param {String} coords - Stringified coordinates
// @param {Number} dimensions - Either 3 or 4 dimensions
// @param {Map} cache - Coordinates cache
// @return {String[]} Stringified coordinates of all neighbours (26 or 80)
const getNeighborCoords = (coords, dimensions, cache) => {
  if (cache.has(coords)) return cache.get(coords)

  const coordinates = coords.split(',').map(Number)
  const functions = FNS[String(dimensions)]
  const neighbourCoords = functions.map(fn => fn(coordinates).join(','))

  cache.set(coords, neighbourCoords)

  return neighbourCoords
}

// Determine whether a cell is alive.
// @param {String} cell - Cell value
// @return {Boolean}
const isAlive = cell => cell === '#'

// Return the new value for the cell given its amount of alive neighbours.
// @param {String} cell - Cell value
// @param {Number} count - Amount of alive neighbours
// @return {String}
const mutate = (cell, count) =>
  cell === '#'
    ? count === 2 || count === 3
      ? '#'
      : '.'
    : count === 3
    ? '#'
    : '.'

// Return the new value for the cell at given coords, based on its value in the
// origin dimensional space, across dimensions, leveraging cache.
// @param {String} coords - Stringified coordinates
// @param {Map} origin - Origin map prior to cycling
// @param {Number} dimensions - Either 3 or 4 dimensions
// @param {Map} cache - Coordinates cache
// @return {String}
const transition = (coords, origin, dimensions, cache) => {
  const cell = origin.get(coords)
  const neighbourCoords = getNeighborCoords(coords, dimensions, cache)
  const neighbours = neighbourCoords.map(coords => origin.get(coords))
  const count = neighbours.filter(isAlive).length

  return mutate(cell, count)
}

// Perform a cycle.
// @param {Map} origin - Storage map
// @param {Number} dimensions - Either 3 or 4 dimensions
// @param {Map} cache - Coordinates cache
// @return {Map}
const cycle = (origin, dimensions, cache) =>
  [...origin.keys()].reduce((acc, key) => {
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
// @param {String[]} rows - Rows
// @return {Map}
const init = rows =>
  rows.reduce(
    (map, row, y) =>
      row
        .split('')
        .reduce((map, value, x) => map.set([x, y, 0, 0].join(','), value), map),
    new Map()
  )

// Count the amount of alive cells in the map.
// @param {Map} map - Storage map
// @return {Number}
const count = map => Array.from(map.values()).filter(isAlive).length

// Run the game of life on the given initial input for a certain amount of
// cycles on a given amount of dimensions.
// @param {String[]} input - Rows
// @param {Number} cycles - Amount of cycles
// @param {Number} dimensions - Amount of dimensions (3 or 4)
// @param {Map} cache - Coordinates cache
// @return {Number}
const gameOfLife = (input, cycles, dimensions = 3, cache = new Map()) =>
  count(
    Array.from({ length: cycles }).reduce(
      map => cycle(map, dimensions, cache),
      init(input)
    )
  )

module.exports = { gameOfLife }
