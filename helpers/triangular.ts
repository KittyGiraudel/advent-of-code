// Get the triangular number for the given upper bound, that is the sum of all
// numbers from 1 to itself. For instance, `triangular(3)` returns 6.
const triangular = (upper: number): number => (upper * (1 + upper)) / 2

export default triangular
