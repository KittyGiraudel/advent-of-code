/**
 * Count the occurrences of every item in the given array or given stirng and
 * return an object mapping items/characters to their count.
 */
function frequency(input: string): Record<string, number>
function frequency<T>(input: T[]): Record<string, number>
function frequency<T>(input: string | T[]): Record<string, number> {
  const array = Array.isArray(input) ? input : Array.from(input)
  const frequencies = array.reduce<Record<string, number>>((acc, curr) => {
    const key = String(curr)
    if (key in acc) acc[key]++
    else acc[key] = 1
    return acc
  }, {})

  return frequencies
}

export default frequency
