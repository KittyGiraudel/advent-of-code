/**
 * Count the occurrences of every item in the given array and return an object
 * mapping items to their count.
 */
const frequency = <T>(array: T[]) =>
  array.reduce<Record<string, number>>((acc, curr) => {
    const key = String(curr)
    if (key in acc) acc[key]++
    else acc[key] = 1
    return acc
  }, {})

export default frequency
