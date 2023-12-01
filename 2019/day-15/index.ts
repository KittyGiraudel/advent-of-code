import $ from '../../helpers'
import { Coords, Grid, Point, SearchGraph } from '../../types'
import { Intcode } from '../day-05'

const DIRECTIONS = [1, 4, 2, 3]

type Node = {
  position: Coords
  program: Intcode
  minutes?: number
}

const addProgramCopy = (curr: Node) => (next: Node, index: number) =>
  ({
    ...next,
    program: curr.program.snapshot().setInput(DIRECTIONS[index]).run(),
  } as Node)

const discover = (input: string) => {
  const start: Node = { position: [0, 0], program: new Intcode(input) }
  const getNextNodes = (curr: Node) =>
    $.bordering(curr.position, 'COORDS')
      .map(coords => ({ position: coords, program: new Intcode('') }))
      .map(addProgramCopy(curr))
      .filter((next: Node) => next.program.outputs[0])

  const { from, end } = $.pathfinding.bfs({
    start,
    emptyAfterGoal: true,
    getNextNodes,
    toKey: curr => $.toPoint(curr.position),
    isGoal: curr => curr.program.getOutput() === 2,
  })

  return { from, start, end }
}

export const getDistanceToOxygen = (input: string) => {
  const { from, start, end } = discover(input)

  return $.pathfinding.path(from, start.position, end.position).length
}

const padGrid = (grid: Grid<string>, width: number) =>
  [
    Array.from('#'.repeat(width + 2)),
    ...grid.map(row => ['#', ...row, '#']),
    Array.from('#'.repeat(width + 2)),
  ] as Grid<string>

const render = ({
  from,
  end,
}: {
  from: SearchGraph
  end: { coords: Coords }
}) => {
  const cells = (Object.keys(from) as Point[]).map($.toCoords)
  const [minY, maxY, minX, maxX] = $.boundaries(cells)
  const width = maxX + 1 - minX
  const height = maxY + 1 - minY
  const handler = (ci: number, ri: number) =>
    Object.keys(from).includes(ri + minY + ',' + (ci + minX)) ? '.' : '#'
  const grid = $.grid.init(width, height, handler)

  grid[end.coords[1]][end.coords[0]] = 'O'

  return $.grid.render(padGrid(grid, width))
}

export const getOxygenDuration = (input: string) => {
  const { from, end } = discover(input)
  let maxMinutes = 0

  $.pathfinding.bfs({
    start: { position: end.position, minutes: 0 },
    toKey: curr => $.toPoint(curr.position),
    getNextNodes: curr => {
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
