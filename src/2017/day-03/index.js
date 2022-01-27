const $ = require('../../helpers')

const EAST = [+1, 0]
const WEST = [-1, 0]
const SOUTH = [0, +1]
const NORTH = [0, -1]

const resolve = bound => {
  // Given the value increments by 1 for every new cell, use an array where the
  // index serves as the value itself, hence why we skip the first cell (0).
  const coords = [null, [0, 0]]
  // Taking a step means applying a directional vector to the last recorded
  // set of coordinates.
  const step = vector => coords.push($.applyVector($.last(coords), vector))

  let steps = 0
  // Populating the grid goes like this: go east, then north, then south, then
  // west, and increment the amount of steps to take by 1 every 2 directions. So
  // the first directions are: E1, N1, W2, S2, E3, N3, W4, S4, E5, N5, W6, S6…
  while (coords.length <= bound) {
    steps++
    for (let i = 0; i < steps; i++) step(EAST)
    for (let i = 0; i < steps; i++) step(NORTH)
    steps++
    for (let i = 0; i < steps; i++) step(WEST)
    for (let i = 0; i < steps; i++) step(SOUTH)
  }

  return $.manhattan(coords[bound], [0, 0])
}

const resolve2 = bound => {
  let steps = 0
  let position = [0, 0]
  const map = new Map([['0,0', 1]])

  // Taking a step still means applying a directional vector to the last
  // recorded set of coordinates. But the stored value depends on the sum of the
  // value of the recorded neighbors.
  const step = vector => {
    position = $.applyVector(position, vector)

    const sum = $.sum(
      $.surrounding(position, 'POINTS').map(point => map.get(point) || 0)
    )

    map.set($.toPoint(position), sum)

    return sum
  }

  const peek = () => map.get($.toPoint(position))

  while (true) {
    steps++
    for (let i = 0; i < steps; i++) if (step(EAST) > bound) return peek()
    for (let i = 0; i < steps; i++) if (step(NORTH) > bound) return peek()
    steps++
    for (let i = 0; i < steps; i++) if (step(WEST) > bound) return peek()
    for (let i = 0; i < steps; i++) if (step(SOUTH) > bound) return peek()
  }
}

module.exports = { resolve, resolve2 }
