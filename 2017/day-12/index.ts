import $ from '../../helpers'

export const run = (input: string[]): [number, number] => {
  const graph = new Map()

  input.forEach(line => {
    const [leftNode, ...rightNodes] = line.match(/\d+/g).map(Number)
    const gLeft = graph.get(leftNode) || new Set()

    rightNodes.forEach(rightNode => {
      const gRight = graph.get(rightNode) || new Set()
      gLeft.add(rightNode)
      gRight.add(leftNode)
      graph.set(leftNode, gLeft)
      graph.set(rightNode, gRight)
    })
  })

  const walk = (node: number, visited: number[] = []) => {
    if (visited.includes(node)) return []
    visited.push(node)
    graph.get(node).forEach((connection: number) => walk(connection, visited))
    return visited
  }

  const groups = []
  const visited = []

  Array.from(graph.keys()).forEach(key => {
    if (visited.includes(key)) return
    const group = walk(key)
    visited.push(...group)
    groups.push(group)
  })

  return [walk(0).length, groups.length]
}
