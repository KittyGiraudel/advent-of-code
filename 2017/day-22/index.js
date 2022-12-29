import $ from '../../helpers'

const CLEAN = '.'
const WEAKENED = 'W'
const INFECTED = '#'
const FLAGGED = 'F'

export const run = (rows, iterations, advanced = false) => {
  const nodes = new Map()
  const state = {
    position: [Math.floor(rows[0].length / 2), Math.floor(rows.length / 2)],
    direction: $.turn.DIRECTIONS[0],
  }
  let infections = 0

  $.grid.map($.grid.create(rows), (v, ri, ci) => nodes.set(ci + ',' + ri, v))

  while (iterations--) {
    const point = $.toPoint(state.position)
    const curr = nodes.get(point) || CLEAN

    if (curr === CLEAN) {
      state.direction = $.turn.left(state.direction)
      // In advanced mode, it moves into weakened state, and therefore the
      // infection count shouldn’t be updated.
      nodes.set(point, advanced ? WEAKENED : INFECTED)
      if (!advanced) infections++
    }

    if (curr === INFECTED) {
      state.direction = $.turn.right(state.direction)
      // In advanced mode, it goes to flagged state, otherwise it gets cleaned.
      nodes.set(point, advanced ? FLAGGED : CLEAN)
    }

    if (curr === WEAKENED) {
      nodes.set(point, INFECTED)
      infections++
    }

    if (curr === FLAGGED) {
      state.direction = $.turn.left($.turn.left(state.direction))
      nodes.set(point, CLEAN)
    }

    state.position = $.applyVector(state.position, state.direction)
  }

  return infections
}
