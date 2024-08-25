/**
 * Retrieve the maximum value from the list of values without risking a
 * “Maximum callstack exceeded” error
 * @param values - Numbers to get the maximum value from
 */
const max = (values: number[]) =>
  values.reduce((max, v) => (max >= v ? max : v), Number.NEGATIVE_INFINITY)

export default max
