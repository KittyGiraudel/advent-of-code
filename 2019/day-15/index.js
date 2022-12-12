const $ = require('../../helpers')
const { Intcode } = require('../day-05')

const DIRECTIONS = [1, 4, 2, 3]

const addProgramCopy = curr => (next, index) => ({
  ...next,
  program: curr.program.snapshot().setInput(DIRECTIONS[index]).run(),
})

const discover = input => {
  const start = { point: '0,0', coords: [0, 0], program: new Intcode(input) }
  let end = null

  const from = $.astar.graph(
    start,
    end,
    curr =>
      $.bordering(curr.coords)
        .map(addProgramCopy(curr))
        .filter(next => next.program.outputs[0]),
    {
      skipVisited: true,
      endCheck: curr => {
        // A little odd here, but essentially we a) do not know where the end is
        // until we find it and b) want to map out the entire place before
        // exiting, so instead of cutting the walk as soon as we find the end,
        // we just store it.
        if (curr.program.getOutput() === 2) end = curr
      },
    }
  )

  return { from, start, end }
}

const getDistanceToOxygen = input => {
  const { from, start, end } = discover(input)

  return $.astar.path(from, start.point, end.point).length
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
