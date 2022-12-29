import $ from '../../helpers'
import { Intcode } from '../day-05'

const next = (computer, state) => {
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
  const [color, rotation] = computer.getOutput()

  // Record the new color for the current tile.
  state.record.set(coords, color)

  // Reorientate the robot. After the robot turns, it should always move forward
  // exactly one panel.
  state.direction = (rotation ? $.turn.right : $.turn.left)(state.direction)
  state.position = $.applyVector(state.position, state.direction)

  return state
}

export const paint = (input, start = 0) => {
  const computer = new Intcode(input)
  const state = {
    direction: $.turn.DIRECTIONS[0],
    position: [0, 0],
    record: new Map([['0,0', start]]),
  }

  while (!computer.hasHalted()) next(computer, state)

  return state.record
}

export const render = record => {
  const coords = Array.from(record.keys()).map($.toCoords)
  const [minX, maxX, minY, maxY] = $.boundaries(coords)

  return $.grid.render(
    $.grid.init(maxX + 1 - minX, maxY + 1 - minY, (x, y) =>
      record.get(`${x + minX},${y + minY}`) ? '#' : ' '
    ),
    ' '
  )
}
