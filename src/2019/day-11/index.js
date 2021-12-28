const { Intcode } = require('../day-05')

const ORIENTIATIONS = ['UP', 'RIGHT', 'DOWN', 'LEFT']

const move = state => {
  if (state.orientation === 'UP') state.position[1]--
  if (state.orientation === 'RIGHT') state.position[0]++
  if (state.orientation === 'DOWN') state.position[1]++
  if (state.orientation === 'LEFT') state.position[0]--

  return state
}

const turn = (state, value) => {
  if (value === 0) {
    state.orientation =
      ORIENTIATIONS[ORIENTIATIONS.indexOf(state.orientation) - 1] ||
      ORIENTIATIONS[ORIENTIATIONS.length - 1]
  } else if (value === 1) {
    state.orientation =
      ORIENTIATIONS[ORIENTIATIONS.indexOf(state.orientation) + 1] ||
      ORIENTIATIONS[0]
  }

  return state
}

const next = (computer, state) => {
  // Provide 0 if the robot is over a black panel or 1 if the robot is over a
  // white panel. All of the panels are currently black (default value).
  const coords = state.position.join(',')
  const tile = state.record.get(coords) || 0
  computer.setInput(tile)

  // Run the program.
  computer.run()

  // First, it will output a value indicating the color to paint the panel the
  // robot is over: 0 means to paint the panel black, and 1 means to paint the
  // panel white.
  // Second, it will output a value indicating the direction the robot should
  // turn: 0 means it should turn left 90 degrees, and 1 means it should turn
  // right 90 degrees.
  // Outputs are popped from the end, so the rotation should be read before
  // the color.
  const rotation = computer.getOutput()
  const color = computer.getOutput()

  // Record the new color for the current tile.
  state.record.set(coords, color)

  // Reorientate the robot. After the robot turns, it should always move forward
  // exactly one panel.
  return move(turn(state, rotation))
}

const paint = (input, start = 0) => {
  const computer = new Intcode(input)
  const state = {
    direction: 'UP',
    position: [0, 0],
    record: new Map([['0,0', start]]),
  }

  while (!computer.hasHalted()) next(computer, state)

  return state.record
}

const render = record => {
  const coords = Array.from(record.keys()).map(coords =>
    coords.split(',').map(Number)
  )
  const maxX = Math.max(...coords.map(tuple => tuple[0]))
  const maxY = Math.max(...coords.map(tuple => tuple[1]))

  return Array.from({ length: maxY + 1 }, (_, y) =>
    Array.from({ length: maxX + 1 }, (_, x) =>
      record.get(`${x},${y}`) === 1 ? '#' : ' '
    ).join(' ')
  ).join('\n')
}

module.exports = { paint, turn, move, render }
