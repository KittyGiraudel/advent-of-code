type Sliceable<T> = string | T[]

// Split the given array into chunks of the given size.
const chunk = <T>(array: Sliceable<T>, size: number): Sliceable<T>[] => {
  const result: Sliceable<T>[] = []

  for (let i = 0; i < array.length; i += size)
    result.push(array.slice(i, i + size))

  return result
}

export default chunk
