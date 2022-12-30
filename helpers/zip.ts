// Zip several arrays into one by matching entries by index.
const zip = <T>(...arrays: T[][]): T[][] => {
  const array = arrays[0]
  const others = arrays.slice(1)

  return array.map((val, i) =>
    others.reduce((a, array) => [...a, array[i]], [val])
  )
}

export default zip
