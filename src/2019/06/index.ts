import $ from '../../helpers'

type Graph = Map<string, Set<string>>

export const createGraph = (lines: string[]) => {
  const map: Graph = new Map()

  lines.forEach(line => {
    const [orbited, orbiting] = line.split(')')
    if (!map.has(orbiting)) map.set(orbiting, new Set<string>())
    if (!map.has(orbited)) map.set(orbited, new Set<string>())
    map.set(orbited, map.get(orbited)!.add(orbiting))
    map.set(orbiting, map.get(orbiting)!.add(orbited))
  })

  return map
}

export const getPaths = (
  graph: Graph,
  curr: string,
  end = 'COM',
  path: string[] = []
): string[][] => {
  if (curr === end) return [path]
  if (path.includes(curr)) return []
  return Array.from(graph.get(curr)!).reduce<string[][]>(
    (acc, next) => acc.concat(getPaths(graph, next, end, [...path, curr])),
    []
  )
}

export const countOrbits = (graph: Graph, to = 'COM') => {
  return Array.from(graph.keys()).reduce(
    (orbits, key) =>
      orbits +
      $.search
        .bfs({
          start: key,
          isGoal: curr => curr === to,
          getNext: curr => Array.from(graph.get(curr)!),
        })
        .getPath().length,
    0
  )

  // This is my original version, which recursively walks the graph. It is
  // incredibly slower than the newer version using the BFS utility though
  // (11s vs. <1s).
  /*
  return Array.from(graph.keys()).reduce(
    (total, key) =>
      total + $.sum(getPaths(graph, key, 'COM').map(path => path.length)),
    0
  )
  */
}

export const countTransfers = (graph: Graph, start = 'YOU', end = 'SAN') => {
  // This is the original version, which is much slower.
  // const [path] = getPaths(graph, start, end)

  // Drop the 2 extremities as they shouldn’t count in the amount of transfers.
  return (
    $.search
      .bfs({
        start,
        isGoal: curr => curr === end,
        getNext: curr => Array.from(graph.get(curr)!),
      })
      .getPath().length - 2
  )
}
