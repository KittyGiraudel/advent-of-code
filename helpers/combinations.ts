// Return all possible unique combinations of size `n` from given `array`.
const combinations = <Type>(
  array: Type[],
  n: number,
  start = [],
  tmp = []
): Type[][] =>
  array.reduce((acc, item, index, array) => {
    if (n > 1) {
      tmp.push(item)
      combinations(array.slice(index + 1), n - 1, acc, tmp)
    } else {
      acc.push((tmp.push(item), tmp).slice(0))
    }

    tmp.pop()

    return acc
  }, start)

export default combinations