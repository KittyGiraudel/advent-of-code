import { Intcode } from '../day-05'
import $ from '../../helpers'
import { CoordsObj, Point } from '../../types'

const SYMBOLS = [' ', 'x', '▫️', '_', 'o']

type Board = Map<Point, number>
type State = {
  score: number
  ball: CoordsObj
  paddle: CoordsObj
  board: Board
}

const INITIAL_STATE = {
  score: 0,
  ball: { x: null, y: null },
  paddle: { x: null, y: null },
  board: new Map(),
}

export const render = (board: Board): string => {
  const keys = Array.from(board.keys())
  const coords = keys.map($.toCoords)
  const [, maxX, , maxY] = $.boundaries(coords)
  const grid = $.grid.init(
    maxX + 1,
    maxY + 1,
    (x, y) => SYMBOLS[board.get(`${x},${y}`)]
  )

  return $.grid.render(grid, ' ')
}

const tick = (state: State, computer: Intcode): State => {
  const output = computer.run().getOutput() as number[]
  const tiles = $.chunk(output, 3) as number[][]

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

const getInput = ({ ball, paddle }: State): number => {
  if (paddle.x < ball.x) return +1
  else if (paddle.x > ball.x) return -1
  return 0
}

// Initialize the initial state of the game by running a first tick to populate
// the board and get the position of the ball and the paddle.
export const getInitialState = (computer: Intcode): State =>
  tick(INITIAL_STATE, computer)

// Initialize the Intcode computer by overriding the value at index 0 as
// expected:
// > Memory address 0 represents the number of quarters that have been inserted;
// > set it to 2 to play for free.
export const initComputer = (input: string): Intcode =>
  new Intcode(input).updateMemory(0, 2)

export const draw = (input: string): State => {
  const computer = initComputer(input)
  let state = getInitialState(computer)

  while (!computer.hasHalted()) {
    state = tick(state, computer.setInput(getInput(state)))
  }

  return state
}
