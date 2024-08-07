import $ from '../../helpers'

type Node = {
  small: boolean
  siblings: Set<string>
}
type Graph = Record<string, Node>

const createNode = (cave: string) =>
  ({
    small: cave === cave.toLowerCase(),
    siblings: new Set(),
  }) as Node

const createGraph = (connections: string[]) => {
  const map: Graph = {}

  connections.forEach(connection => {
    const [a, b] = connection.split('-')

    if (!(a in map)) map[a] = createNode(a)
    if (!(b in map)) map[b] = createNode(b)

    map[a].siblings.add(b)
    map[b].siblings.add(a)
  })

  return map
}

const getPaths = (
  graph: Graph,
  cave: string,
  withDuplicate = false,
  path: string[] = []
): string[][] => {
  const { small, siblings } = graph[cave]

  // If we have reached the end case, record the current path as a valid one.
  if (cave === 'end') return [[...path, cave]]

  if (small) {
    // Part 1: no double-visit allowed. If the cave has already been visited or
    // is the start, consider the path invalid and end there.
    if ((!withDuplicate || cave === 'start') && path.includes(cave)) return []
    // Part 2: double-visit allowed. Prevent adding the current cave if:
    // - the cave has already been visited
    // - *and* there was already a small cave visited twice somewhere in the
    // path (and therefore cannot be another one).
    else if (withDuplicate) {
      const occurrences = $.frequency(path)
      const hasDuplicate = path
        .filter(cave => graph[cave].small)
        .some(cave => occurrences[cave] > 1)

      if (path.includes(cave) && hasDuplicate) return []
    }
  }

  // Otherwise, iterate over siblings, and recursively pursue the paths.
  return Array.from(siblings).reduce<string[][]>(
    (acc, sibling) =>
      acc.concat(getPaths(graph, sibling, withDuplicate, [...path, cave])),
    []
  )
}

export const run = (connections: string[], part2 = false) =>
  getPaths(createGraph(connections), 'start', part2)
