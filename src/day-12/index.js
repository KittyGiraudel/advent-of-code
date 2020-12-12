const DIRECTIONS = {
  N: { R: 'E', L: 'W' },
  E: { R: 'S', L: 'N' },
  S: { R: 'W', L: 'E' },
  W: { R: 'N', L: 'S' },
}

// rotate the ship based on the current orientation and the given operation.
// @param {String} orientation - Current ship orientation
// @param {String} direction - Whether to rotate left or right
// @param {String} degrees - By how many degrees to rotate
// @return {String}
const rotate = (orientation, direction, degrees) => {
  for (let i = 0; i < degrees / 90; i++)
    orientation = DIRECTIONS[orientation][direction]
  return orientation
}

// Navigate the ship while following the loose instructions.
// @param {String[]} instructions - List of instructions
// @param {String} orientation - Initial orientation
// @return {Number} Manatthan distance
const navigateLoose = (instructions, orientation = 'E') =>
  instructions
    .reduce(
      (coords, instruction) => {
        const operation = instruction.slice(0, 1)
        const value = Number(instruction.slice(1))

        if (operation === 'N' || (operation === 'F' && orientation === 'N'))
          coords[1] -= value
        if (operation === 'S' || (operation === 'F' && orientation === 'S'))
          coords[1] += value
        if (operation === 'W' || (operation === 'F' && orientation === 'W'))
          coords[0] -= value
        if (operation === 'E' || (operation === 'F' && orientation === 'E'))
          coords[0] += value
        if (operation === 'L' || operation === 'R')
          orientation = rotate(orientation, operation, value)
        return coords
      },
      [0, 0]
    )
    .reduce((a, b) => a + b, 0)

// Navigate the ship while following the strict instructions regarding the
// waypoint.
// @param {String[]} instructions - List of instructions
// @return {Number} Manatthan distance
const navigateStrict = instructions =>
  instructions
    .reduce(
      ({ ship, waypoint }, instruction) => {
        const operation = instruction.slice(0, 1)
        const value = Number(instruction.slice(1))

        if (operation === 'N') waypoint[1] -= value
        if (operation === 'S') waypoint[1] += value
        if (operation === 'W') waypoint[0] -= value
        if (operation === 'E') waypoint[0] += value
        if (operation === 'L' || operation === 'R') {
          for (let i = 0; i < value / 90; i++) {
            const [x, y] = waypoint
            waypoint[0] = operation === 'R' ? y * -1 : y
            waypoint[1] = operation === 'R' ? x : x * -1
          }
        }
        if (operation === 'F') {
          ship[0] += waypoint[0] * value
          ship[1] += waypoint[1] * value
        }

        return { ship, waypoint }
      },
      { ship: [0, 0], waypoint: [10, -1] }
    )
    .ship.reduce((a, b) => a + b, 0)

module.exports = { navigateLoose, navigateStrict }
