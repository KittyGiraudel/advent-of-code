const sum = require('../../helpers/sum')

const createGraph = lines => {
  const map = new Map()

  lines.forEach(line => {
    const [orbited, orbiting] = line.split(')')
    if (!map.has(orbiting)) map.set(orbiting, new Set())
    if (!map.has(orbited)) map.set(orbited, new Set())
    map.set(orbited, map.get(orbited).add(orbiting))
    map.set(orbiting, map.get(orbiting).add(orbited))
  })

  return map
}

const getPaths = (graph, curr, end = 'COM', path = []) => {
  if (curr === end) return [[...path, curr]]
  if (path.includes(curr)) return []
  return Array.from(graph.get(curr)).reduce(
    (acc, sibling) =>
      acc.concat(getPaths(graph, sibling, end, [...path, curr])),
    []
  )
}

const countOrbits = graph =>
  Array.from(graph.keys()).reduce(
    (total, key) =>
      total + sum(getPaths(graph, key, 'COM').map(path => path.length - 1)),
    0
  )

const countTransfers = (graph, start = 'YOU', end = 'SAN') =>
  getPaths(graph, start, end)[0].length - 3

module.exports = { getPaths, createGraph, countOrbits, countTransfers }
