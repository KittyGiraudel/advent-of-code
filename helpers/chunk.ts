const _chunk = <Type>(
  sliceable: string | Type[],
  size: number
): Array<string | Type[]> => {
  const result = []

  for (let i = 0; i < sliceable.length; i += size)
    result.push(sliceable.slice(i, i + size))

  return result
}

// Split the given array into chunks of the given size.
const chunk = <Type>(array: Type[], size: number): Type[][] =>
  _chunk(array, size) as Type[][]

// Split the given string into chunks of the given size.
chunk.string = (string: string, size: number): string[] =>
  _chunk(string, size) as string[]

export default chunk
