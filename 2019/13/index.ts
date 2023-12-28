import { Intcode } from '../05'
import $ from '../../helpers'
import { Coords, Point } from '../../types'

const SYMBOLS = [' ', 'x', '▫️', '_', 'o']

type Symbol = keyof typeof SYMBOLS
type Board = Map<Point, number>
type State = {
  score: number
  ball: Coords
  paddle: Coords
  board: Board
}

const INITIAL_STATE: State = {
  score: 0,
  ball: [0, 0],
  paddle: [0, 0],
  board: new Map(),
}

export const render = (board: Board) => {
  const keys = Array.from(board.keys())
  const coords = keys.map($.toCoords)
  const [, maxX, , maxY] = $.boundaries(coords)
  const grid = new $.Grid(
    maxX + 1,
    maxY + 1,
    (y, x) => SYMBOLS[board.get(`${x},${y}`) as Symbol]
  )

  return grid.render(' ')
}

const tick = (state: State, computer: Intcode) => {
  const output = computer.run().getOutput() as number[]
  const tiles = $.chunk(output, 3)

  tiles.forEach(([x, y, t]) => {
    if (x === -1 && y === 0) state.score = t
    else {
      if (t === 3) state.paddle = [y, x]
      if (t === 4) state.ball = [y, x]
      state.board.set(`${x},${y}`, t)
    }
  })

  return state
}

const getInput = ({ ball, paddle }: State) => {
  if (paddle[1] < ball[1]) return +1
  else if (paddle[1] > ball[1]) return -1
  return 0
}

// Initialize the initial state of the game by running a first tick to populate
// the board and get the position of the ball and the paddle.
export const getInitialState = (computer: Intcode) =>
  tick(INITIAL_STATE, computer)

// Initialize the Intcode computer by overriding the value at index 0 as
// expected:
// > Memory address 0 represents the number of quarters that have been inserted;
// > set it to 2 to play for free.
export const initComputer = (input: string) =>
  new Intcode(input).updateMemory(0, 2)

export const draw = (input: string) => {
  const computer = initComputer(input)
  let state = getInitialState(computer)

  while (!computer.hasHalted()) {
    state = tick(state, computer.setInput(getInput(state)))
  }

  return state
}
