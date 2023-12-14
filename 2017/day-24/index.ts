export type Path = { score: number; length: number }

const discard = (set: string[] | Set<string>, value: string) => {
  const next = new Set(set)
  next.delete(value)
  return next
}

// This is faster than `Array.prototype.split` + `Array.prototype.includes`,
// or `String.prototype.search`.
const matches = (port: string, edge: string | number) =>
  port.startsWith(edge + '/') || port.endsWith('/' + edge)

const getPaths = (
  ports: Set<string>,
  edge: number,
  score: number = 0,
  length: number = 1
): Path[] => {
  // Find the available ports which have an edge matching the current one.
  const options = Array.from(ports).filter(port => matches(port, edge))

  // If there are no more options, it means we’re done with that bridge.
  if (options.length === 0) {
    return [{ score: score + edge, length }]
  }

  // For each matching port, fork the set of available ports without it, and
  // recursive look for new nodes.
  return options.reduce<Path[]>((acc, port) => {
    // I ttried a few alternatives here, between splitting and searching, or
    // slicing before/after the slash, and it’s all pretty much the same.
    const sides = port.split('/')
    const newEdge = port.startsWith(edge + '/') ? sides.pop() : sides.shift()
    const newPorts = discard(ports, port)

    return acc.concat(
      getPaths(newPorts, +(newEdge || 0), score + edge * 2, length + 1)
    )
  }, [])
}

export const run = (input: string[]) =>
  input
    .filter(port => port.startsWith('0/'))
    .map(start => {
      const ports = discard(input, start)
      const edge = +(start.split('/').pop() || 0)

      return getPaths(ports, edge)
    })
    .flat()
