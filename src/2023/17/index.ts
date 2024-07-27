import $ from '../../helpers'
import type { Coords, Point } from '../../types'

type State = { position: Coords; orientation: Coords; streak: number }

const toKey = (curr: State) =>
  $.toPoint(curr.position) +
  ' ' +
  $.toPoint(curr.orientation) +
  ' ' +
  curr.streak

const checkTurns = (
  { position, orientation }: State,
  width: number,
  height: number
) => {
  const [ri, ci] = position
  const point = $.toPoint(orientation)
  let validLeft = true
  let validRight = true

  if (point === '1,0') {
    validLeft = ci <= width - 1 - 4
    validRight = ci > 4
  } else if (point === '-1,0') {
    validLeft = ci > 4
    validRight = ci <= width - 1 - 4
  } else if (point === '0,1') {
    validLeft = ri > 4
    validRight = ri <= height - 1 - 4
  } else if (point === '0,-1') {
    validLeft = ri <= height - 1 - 4
    validRight = ri > 4
  } else {
    throw new Error('Invalid orientation ' + point)
  }

  return { validLeft, validRight }
}

const is = (a: Coords, b: Coords) => a[0] === b[0] && a[1] === b[1]

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input, Number)
  const startCoords: Coords = [0, 0]
  const endCoords: Coords = [grid.height - 1, grid.width - 1]
  const start: State = {
    position: startCoords,
    streak: 0,
    orientation: $.turn.DIRECTIONS[2],
  }
  const { end, costs } = $.search.aStar<State>({
    start,
    toKey,
    heuristic: curr => $.manhattan(curr.position, endCoords),
    isGoal: curr => is(curr.position, endCoords),
    getCost: (_, next) => grid.get(next.position),
    getNext: curr => {
      const states: State[] = []
      const left = $.turn.left(curr.orientation)
      const right = $.turn.right(curr.orientation)
      const maxStraight = part2 ? 10 : 3
      const leftMove = {
        position: $.applyVector(curr.position, left),
        orientation: left,
        streak: 1,
      }
      const rightMove = {
        position: $.applyVector(curr.position, right),
        orientation: right,
        streak: 1,
      }
      const straightMove = {
        position: $.applyVector(curr.position, curr.orientation),
        orientation: curr.orientation,
        streak: curr.streak + 1,
      }

      if (curr.streak < maxStraight) states.push(straightMove)
      if (!part2) states.push(leftMove, rightMove)
      else if (curr.streak >= 4 || is(curr.position, startCoords)) {
        const { validLeft, validRight } = checkTurns(
          curr,
          grid.width,
          grid.height
        )
        if (validLeft) states.push(leftMove)
        if (validRight) states.push(rightMove)
      }

      return states.filter(state => grid.get(state.position))
    },
  })

  if (!end) {
    throw new Error('Could not find an end node')
  }

  return costs[toKey(end)]
}
