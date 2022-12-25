const $ = require('../../helpers')

const isOpenSpace =
  n =>
  ([y, x]) => {
    if (x < 0 || y < 0) return false

    const value = x * x + 3 * x + 2 * x * y + y + y * y + n
    const bin = $.toBin(value)
    const ones = $.countInString(bin, '1')

    return ones % 2 === 0
  }

const run = (end, n, reach = 50) => {
  const neighbors = curr => $.bordering(curr, 'COORDS').filter(isOpenSpace(n))
  const start = [1, 1]
  const { from: graph } = $.pathfinding.search({
    start,
    getNeighbors: neighbors,
    isDone: ([ri, ci]) => ri === end[0] && ci === end[1],
  })

  const getDistanceFromStart = from =>
    $.pathfinding.path(graph, start, from).length

  return [
    // Part 1
    getDistanceFromStart(end),

    // Part 2
    Object.keys(graph)
      .map(getDistanceFromStart)
      .filter(distance => distance <= reach).length,
  ]
}

module.exports = { run }
