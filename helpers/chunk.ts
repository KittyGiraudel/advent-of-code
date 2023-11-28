const _chunk = <T>(
  sliceable: string | T[],
  size: number
): Array<string | T[]> => {
  const result = []

  for (let i = 0; i < sliceable.length; i += size)
    result.push(sliceable.slice(i, i + size))

  return result
}

/**
 * Split the given array into chunks of the given size.
 */
const chunk = <T>(array: T[], size: number): T[][] =>
  _chunk(array, size) as T[][]

/**
 * Split the given string into chunks of the given size.
 */
chunk.string = (string: string, size: number): string[] =>
  _chunk(string, size) as string[]

export default chunk
