const $ = require('../../helpers')

const getRootNode = graph => {
  const values = Object.values(graph).reduce(
    (acc, arr) => acc.concat(arr.children),
    []
  )

  return Object.keys(graph).find(key => !values.includes(key))
}

const parseLine = line => {
  const [, name, value, rest] = line.match(/(\w+) \((\d+)\)(?: -> ([^)]+))?/)
  const children = rest?.split(', ') ?? []

  return { name, value: +value, children: children }
}

const run = input => {
  const graph = {}

  input.forEach(line => {
    const { name, ...node } = parseLine(line)

    if (!(name in graph)) {
      graph[name] = node
    } else if (node.children.length) {
      graph[name].children.push(...node.children)
    }
  })

  const sum = ({ value, children }) =>
    children.reduce((acc, child) => acc + sum(graph[child]), value)

  // Recursively walk the graph to compute the total weight of each node, by
  // drilling through their children and summing their weight.
  for (let key in graph) {
    graph[key].weight = sum(graph[key])
  }

  const fix = { name: null, weight: Infinity, diff: 0 }

  for (let key in graph) {
    if (!graph[key].children.length) {
      continue
    }

    const children = graph[key].children.map(name => graph[name])
    const weights = children.map(node => node.weight)
    const incorrect = weights.find((w, i, a) => a.indexOf(w) === i)
    const correct = weights.find(w => w !== incorrect)

    // The node is considered unstable if all its children have the same weight
    // but one of them. This is the node that needs to be corrected, *or* the
    // parent of the node that needs to be corrected. When multiple nodes are
    // found to be unstable, we use the one that’s deepest in the tree (since
    // its fix will cascade back up the tree).
    if (Boolean(correct) && fix.weight > graph[key].weight) {
      fix.weight = graph[key].weight
      fix.diff = incorrect - correct
      fix.node = children.find(node => node.weight === incorrect)
    }
  }

  return {
    root: getRootNode(graph),
    fix: fix.node.value - fix.diff,
  }
}

module.exports = { run }
