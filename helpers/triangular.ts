/**
 * Get the triangular number for the given upper bound, that is the sum of all
 * numbers from 1 to itself.
 * @example triangular(3) === 6
 */
const triangular = (upper: number): number => (upper * (1 + upper)) / 2

export default triangular
