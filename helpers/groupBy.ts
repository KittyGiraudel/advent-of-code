// Group an array of objects by a certain key.
const groupBy = <Type>(array: Type[], key: string): Record<string, Type[]> => {
  return array.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export default groupBy
