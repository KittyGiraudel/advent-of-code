/**
 * Group an array of objects by a certain key.
 */
const groupBy = <T>(array: T[], key: string) => {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    ;(acc[(item as Record<string, any>)[key]] =
      acc[(item as Record<string, any>)[key]] || []).push(item)
    return acc
  }, {})
}

export default groupBy
