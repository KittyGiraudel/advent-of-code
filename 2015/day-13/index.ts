import $ from '../../helpers'

type Graph = Record<string, Record<string, number>>

const createGraph = (input: Array<string>, withOneself: boolean) => {
  const graph: Graph = {}

  if (withOneself) graph.me = {}

  input.forEach(line => {
    const [, first, verb, value, last] =
      line.match(/(\w+).*?(gain|lose) (\d+).*?(\w+)\./) ?? []
    const direction = verb === 'gain' ? +1 : -1

    if (!(first in graph)) graph[first] = {}
    graph[first][last] = Number(value) * direction

    if (withOneself) graph.me[first] = graph[first].me = 0
  })

  return graph
}

const getArrangementScore = (graph: Graph) => (arrangement: Array<string>) =>
  arrangement.reduce((acc, item, index, array) => {
    const next = array[index + 1] || array[0]

    return acc + graph[item][next] + graph[next][item]
  }, 0)

export const run = (input: Array<string>, withOneself: boolean = false) => {
  const graph = createGraph(input, withOneself)
  const keys = Object.keys(graph)
  const arrangements = $.permutations(keys)
  const getScore = getArrangementScore(graph)

  return $.max(arrangements.map(getScore))
}
