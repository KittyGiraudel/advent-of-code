/**
 * Group an array of objects by a certain key.
 */
const groupBy = <T>(array: Array<T>, key: string) => {
  return array.reduce(function (acc, item) {
    ;(acc[item[key]] = acc[item[key]] || []).push(item)
    return acc
  }, {} as Record<string, Array<T>>)
}

export default groupBy
