import $ from '../../helpers'
import { findMatches } from '../01'

// Find the first number in `input` which cannot be obtained by summing 2
// numbers in its preamble (`size` previous numbers).
// @param input - Array of numbers
// @param size - Size of the preamble
export const findWeakness = (input: number[], size: number = 25) =>
  input.find(
    (number, index, array) =>
      index >= size && !findMatches(array.slice(index - size, index), 2, number)
  )

// Find a contiguous set of at least two numbers whose sum is equal to the
// input’s weakness, and sum the lowest and highest numbers of this set.
// See: https://github.com/constb/aoc2020/blob/main/09/index2.js#L20
// @param input - Array of numbers
// @param size - Size of the preamble
export const breakWeakness = (input: number[], size: number = 25) => {
  const weakness = findWeakness(input, size)!
  const range = [0, 1]

  while (range[1] < input.length) {
    const slice = input.slice(...range)
    const total = $.sum(slice)

    if (total === weakness) return Math.min(...slice) + Math.max(...slice)
    else if (total > weakness) range[0]++
    else range[1]++
  }

  return null
}
