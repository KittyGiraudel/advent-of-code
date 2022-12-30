// Return the median value for the given numbers.
const median = (values: number[]): number => {
  values = values.slice(0).sort((a, b) => a - b)

  const half = Math.floor(values.length / 2)

  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2
}

export default median
