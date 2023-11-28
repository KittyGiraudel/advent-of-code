/**
 * Return a generator that loops between the given minimum and maximum value
 * (both included).
 */
function* loopIndex(min: number, max: number): Generator<number> {
  let index = min
  while (true) {
    yield index++
    if (index > max) index = min
  }
}

export default loopIndex
