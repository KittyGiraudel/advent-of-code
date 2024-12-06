import $ from '../../helpers'

function pivot<T>(array: T[]) {
  return array[Math.floor(array.length / 2)]
}

const makeMap = (rules: [number, number][]) => {
  const map = new Map<number, Set<number>>()

  rules.forEach(([before, after]) => {
    if (map.has(before)) map.get(before)!.add(after)
    else map.set(before, new Set([after]))
  })

  return map
}

export const run = (
  [rawRules, rawUpdates]: [string, string],
  part2 = false
) => {
  const rules = rawRules.split('\n').map($.numbers) as [number, number][]
  const updates = rawUpdates.split('\n').map($.numbers)
  const map = makeMap(rules)

  const sortUpdate = (update: number[]) =>
    update.sort((a, b) => {
      if (map.get(a)?.has(b)) return +1
      if (map.get(b)?.has(a)) return -1
      return 0
    })

  const isUpdateValid = (update: number[]) => {
    for (let i = 1; i < update.length; i++) {
      const head = update.slice(0, i)
      const shouldBeAfter = Array.from(map.get(update[i]) ?? [])
      if (head.some(v => shouldBeAfter.includes(v))) return false
    }
    return true
  }

  const isUpdateInvalid = (update: number[]) => !isUpdateValid(update)

  return $.sum(
    (part2
      ? updates.filter(isUpdateInvalid).map(sortUpdate)
      : updates.filter(isUpdateValid)
    ).map(pivot)
  )

  /*

  const map = new Map<number, Set<number>>()

  rules.forEach(([before, after]) => {
    if (map.has(before)) map.get(before)!.add(after)
    else map.set(before, new Set([after]))
  })

  const d: Record<string, string> = {}
  for (const [key, value] of map) {
    d[key] = Array.from(value).join(' ')
  }
  console.log(d)

  const order: number[] = []

  function findLonely<K, V>(map: Map<K, V>) {
    for (const [key, value] of map) {
      if (value.size === 1) return key
    }
  }

  while (map.size > 0) {
    const nextKey = findLonely(map)
    if (nextKey === undefined) break

    const nextValue = map.get(nextKey)
    if (nextValue === undefined) break

    const value = Array.from(nextValue)[0]
    order.unshift(value)

    for (const [key, values] of map) {
      values.delete(value)
      if (values.size === 0) {
        if (map.size === 1) order.unshift(key)
        map.delete(key)
      }
    }
  }

  //  = 97 75 47 61 53 29 13
  // -> 75 47 61 53 29

  const validUpdates = updates.filter(update => {
    const filteredOrder = order.filter(v => update.includes(v))
    return filteredOrder.join(' ') === update.join(' ')
  })

  return $.sum(validUpdates.map(pivot))
  */
}
