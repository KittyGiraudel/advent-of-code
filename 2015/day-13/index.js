import $ from '../../helpers'

const createGraph = (input, withOneself) => {
  const graph = {}

  if (withOneself) graph.me = {}

  input.forEach(line => {
    const [, first, verb, value, last] = line.match(
      /(\w+).*?(gain|lose) (\d+).*?(\w+)\./
    )
    const direction = verb === 'gain' ? +1 : -1

    if (!(first in graph)) graph[first] = {}
    graph[first][last] = value * direction

    if (withOneself) graph.me[first] = graph[first].me = 0
  })

  return graph
}

const getArrangementScore = graph => arrangement =>
  arrangement.reduce((acc, item, index, array) => {
    const next = array[index + 1] || array[0]

    return acc + graph[item][next] + graph[next][item]
  }, 0)

export const run = (input, withOneself = false) => {
  const graph = createGraph(input, withOneself)
  const keys = Object.keys(graph)
  const arrangements = $.permutations(keys)
  const getScore = getArrangementScore(graph)

  return $.max(arrangements.map(getScore))
}
