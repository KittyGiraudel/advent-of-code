const binarySearch = (lower, upper, compare) => {
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

module.exports = binarySearch
