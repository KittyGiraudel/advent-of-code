import $ from '../../helpers'

type Node = {
  name?: string
  value: number
  children: string[]
  weight?: number
}

type Fix = {
  name: string
  weight: number
  diff: number
  node: Node | null
}

type Graph = Record<string, Node>

const getRootNode = (graph: Graph) => {
  const values = Object.values(graph).reduce<string[]>(
    (acc, arr) => acc.concat(arr.children),
    []
  )

  return Object.keys(graph).find(key => !values.includes(key))
}

const parseLine = (line: string) => {
  const [, name, value, rest] = $.match(line, /(\w+) \((\d+)\)(?: -> ([^)]+))?/)
  const children = rest?.split(', ') ?? []

  return { name, value: +value, children: children } as Node
}

export const run = (input: string[]) => {
  const graph: Graph = {}

  input.forEach(line => {
    const { name, ...node } = parseLine(line)
    if (!name) return
    if (!(name in graph)) {
      graph[name] = node
    } else if (node.children.length) {
      graph[name].children.push(...node.children)
    }
  })

  const sum = ({ value, children }: Node): number =>
    children.reduce((acc, child) => acc + sum(graph[child]), value)

  // Recursively walk the graph to compute the total weight of each node, by
  // drilling through their children and summing their weight.
  for (const key in graph) {
    graph[key].weight = sum(graph[key])
  }

  const fix: Fix = {
    name: '',
    weight: Number.POSITIVE_INFINITY,
    diff: 0,
    node: null,
  }

  for (const key in graph) {
    const { weight, children: childrenNames } = graph[key]

    if (!childrenNames.length || !weight) continue

    const children = childrenNames.map(name => graph[name])
    const weights = children.map(node => node.weight)
    const incorrect = weights.find((weight, i, a) => a.indexOf(weight) === i)
    const correct = weights.find(weight => weight !== incorrect)

    if (incorrect === undefined || correct === undefined) continue

    // The node is considered unstable if all its children have the same weight
    // but one of them. This is the node that needs to be corrected, *or* the
    // parent of the node that needs to be corrected. When multiple nodes are
    // found to be unstable, we use the one that’s deepest in the tree (since
    // its fix will cascade back up the tree).
    if (fix.weight > weight) {
      fix.weight = weight
      fix.diff = incorrect - correct
      fix.node = children.find(node => node.weight === incorrect)!
    }
  }

  if (!fix.node) {
    throw new Error('Could not find fix node')
  }

  return {
    root: getRootNode(graph),
    fix: fix.node.value - fix.diff,
  }
}
