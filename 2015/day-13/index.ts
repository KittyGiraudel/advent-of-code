import $ from '../../helpers'

type Graph = {
  [key: string]: {
    [key: string]: number
  }
}

const createGraph = (input: string[], withOneself: boolean): Graph => {
  const graph: Graph = {}

  if (withOneself) graph.me = {}

  input.forEach(line => {
    const [, first, verb, value, last] = line.match(
      /(\w+).*?(gain|lose) (\d+).*?(\w+)\./
    )
    const direction = verb === 'gain' ? +1 : -1

    if (!(first in graph)) graph[first] = {}
    graph[first][last] = Number(value) * direction

    if (withOneself) graph.me[first] = graph[first].me = 0
  })

  return graph
}

const getArrangementScore =
  (graph: Graph) =>
  (arrangement: string[]): number =>
    arrangement.reduce((acc, item, index, array) => {
      const next = array[index + 1] || array[0]

      return acc + graph[item][next] + graph[next][item]
    }, 0)

export const run = (input: string[], withOneself: boolean = false): number => {
  const graph = createGraph(input, withOneself)
  const keys = Object.keys(graph)
  const arrangements = $.permutations(keys)
  const getScore = getArrangementScore(graph)

  return $.max(arrangements.map(getScore))
}
