export const run = (input: string[], part2 = false) => {
  const network: Record<string, string[]> = {}

  input.forEach(line => {
    const [a, b] = line.split('-')
    if (!(a in network)) network[a] = []
    if (!(b in network)) network[b] = []
    network[a].push(b)
    network[b].push(a)
  })

  const sets: Set<string> = new Set()

  Object.entries(network).forEach(([computer, neighbors]) => {
    for (let i = 0; i < neighbors.length - 1; i++)
      for (let j = i + 1; j < neighbors.length; j++)
        if (network[neighbors[i]].includes(neighbors[j]))
          sets.add([computer, neighbors[i], neighbors[j]].sort().join('-'))
  })

  if (part2) {
    const cliques = Array.from(bronKerbosch(network))
    const maxSize = Math.max(...cliques.map(clique => clique.size))
    const clique = cliques.find(clique => clique.size === maxSize)!
    return Array.from(clique).sort().join(',')
  }

  return Array.from(sets)
    .map(set => set.split('-'))
    .filter(set => Array.from(set).some(node => node.startsWith('t'))).length
}

// No idea how any of this works. Graph theory isn’t my thing.
// See: https://www.reddit.com/r/adventofcode/comments/1hkgj5b/comment/m3ntkp7/
// See: https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
// algorithm BronKerbosch1(R, P, X) is
//   if P and X are both empty then
//     report R as a maximal clique
//   for each vertex v in P do
//     BronKerbosch1(R ⋃ {v}, P ⋂ N(v), X ⋂ N(v))
//     P := P \ {v}
//     X := X ⋃ {v}
function* bronKerbosch(
  network: Record<string, string[]>,
  r = new Set<string>(),
  p = new Set([...Object.keys(network)]),
  x = new Set<string>()
): Generator<Set<string>> {
  if (!p.size && !x.size) {
    yield r
  } else {
    const [u] = [...p, ...x]
    for (const v of p) {
      if (!network[u].includes(v)) {
        const cliques = bronKerbosch(
          network,
          new Set([...r, v]),
          new Set(Array.from(p).filter(n => network[v].includes(n))),
          new Set(Array.from(x).filter(n => network[v].includes(n)))
        )
        for (const c of cliques) yield c
        p.delete(v)
        x.add(v)
      }
    }
  }
}
