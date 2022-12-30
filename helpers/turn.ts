import { Coords } from '../types'

const DIRECTIONS: [Coords, Coords, Coords, Coords] = [
  /* N */ [0, -1],
  /* E */ [+1, 0],
  /* S */ [0, +1],
  /* W */ [-1, 0],
]

const turnLeft = (
  direction: Coords,
  directions: [Coords, Coords, Coords, Coords] = DIRECTIONS
): Coords => {
  const index = directions.indexOf(direction)

  return index === 0 ? directions.at(-1) : directions[index - 1]
}

const turnRight = (
  direction: Coords,
  directions: [Coords, Coords, Coords, Coords] = DIRECTIONS
): Coords => {
  const index = directions.indexOf(direction)

  return index === directions.length - 1 ? directions[0] : directions[index + 1]
}

export default { left: turnLeft, right: turnRight, DIRECTIONS }
