/**
 * Group an array of objects by a certain key.
 */
const groupBy = <T extends Record<string, unknown>>(
  array: T[],
  key: string
) => {
  return array.reduce<Record<string, T[]>>((acc, item) => {
    const value = item[key] as string
    ;(acc[value] = acc[value] || []).push(item)
    return acc
  }, {})
}

export default groupBy
