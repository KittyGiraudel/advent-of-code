import $ from '../../helpers'
import { Coords, Grid, Point, SearchGraph } from '../../types'
import { Intcode } from '../day-05'

const DIRECTIONS = [1, 4, 2, 3]

type Node = {
  position: Coords
  program: Intcode
  minutes?: number
}

const addProgramCopy =
  (curr: Node) =>
  (next: Node, index: number): Node => ({
    ...next,
    program: curr.program.snapshot().setInput(DIRECTIONS[index]).run(),
  })

const discover = (
  input: string
): { from: SearchGraph; start: Node; end: Node } => {
  const start: Node = { position: [0, 0], program: new Intcode(input) }
  let end = null
  const getNeighbors = (curr: Node): Node[] =>
    $.bordering(curr.position, 'COORDS')
      .map((coords: Coords) => ({ position: coords }))
      .map(addProgramCopy(curr))
      .filter((next: Node) => next.program.outputs[0])

  const { from } = $.pathfinding.search({
    start,
    getNeighbors,
    toKey: (curr: Node): Point => $.toPoint(curr.position),
    isDone: (curr: Node): boolean => {
      // A little odd here, but essentially we a) do not know where the end is
      // until we find it and b) want to map out the entire place before
      // exiting, so instead of cutting the walk as soon as we find the end,
      // we just store it.
      if (curr.program.getOutput() === 2) end = curr
      return false
    },
  })

  return { from, start, end }
}

export const getDistanceToOxygen = (input: string): number => {
  const { from, start, end } = discover(input)

  return $.pathfinding.path(from, start.position, end.position).length
}

const padGrid = (grid: Grid<string>, width: number): Grid<string> => [
  Array.from('#'.repeat(width + 2)),
  ...grid.map(row => ['#', ...row, '#']),
  Array.from('#'.repeat(width + 2)),
]

const render = ({ from, end }) => {
  const cells = Object.keys(from).map($.toCoords)
  const [minY, maxY, minX, maxX] = $.boundaries(cells)
  const width = maxX + 1 - minX
  const height = maxY + 1 - minY
  const handler = (x: number, y: number): string =>
    Object.keys(from).includes(y + minY + ',' + (x + minX)) ? '.' : '#'
  const grid = $.grid.init(width, height, handler)

  grid[end.coords[1]][end.coords[0]] = 'O'

  return $.grid.render(padGrid(grid, width))
}

export const getOxygenDuration = (input: string): number => {
  const { from, end } = discover(input)
  let maxMinutes = 0

  $.pathfinding.search({
    start: { position: end.position, minutes: 0 },
    toKey: (curr: Node) => $.toPoint(curr.position),
    getNeighbors: (curr: Node) => {
      // If the position does not appear in the graph, it means it’s a wall and
      // should therefore not continue any further.
      if (!($.toPoint(curr.position) in from)) return []

      maxMinutes = Math.max(curr.minutes, maxMinutes)

      return $.bordering(curr.position, 'COORDS').map(position => ({
        position,
        minutes: curr.minutes + 1,
      }))
    },
  })

  return maxMinutes
}
