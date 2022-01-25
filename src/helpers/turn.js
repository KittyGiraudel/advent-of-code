const peek = require('./peek')

const DIRECTIONS = [
  /* N */ [0, -1],
  /* E */ [+1, 0],
  /* S */ [0, +1],
  /* W */ [-1, 0],
]

const turnLeft = (direction, directions = DIRECTIONS) => {
  const index = directions.indexOf(direction)

  return index === 0 ? peek(directions) : directions[index - 1]
}

const turnRight = (direction, directions = DIRECTIONS) => {
  const index = directions.indexOf(direction)

  return index === directions.length - 1 ? directions[0] : directions[index + 1]
}

module.exports = { left: turnLeft, right: turnRight, DIRECTIONS }
