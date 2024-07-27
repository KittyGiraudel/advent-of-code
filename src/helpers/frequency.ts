type Frequencies = Record<string, number>

/**
 * Count the occurrences of every item in the given array or given stirng and
 * return an object mapping items/characters to their count.
 */
function frequency(input: string): Frequencies
function frequency<T>(input: T[]): Frequencies
function frequency<T>(input: string | T[]): Frequencies {
  const array = Array.isArray(input) ? input : Array.from(input)
  const keys = array.map(String)
  const frequencies = keys.reduce<Frequencies>(
    (acc, curr) => ({ ...acc, [curr]: (acc[curr] ?? 0) + 1 }),
    {}
  )

  return frequencies
}

export default frequency
