import { Coords } from '../../types'

export const run = ([row, col]: Coords) => {
  let curr = 20151125
  let diagonal = 1

  // The grid is filled diagonally, so iterate over the diagonals endlessly
  // until the right cell has been found.
  while (diagonal++) {
    // Iterate on the current diagonal to compute the next value.
    for (let i = 0; i < diagonal; i++) {
      curr = (curr * 252533) % 33554393
      // If we’re on the target, return the value.
      if (diagonal - i === row && i + 1 === col) return curr
    }
  }
}
