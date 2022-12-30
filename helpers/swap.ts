// Swap the values at indices a and b in given array.
const swap = <Type>(array: Type[], a: number, b: number): Type[] => {
  ;[array[a], array[b]] = [array[b], array[a]]
  return array
}

export default swap
