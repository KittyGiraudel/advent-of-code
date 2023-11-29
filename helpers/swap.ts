/**
 * Swap the values at indices a and b in given array in a **mutative** way.
 */
const swap = <T>(array: T[], a: number, b: number) => {
  ;[array[a], array[b]] = [array[b], array[a]]
  return array
}

export default swap
