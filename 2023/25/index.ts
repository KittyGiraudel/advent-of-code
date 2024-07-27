const pick = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)]
const stringify = (set?: Set<string>) => (set ? Array.from(set).join(',') : '')

export const run = (input: string[]) => {
  const values: string[] = []
  const pairs: [string, string][] = []

  input.forEach(line => {
    const [left, ...rest] = line.replace(':', ' ').split(/\s+/)
    if (!values.includes(left)) values.push(left)
    rest.forEach(right => {
      if (!values.includes(right)) values.push(right)
      pairs.push([left, right])
    })
  })

  const sets = values.map(value => new Set([value]))

  const reduceGraph = () => {
    const subsets = structuredClone(sets)

    while (subsets.length > 2) {
      const [nodeL, nodeR] = pick(pairs)
      const indexL = subsets.findIndex(set => set.has(nodeL))
      const indexR = subsets.findIndex(set => set.has(nodeR))

      if (stringify(subsets[indexL]) !== stringify(subsets[indexR])) {
        subsets[indexR].forEach(value => subsets[indexL].add(value))
        subsets.splice(indexR, 1)
      }
    }

    return subsets as [Set<string>, Set<string>]
  }

  let groups: [Set<string>, Set<string>] = [
    new Set<string>(),
    new Set<string>(),
  ]

  while (true) {
    groups = reduceGraph()

    const bridges = pairs.filter(
      ([left, right]) =>
        stringify(groups.find(set => set.has(left))) !==
        stringify(groups.find(set => set.has(right)))
    )

    if (bridges.length < 4) break
  }

  return groups[0].size * groups[1].size
}
