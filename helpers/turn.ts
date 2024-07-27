import type { Coords } from '../types'

const DIRECTIONS: [Coords, Coords, Coords, Coords] = [
  /* N */ [-1, 0],
  /* E */ [0, +1],
  /* S */ [+1, 0],
  /* W */ [0, -1],
]

const turnLeft = (
  direction: Coords,
  directions: [Coords, Coords, Coords, Coords] = DIRECTIONS
): Coords => {
  const index = directions.indexOf(direction)

  return index === 0 ? directions[directions.length - 1] : directions[index - 1]
}

const turnRight = (
  direction: Coords,
  directions: [Coords, Coords, Coords, Coords] = DIRECTIONS
): Coords => {
  const index = directions.indexOf(direction)

  return index === directions.length - 1 ? directions[0] : directions[index + 1]
}

export default { left: turnLeft, right: turnRight, DIRECTIONS }
