import $ from '../../helpers'
import { Coords, Point } from '../../types'

type State = {
  position: Coords
  direction: Coords | undefined
}

const CLEAN = '.'
const WEAKENED = 'W'
const INFECTED = '#'
const FLAGGED = 'F'

export const run = (
  rows: Array<string>,
  iterations: number,
  advanced: boolean = false
) => {
  const nodes: Map<Point, string> = $.grid.reduce(
    $.grid.create(rows),
    (nodes, value, ri, ci) => nodes.set(ci + ',' + ri, value),
    new Map()
  )
  const state: State = {
    position: [Math.floor(rows[0].length / 2), Math.floor(rows.length / 2)],
    direction: $.turn.DIRECTIONS[0],
  }
  let infections = 0

  while (iterations--) {
    const point = $.toPoint(state.position)
    const curr = nodes.get(point) || CLEAN

    if (curr === CLEAN) {
      state.direction = $.turn.left(state.direction!)
      // In advanced mode, it moves into weakened state, and therefore the
      // infection count shouldn’t be updated.
      nodes.set(point, advanced ? WEAKENED : INFECTED)
      if (!advanced) infections++
    }

    if (curr === INFECTED) {
      state.direction = $.turn.right(state.direction!)
      // In advanced mode, it goes to flagged state, otherwise it gets cleaned.
      nodes.set(point, advanced ? FLAGGED : CLEAN)
    }

    if (curr === WEAKENED) {
      nodes.set(point, INFECTED)
      infections++
    }

    if (curr === FLAGGED) {
      state.direction = $.turn.left($.turn.left(state.direction!)!)
      nodes.set(point, CLEAN)
    }

    state.position = $.applyVector(state.position, state.direction!)
  }

  return infections
}
