/**
 * Return all possible unique combinations of size `n` from given `array`.
 */
function combinations<T>(
  array: T[],
  n: number,
  start: T[][] = [],
  tmp: T[] = []
): T[][] {
  return array.reduce<T[][]>((acc, item, index, array) => {
    if (n > 1) {
      tmp.push(item)
      combinations(array.slice(index + 1), n - 1, acc, tmp)
    } else {
      tmp.push(item)
      acc.push(tmp.slice(0))
    }

    tmp.pop()

    return acc
  }, start)
}

export default combinations
