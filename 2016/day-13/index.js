const $ = require('../../helpers')

const isOpenSpace =
  n =>
  ({ coords: [y, x] }) => {
    if (x < 0 || y < 0) return false

    const value = x * x + 3 * x + 2 * x * y + y + y * y + n
    const bin = $.toBin(value)
    const ones = $.countInString(bin, '1')

    return ones % 2 === 0
  }

const createGraph = (start, end, n) =>
  $.astar.graph(
    start,
    end,
    curr => $.bordering(curr.coords, 'BOTH').filter(isOpenSpace(n)),
    { skipVisited: true }
  )

const run = (target, n, reach = 50) => {
  const start = { point: '1,1', coords: [1, 1] }
  const end = { point: target, coords: $.toCoords(target).reverse() }
  const graph = createGraph(start, end, n)
  const pathLength = $.astar.path(graph, start.point, end.point).length
  const withinReach = Object.keys(graph).filter(
    from => $.astar.path(graph, start.point, from).length <= reach
  )

  return [pathLength, withinReach.length]
}

module.exports = { run }
