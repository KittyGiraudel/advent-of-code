// Return a new array with the value at given index updated with the given
// value.
const updateAtIndex = <Type>(
  array: Type[],
  index: number,
  value: Type
): Type[] => [...array.slice(0, index), value, ...array.slice(index + 1)]

export default updateAtIndex
