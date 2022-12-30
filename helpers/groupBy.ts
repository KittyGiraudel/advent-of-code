// Group an array of objects by a certain key.
const groupBy = <T>(array: T[], key: string): { [key: string]: T[] } => {
  return array.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export default groupBy
