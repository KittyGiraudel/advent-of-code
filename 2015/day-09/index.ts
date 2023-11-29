type Graph = Record<string, Record<string, number>>

// This is your typical traversal function. Get the neighbors of the current
// node that haven’t been visited yet, and recursively walk them until we don’t
// have any remaining node, at which point return the path score.
const getPaths = (
  graph: Graph,
  curr: string,
  path: Array<string> = [],
  score: number = 0
) => {
  const cities = Object.keys(graph[curr]).filter(key => !path.includes(key))

  if (!cities.length) {
    return [score] as [number]
  }

  return cities.reduce((acc, city) => {
    const nextScore = score + graph[curr][city]
    const nextPath = [...path, curr]
    const paths: Array<number> = getPaths(graph, city, nextPath, nextScore)

    return [...acc, paths] as Array<number>
  }, [] as Array<number>)
}

const createGraph = (input: Array<string>) => {
  const graph: Graph = {}

  input.forEach(line => {
    const [, a, b, distance] = line.match(/(\w+) to (\w+) = (\d+)/) ?? []
    if (!(a in graph)) graph[a] = {}
    if (!(b in graph)) graph[b] = {}
    graph[a][b] = +distance
    graph[b][a] = +distance
  })

  return graph
}

export const run = (input: Array<string>) => {
  const graph = createGraph(input)

  return Object.keys(graph)
    .flatMap(key => getPaths(graph, key))
    .flat(Infinity)
}
