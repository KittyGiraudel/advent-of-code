import { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Return the manhattan distance between two sets of coordinates, expressed
 * as arrays of numbers.
 * @param a - First set of coords
 * @param b - Second set of coords
 * @return {Number}
 */
function manhattan(a: Coords, b: Coords): number
function manhattan(a: TriCoords, b: TriCoords): number
function manhattan(a: QuadriCoords, b: QuadriCoords): number
function manhattan(a: number[], b: number[]): number {
  if (a.length === 4) {
    b = b ?? [0, 0, 0, 0]
    return (
      Math.abs(b[0] - a[0]) +
      Math.abs(b[1] - a[1]) +
      Math.abs(b[2] - a[2]) +
      Math.abs(b[3] - a[3])
    )
  }

  if (a.length === 3) {
    b = b ?? [0, 0, 0]
    return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]) + Math.abs(b[2] - a[2])
  }

  b = b ?? [0, 0]
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1])
}

export default manhattan
