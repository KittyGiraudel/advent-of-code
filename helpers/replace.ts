import { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Return a new array with the value at given index updated with the given
 * value.
 */
function replace(input: string, index: number, value: string): typeof input
function replace(input: Coords, index: number, value: number): typeof input
function replace(input: TriCoords, index: number, value: number): typeof input
function replace(
  input: QuadriCoords,
  index: number,
  value: number
): typeof input
function replace<T>(input: T[], index: number, value: T): typeof input
function replace<T>(
  input: string | Coords | TriCoords | QuadriCoords | T[],
  index: number,
  value: string | number | T
): typeof input {
  if (typeof input === 'string') {
    return [...input.slice(0, index), value, ...input.slice(index + 1)].join('')
  }

  return [
    ...input.slice(0, index),
    value,
    ...input.slice(index + 1),
  ] as typeof input
}

export default replace
