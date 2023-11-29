const _chunk = <T>(sliceable: string | Array<T>, size: number) => {
  const result = []

  for (let i = 0; i < sliceable.length; i += size)
    result.push(sliceable.slice(i, i + size))

  return result
}

/**
 * Split the given array into chunks of the given size.
 */
const chunk = <T>(array: Array<T>, size: number) =>
  _chunk(array, size) as Array<Array<T>>

/**
 * Split the given string into chunks of the given size.
 */
chunk.string = (string: string, size: number) =>
  _chunk(string, size) as Array<string>

export default chunk
