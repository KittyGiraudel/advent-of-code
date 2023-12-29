import { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Return a new array with the value at given index updated with the given
 * value.
 */
function replace(string: string, index: number, value: string): string
function replace<T>(array: T[], index: number, value: T): T[]
function replace(coords: Coords, index: number, value: number): Coords
function replace(coords: TriCoords, index: number, value: number): TriCoords
function replace(
  coords: QuadriCoords,
  index: number,
  value: number
): QuadriCoords
function replace<T>(
  input: string | Coords | TriCoords | QuadriCoords | T[],
  index: number,
  value: string | number | T
) {
  const next = [...input.slice(0, index), value, ...input.slice(index + 1)]
  return typeof input === 'string' ? next.join('') : next
}

export default replace
