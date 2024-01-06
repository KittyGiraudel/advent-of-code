import $ from '../../helpers'
import { Coords, Point } from '../../types'

type State = {
  position: Coords
  direction: Coords
}

const CLEAN = '.'
const WEAKENED = 'W'
const INFECTED = '#'
const FLAGGED = 'F'

export const run = (
  rows: string[],
  iterations: number,
  part2: boolean = false
) => {
  const grid = $.Grid.fromRows(rows)
  const nodes = grid.toMap()
  const state: State = {
    position: [Math.floor(grid.height / 2), Math.floor(grid.width / 2)],
    direction: $.turn.DIRECTIONS[0],
  }
  let infections = 0

  while (iterations--) {
    const point = $.toPoint(state.position)
    const curr = nodes.get(point) || CLEAN

    if (curr === CLEAN) {
      state.direction = $.turn.left(state.direction)
      // For part 2, it moves into weakened state, and therefore the infection
      // count shouldn’t be updated.
      nodes.set(point, part2 ? WEAKENED : INFECTED)
      if (!part2) infections++
    }

    if (curr === INFECTED) {
      state.direction = $.turn.right(state.direction)
      // For part 2, it goes to flagged state, otherwise it gets cleaned.
      nodes.set(point, part2 ? FLAGGED : CLEAN)
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
