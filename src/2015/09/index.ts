import $ from '../../helpers'

type Graph = Record<string, Record<string, number>>

const createGraph = (input: string[]) => {
  const graph: Graph = {}

  input.forEach(line => {
    const [, a, b, distance] = $.match(line, /(\w+) to (\w+) = (\d+)/)
    if (!(a in graph)) graph[a] = {}
    if (!(b in graph)) graph[b] = {}
    graph[a][b] = +distance
    graph[b][a] = +distance
  })

  return graph
}

/*
// Edit 2023: This implementation is preserved for posterity, but I rewrote it
// without all this logic by just calling the $.permutations(..) helper on the
// list of places.
//
// This is your typical traversal function. Get the neighbors of the current
// node that haven’t been visited yet, and recursively walk them until we don’t
// have any remaining node, at which point return the path score.
const getPaths = (
  graph: Graph,
  curr: string,
  path: string[] = [],
  score: number = 0
): number[] => {
  const cities = Object.keys(graph[curr]).filter(key => !path.includes(key))

  if (!cities.length) {
    return [score]
  }

  return cities.reduce<number[]>((acc, city) => {
    const nextScore = score + graph[curr][city]
    const nextPath = [...path, curr]
    const paths = getPaths(graph, city, nextPath, nextScore)

    return [...acc, paths] as number[]
  }, [])
}
*/

export const run = (input: string[]) => {
  const graph = createGraph(input)
  const keys = Object.keys(graph)
  const paths = $.permutations(keys)

  const getPathCost = (acc: number, curr: string, i: number, path: string[]) =>
    i === 0 ? acc : acc + graph[path[i - 1]][curr]

  // Old version
  // return keys.flatMap(key => getPaths(graph, key)).flat(Infinity)

  return paths.map(path => path.reduce(getPathCost, 0))
}
