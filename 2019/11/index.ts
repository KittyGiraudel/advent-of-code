import $ from '../../helpers'
import { Coords, Point } from '../../types'
import { Intcode } from '../05'

type State = {
  direction: Coords
  position: Coords
  record: Map<Point, number>
}

const next = (computer: Intcode, state: State) => {
  // Provide 0 if the robot is over a black panel or 1 if the robot is over a
  // white panel. All of the panels are currently black (default value).
  const coords = $.toPoint(state.position)
  const tile = state.record.get(coords) || 0

  // Run the program.
  computer.setInput(tile).run()

  // First, it will output a value indicating the color to paint the panel the
  // robot is over: 0 means to paint the panel black, and 1 means to paint the
  // panel white.
  // Second, it will output a value indicating the direction the robot should
  // turn: 0 means it should turn left 90 degrees, and 1 means it should turn
  // right 90 degrees.
  const [color, rotation] = computer.getOutput() as number[]

  // Record the new color for the current tile.
  state.record.set(coords, color)

  // Reorientate the robot. After the robot turns, it should always move forward
  // exactly one panel.
  state.direction = (rotation ? $.turn.right : $.turn.left)(state.direction)!
  state.position = $.applyVector(state.position, state.direction)

  return state
}

export const paint = (input: string, start: number = 0) => {
  const computer = new Intcode(input)
  const state: State = {
    direction: $.turn.DIRECTIONS[0],
    position: [0, 0],
    record: new Map<Point, number>([['0,0', start]]),
  }

  while (!computer.hasHalted()) next(computer, state)

  return state.record
}

export const render = (record: Map<Point, number>) => {
  const coords = Array.from(record.keys()).map($.toCoords)
  const [minX, maxX, minY, maxY] = $.boundaries(coords)

  return new $.Grid(maxX + 1 - minX, maxY + 1 - minY, ([ri, ci]) =>
    record.get(`${ci + minX},${ri + minY}`) ? '#' : ' '
  ).render(' ')
}
