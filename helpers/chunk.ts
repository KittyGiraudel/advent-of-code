// Split the given array into chunks of the given size.
const chunk = <Sliceable extends U[] | string, U>(
  array: Sliceable,
  size: number
): (U[] | string)[] => {
  const result = []

  for (let i = 0; i < array.length; i += size)
    result.push(array.slice(i, i + size))

  return result
}

export default chunk
