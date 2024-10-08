/**
 * Return the median value for the given numbers.
 * @param values - Numbers to get the median from
 */
const median = (values: number[]) => {
  values = values.slice(0).sort((a, b) => a - b)

  const half = Math.floor(values.length / 2)

  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2
}

export default median
