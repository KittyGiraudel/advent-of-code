/**
 * Group an array of objects by a certain key.
 */
const groupBy = <T>(array: T[], key: string) => {
  return array.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {} as Record<string, T[]>)
}

export default groupBy
