const { Intcode } = require('../day-09')
const $ = require('../../helpers')

const SYMBOLS = [' ', 'x', '▫️', '_', 'o']

const render = board => {
  const keys = Array.from(board.keys())
  const coords = keys.map(coords => coords.split(',').map(Number))
  const maxX = Math.max(...coords.map(tuple => tuple[0]))
  const maxY = Math.max(...coords.map(tuple => tuple[1]))

  return Array.from({ length: maxY + 1 }, (_, y) =>
    Array.from(
      { length: maxX + 1 },
      (_, x) => SYMBOLS[board.get(`${x},${y}`)]
    ).join(' ')
  ).join('\n')
}

const tick = (state, computer) => {
  computer.run()

  const tiles = $.chunk(computer.outputs, 3)
  computer.outputs = []

  tiles.forEach(([x, y, t]) => {
    if (x === -1 && y === 0) state.score = t
    else {
      if (t === 3) state.paddle = { x, y }
      if (t === 4) state.ball = { x, y }
      state.board.set(`${x},${y}`, t)
    }
  })

  return state
}

const getInput = ({ ball, paddle }) => {
  if (paddle.x < ball.x) return +1
  else if (paddle.x > ball.x) return -1
  return 0
}

// Initialize the initial state of the game by running a first tick to populate
// the board and get the position of the ball and the paddle.
const getInitialState = computer =>
  tick({ score: 0, ball: {}, paddle: {}, board: new Map() }, computer)

// Initialize the Intcode computer by overriding the value at index 0 as
// expected:
// > Memory address 0 represents the number of quarters that have been inserted;
// > set it to 2 to play for free.
const initComputer = input =>
  new Intcode([2, ...input.split(',').map(Number).slice(1)])

const draw = input => {
  const computer = initComputer(input)
  let state = getInitialState(computer)

  while (!computer.hasHalted()) {
    state = tick(state, computer.setInput(getInput(state)))
  }

  return state
}

module.exports = { draw, getInitialState, initComputer }
