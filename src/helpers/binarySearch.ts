/**
 * Perform a binary search between the lower and upper bounds, using the compare
 * function.
 * @param lower - Initial lower bound
 * @param upper - Initial upper bound
 * @param compare - Comparison function
 */
const binarySearch = (
  lower: number,
  upper: number,
  compare: (n: number) => number
) => {
  while (lower <= upper) {
    const half = Math.round((lower + upper) / 2)
    const comparison = compare(half)

    if (lower === upper) break

    if (comparison > 0) lower = half + 1
    else if (comparison < 0) upper = half - 1
    else break
  }

  return lower
}

export default binarySearch
