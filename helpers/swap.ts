// Swap the values at indices a and b in given array.
const swap = <T>(array: T[], a: number, b: number): T[] => {
  ;[array[a], array[b]] = [array[b], array[a]]
  return array
}

export default swap
