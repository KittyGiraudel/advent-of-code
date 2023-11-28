/**
 * Return the product of all values in array, starting with initial value.
 * @example sum([1, 2, 4]) === 8
 */
const product = (array: number[], init: number = 1): number =>
  array.reduce((a, b) => a * b, init)

export default product
