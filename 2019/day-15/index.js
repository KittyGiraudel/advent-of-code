const $ = require('../../helpers')
const { Intcode } = require('../day-05')

const DIRECTIONS = [1, 4, 2, 3]
const VECTORS = [
  [+1, 0],
  [0, +1],
  [-1, 0],
  [0, -1],
]

const getPathLength = (graph, start, end) => {
  let current = end
  let length = 0

  while (current && current !== start) {
    length++
    current = graph[current]
  }

  return length
}

const discover = input => {
  const start = { point: '0,0', coords: [0, 0], program: new Intcode(input) }
  const frontier = [start]
  const from = { [start.point]: null }
  let end = null

  while (frontier.length) {
    const curr = frontier.pop()
    const neighbors = $.bordering(curr.coords, 'BOTH')

    if (curr.program.getOutput() === 2) {
      end = curr
      // break
    }

    neighbors.forEach((next, index) => {
      if (next.point in from) return

      const clone = curr.program.snapshot().setInput(DIRECTIONS[index]).run()

      if (clone.outputs[0]) {
        from[next.point] = curr.point
        frontier.unshift({ ...next, program: clone })
      }
    })
  }

  return { from, start, end }
}

const getDistanceToOxygen = input => {
  const { from, start, end } = discover(input)

  return getPathLength(from, start.point, end.point)
}

const padGrid = (grid, width) => [
  Array.from('#'.repeat(width + 2)),
  ...grid.map(row => ['#', ...row, '#']),
  Array.from('#'.repeat(width + 2)),
]

const render = ({ from, end }) => {
  const cells = Object.keys(from).map($.toCoords)
  const [minY, maxY, minX, maxX] = $.boundaries(cells)
  const width = maxX + 1 - minX
  const height = maxY + 1 - minY
  const handler = (x, y) =>
    Object.keys(from).includes(y + minY + ',' + (x + minX)) ? '.' : '#'
  const grid = $.grid.init(width, height, handler)

  grid[end.coords[1]][end.coords[0]] = 'O'

  return $.grid.render(padGrid(grid, width))
}

const getOxygenDuration = input => {
  const { from, end } = discover(input)
  const start = { ...end, minutes: 0 }
  const frontier = [start]
  const visited = new Set()
  let maxMinutes = 0

  while (frontier.length) {
    const curr = frontier.pop()

    if (visited.has(curr.point)) continue
    else visited.add(curr.point)

    if (curr.point in from) {
      maxMinutes = Math.max(curr.minutes, maxMinutes)

      $.bordering(curr.coords).forEach(next =>
        frontier.unshift({ ...next, minutes: curr.minutes + 1 })
      )
    }
  }

  return maxMinutes
}

module.exports = { getDistanceToOxygen, getOxygenDuration }
