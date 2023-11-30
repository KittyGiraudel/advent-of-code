import toCoordsObj from './toCoordsObj'
import {
  Coords,
  CoordsObj,
  QuadriCoords,
  QuadriCoordsObj,
  TriCoords,
  TriCoordsObj,
} from '../types'

/**
 * Return the manhattan distance between two sets of coordinates, expressed
 * either as objects with x, y (and possibly z and even t) or arrays of numbers.
 * @param a - First set of coords
 * @param b - Second set of coords
 * @return {Number}
 */
function manhattan(a: Coords, b?: Coords): number
function manhattan(a: TriCoords, b?: TriCoords): number
function manhattan(a: QuadriCoords, b?: QuadriCoords): number
function manhattan(a: CoordsObj, b?: CoordsObj): number
function manhattan(a: TriCoordsObj, b?: TriCoordsObj): number
function manhattan(a: QuadriCoordsObj, b?: QuadriCoordsObj): number
function manhattan(a: any, b: any) {
  a = toCoordsObj(a)
  b = b ? toCoordsObj(b) : b

  if ('t' in a && (!b || 't' in b)) {
    b = toCoordsObj(b ?? [0, 0, 0, 0])
    return (
      Math.abs(b.x - a.x) +
      Math.abs(b.y - a.y) +
      Math.abs(b.z - a.z) +
      Math.abs(b.t - a.t)
    )
  }

  if ('z' in a && (!b || 'z' in b)) {
    b = toCoordsObj(b ?? [0, 0, 0])
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y) + Math.abs(b.z - a.z)
  }

  b = toCoordsObj(b ?? [0, 0])
  return (
    Math.abs((b as CoordsObj).x - (a as CoordsObj).x) +
    Math.abs((b as CoordsObj).y - (a as CoordsObj).y)
  )
}

export default manhattan
