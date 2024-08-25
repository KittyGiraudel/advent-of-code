/**
 * Sum all values in array, starting with initial value.
 * @param values - Numbers to sum together
 * @example sum([1, 2, 4]) === 7
 */
const sum = (values: number[]) => values.reduce((a, b) => a + b, 0)

export default sum
