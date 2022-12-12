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

const createGraph = (start, end, n) => {
  const isWalkable = isOpenSpace(n)
  const frontier = [start]
  const from = { [start.point]: null }

  while (frontier.length) {
    const curr = frontier.pop()

    if (curr.point === end.point) break

    $.bordering(curr.coords, 'BOTH')
      .filter(next => isWalkable(next) && !(next.point in from))
      .forEach(next => {
        frontier.unshift(next)
        from[next.point] = curr.point
      })
  }

  return from
}

const run = (target, n, reach = 50) => {
  const start = { point: '1,1', coords: [1, 1] }
  const end = { point: target, coords: $.toCoords(target).reverse() }
  const graph = createGraph(start, end, n)
  const pathLength = $.pathLength(graph, start.point, end.point)
  const withinReach = Object.keys(graph).filter(
    from => $.pathLength(graph, start.point, from) <= reach
  )

  return [pathLength, withinReach.length]
}

module.exports = { run }
