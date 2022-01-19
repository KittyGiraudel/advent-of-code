const $ = require('../../helpers')

const VECTORS = {
  e: [+2, 0],
  w: [-2, 0],
  nw: [-1, -1],
  ne: [+1, -1],
  se: [+1, +1],
  sw: [-1, +1],
}

// Parse a given line into a series of directions.
// @param {String} line - Raw series of steps
// @return {String[]}
const parseLine = line => {
  const directions = []
  let pointer = 0

  while (pointer < line.length) {
    if (['n', 's'].includes(line[pointer])) {
      directions.push(line[pointer] + line[pointer + 1])
      pointer += 2
    } else {
      directions.push(line[pointer])
      pointer++
    }
  }

  return directions.map(direction => VECTORS[direction])
}

// Process given lines and store their outcome into a map.
// @param {String[]} lines - Raw series of steps
// @return {Map}
const processLines = lines =>
  lines
    .map(parseLine)
    .map(vectors => vectors.reduce($.applyVector, [0, 0]))
    .map($.toPoint)
    .reduce(
      (acc, key) => acc.set(key, acc.get(key) === 'B' ? 'W' : 'B'),
      new Map()
    )

// Get the coordinates of all 6 neighbours of the tile at the given coordinates.
// @param {String} key - Stringified coordinates
// @param {Map} cache - Coordinates cache
// @return {String[]} Stringified coordinates of all 6 neighbours
const getNeighborCoords = (key, cache) => {
  const coords = $.toCoords(key)

  if (cache.has(key)) return cache.get(key)

  const neighborCoords = Object.values(VECTORS)
    .map(vector => $.applyVector(coords, vector))
    .map($.toPoint)

  cache.set(key, neighborCoords)

  return neighborCoords
}

// Flip a given tile based on its current side and the amount of black tiles it
// has around it.
// @param {String} color - Tile color
// @param {Number} count - Amount of black tiles around it
// @return {String}
const flip = (color, count) =>
  color === 'B' && (count === 0 || count > 2)
    ? 'W'
    : color === 'W' && count === 2
    ? 'B'
    : color

// Return the new color for the tile at given coords, based on its original
// color, leveraging cache.
// @param {String} coords - Stringified coordinates
// @param {Map} origin - Origin map prior to cycling
// @param {Map} cache - Coordinates cache
// @return {String}
const transition = (coords, origin, cache) => {
  const cell = origin.get(coords)
  const neighborCoords = getNeighborCoords(coords, cache)
  const neighbours = neighborCoords.map(coords => origin.get(coords))
  const count = neighbours.filter(tile => tile === 'B').length

  return flip(cell || 'W', count)
}

// Perform a cycle.
// @param {Map} origin - Storage map
// @param {Map} cache - Coordinates cache
// @return {Map}
const cycle = (origin, cache) =>
  Array.from(origin.keys()).reduce((acc, key) => {
    getNeighborCoords(key, cache).forEach(coords => {
      if (acc.has(coords)) return
      acc.set(coords, transition(coords, origin, cache))
    })

    return acc.set(key, transition(key, origin, cache))
  }, new Map(origin))

// Count the amount of black tiles on the floor.
// @param {Map} map - Storage map
// @return {Number}
const countBlackTiles = map =>
  Array.from(map.values()).filter(a => a === 'B').length

// Run the game of life on the given initial input for a certain amount of
// cycles.
// @param {String[]} input - Rows
// @param {Number} cycles - Amount of cycles
// @param {Map} cache - Coordinates cache
// @return {Number}
const gameOfLife = (lines, cycles = 1, cache = new Map()) =>
  countBlackTiles(
    $.array(cycles).reduce(map => cycle(map, cache), processLines(lines))
  )

module.exports = { gameOfLife }
