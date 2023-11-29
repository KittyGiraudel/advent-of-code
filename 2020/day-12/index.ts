import $ from '../../helpers'

const DIRECTIONS = {
  N: { R: 'E', L: 'W' },
  E: { R: 'S', L: 'N' },
  S: { R: 'W', L: 'E' },
  W: { R: 'N', L: 'S' },
}

// rotate the ship based on the current orientation and the given operation.
// @param orientation - Current ship orientation
// @param direction - Whether to rotate left or right
// @param degrees - By how many degrees to rotate
const rotate = (
  orientation: string,
  direction: string,
  degrees: number
): string => {
  for (let i = 0; i < degrees / 90; i++)
    orientation = DIRECTIONS[orientation][direction]
  return orientation
}

// Navigate the ship while following the loose instructions.
// @param instructions - List of instructions
// @param orientation - Initial orientation
// @return Manatthan distance
export const navigateLoose = (
  instructions: Array<string>,
  orientation: string = 'E'
): number =>
  $.sum(
    instructions.reduce(
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
  )

// Navigate the ship while following the strict instructions regarding the
// waypoint.
// @param instructions - List of instructions
// @return Manatthan distance
export const navigateStrict = (instructions: Array<string>): number =>
  $.sum(
    instructions.reduce(
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
    ).ship
  )
