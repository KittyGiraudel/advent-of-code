/**
 * Zip several arrays into one by matching entries by index in a non-mutative
 * way.
 */
const zip = <T>(arrays: T[][]) => {
  const array = arrays[0]
  const others = arrays.slice(1)

  return array.map((val, i) =>
    others.reduce((a, array) => [...a, array[i]], [val])
  )
}

export default zip
