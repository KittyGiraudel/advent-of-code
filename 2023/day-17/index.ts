import $ from '../../helpers'
import { Coords, Point } from '../../types'

type State = { position: Coords; orientation: Coords; streak: number }

const DIRECTIONS: [Coords, Coords, Coords, Coords] = [
  /* N */ [-1, 0],
  /* E */ [0, +1],
  /* S */ [+1, 0],
  /* W */ [0, -1],
]

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

export const run = (input: string[], advanced: boolean = false) => {
  const grid = $.grid.from<number>(input, Number)
  const { width, height } = $.grid.dimensions(grid)
  const startCoords: Coords = [0, 0]
  const endCoords: Coords = [height - 1, width - 1]
  const start: State = {
    position: startCoords,
    streak: 0,
    orientation: DIRECTIONS[2],
  }
  const { from, end } = $.pathfinding.dijkstra<State>({
    start,
    toKey,
    isGoal: curr => is(curr.position, endCoords),
    getCost: (_, next) => $.grid.at(grid, next.position),
    getNextNodes: curr => {
      const states: State[] = []
      const left = $.turn.left(curr.orientation, DIRECTIONS)
      const right = $.turn.right(curr.orientation, DIRECTIONS)
      const maxStraight = advanced ? 10 : 3
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
      if (!advanced) states.push(leftMove, rightMove)
      else if (curr.streak >= 4 || is(curr.position, startCoords)) {
        const { validLeft, validRight } = checkTurns(curr, width, height)
        if (validLeft) states.push(leftMove)
        if (validRight) states.push(rightMove)
      }

      return states.filter(state => $.grid.at(grid, state.position))
    },
  })

  return $.pathfinding
    .path(from, toKey(start), toKey(end))
    .map(key => $.toCoords(key!.split(' ')[0] as Point))
    .map(coords => $.grid.at(grid, coords))
    .reduce((a, b) => a + b, 0)
}
