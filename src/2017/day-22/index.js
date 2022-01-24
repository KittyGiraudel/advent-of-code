const $ = require('../../helpers')

const DIRECTIONS = [
  [0, -1],
  [+1, 0],
  [0, +1],
  [-1, 0],
]

const turnLeft = direction => {
  const index = DIRECTIONS.indexOf(direction)

  return index === 0 ? $.peek(DIRECTIONS) : DIRECTIONS[index - 1]
}

const turnRight = direction => {
  const index = DIRECTIONS.indexOf(direction)

  return index === DIRECTIONS.length - 1 ? DIRECTIONS[0] : DIRECTIONS[index + 1]
}

const CLEAN = '.'
const WEAKENED = 'W'
const INFECTED = '#'
const FLAGGED = 'F'

const run = (rows, iterations, advanced = false) => {
  const nodes = new Map()
  const state = {
    position: [Math.floor(rows[0].length / 2), Math.floor(rows.length / 2)],
    direction: DIRECTIONS[0],
  }
  let infections = 0

  $.grid.map($.grid.create(rows), (v, ri, ci) => nodes.set(ci + ',' + ri, v))

  while (iterations--) {
    const point = $.toPoint(state.position)
    const curr = nodes.get(point) || CLEAN

    if (curr === CLEAN) {
      state.direction = turnLeft(state.direction)
      // In advanced mode, it moves into weakened state, and therefore the
      // infection count shouldn’t be updated.
      nodes.set(point, advanced ? WEAKENED : INFECTED)
      if (!advanced) infections++
    }

    if (curr === INFECTED) {
      state.direction = turnRight(state.direction)
      // In advanced mode, it goes to flagged state, otherwise it gets cleaned.
      nodes.set(point, advanced ? FLAGGED : CLEAN)
    }

    if (curr === WEAKENED) {
      nodes.set(point, INFECTED)
      infections++
    }

    if (curr === FLAGGED) {
      state.direction = turnLeft(turnLeft(state.direction))
      nodes.set(point, CLEAN)
    }

    state.position = $.applyVector(state.position, state.direction)
  }

  return infections
}

module.exports = { run }
