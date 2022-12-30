// Zip several arrays into one by matching entries by index.
const zip = <Type>(...arrays: Type[][]): Type[][] => {
  const array = arrays[0]
  const others = arrays.slice(1)

  return array.map((val, i) =>
    others.reduce((a, array) => [...a, array[i]], [val])
  )
}

export default zip
