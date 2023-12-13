import { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Return a new array with the value at given index updated with the given
 * value.
 */
function updateAtIndex(string: string, index: number, value: string): string
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
  input: string | Coords | TriCoords | QuadriCoords | T[],
  index: number,
  value: string | number | T
) {
  const next = [...input.slice(0, index), value, ...input.slice(index + 1)]
  return typeof input === 'string' ? next.join('') : next
}

export default updateAtIndex
