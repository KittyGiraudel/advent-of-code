const countOccurrences = require('../../helpers/countOccurrences')

const createNode = cave => ({
  size: cave === cave.toLowerCase() ? 'SMALL' : 'BIG',
  siblings: new Set(),
})

const createGraph = connections => {
  const map = {}

  connections.forEach(connection => {
    const [a, b] = connection.split('-')

    if (!(a in map)) map[a] = createNode(a)
    if (!(b in map)) map[b] = createNode(b)

    map[a].siblings.add(b)
    map[b].siblings.add(a)
  })

  return map
}

const computePaths = (graph, cave, withDuplicate = false, path = []) => {
  const { size, siblings } = graph[cave]

  // Part 1: no double-visit allowed.
  if (!withDuplicate) {
    // If the cave is a small cave but has already been visited, consider the
    // path invalid and end there.
    if (size === 'SMALL' && path.includes(cave)) return []
  }

  // Part 2: double-visit allowed.
  else if (size === 'SMALL') {
    // If the cave is the start of the end of the path, only add it if it hasn’t
    // been added yet, otherwise return as the path is invalid.
    if (['start', 'end'].includes(cave)) {
      if (path.includes(cave)) return []
    } else {
      const occurrences = countOccurrences(path)
      const smallCaves = path.filter(cave => graph[cave].size === 'SMALL')
      const hasDuplicate = smallCaves.some(cave => occurrences[cave] > 1)

      // Prevent adding the current cave if:
      // - the cave has already been visited
      // - *and* there was already a small cave visited twice somewhere in the
      // path (and therefore cannot be another one).
      if (path.includes(cave) && hasDuplicate) return []
    }
  }

  // If we have reached the end case, record the current path as a valid one.
  if (cave === 'end') return [[...path, cave]]

  // Otherwise, iterate over siblings, and recursively pursue the paths.
  return Array.from(siblings).reduce(
    (acc, sibling) => [
      ...acc,
      ...computePaths(graph, sibling, withDuplicate, [...path, cave]),
    ],
    []
  )
}

const findPaths = (connections, withDuplicate = false) =>
  computePaths(createGraph(connections), 'start', withDuplicate)

module.exports = { findPaths }
