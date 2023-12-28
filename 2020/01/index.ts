import $ from '../../helpers'

// Find set of `size` items from `input` array summing to expectation.
// @param numbers - Array of numbers
// @param size - Amount of items whose sum is the expectation
// @param expectation - Number to find
export const findMatches = (
  numbers: number[],
  size: number,
  expectation: number = 2020
) => $.combinations(numbers, size).find(set => $.sum(set) === expectation)!
