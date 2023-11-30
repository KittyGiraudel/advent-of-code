import { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Return a new array with the value at given index updated with the given
 * value.
 */
function updateAtIndex<T>(array: T[], index: number, value: T): T[]
function updateAtIndex(coords: Coords, index: number, value: number): Coords
function updateAtIndex(
  coords: TriCoords,
  index: number,
  value: number
): TriCoords
function updateAtIndex(
  coords: QuadriCoords,
  index: number,
  value: number
): QuadriCoords
function updateAtIndex<T>(
  array: Coords | TriCoords | QuadriCoords | T[],
  index: number,
  value: number | T
) {
  return [...array.slice(0, index), value, ...array.slice(index + 1)]
}

export default updateAtIndex
