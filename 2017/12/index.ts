import $ from '../../helpers'

export const run = (input: string[], part2 = false) => {
  const graph = new Map<number, Set<number>>()

  input.forEach(line => {
    const [leftNode, ...rightNodes] = $.numbers(line)
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
    graph.get(node)!.forEach(connection => walk(connection, visited))
    return visited
  }

  if (!part2) return walk(0).length

  const visited: number[] = []
  let groups = 0

  Array.from(graph.keys()).forEach(key => {
    if (visited.includes(key)) return
    visited.push(...walk(key))
    groups++
  })

  return groups
}
