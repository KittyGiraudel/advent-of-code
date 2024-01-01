import $ from '../../helpers'
import { Coords, Grid, Point, SearchGraph } from '../../types'
import { Intcode } from '../05'

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

const discover = (input: string) =>
  $.search.bfs<Node>({
    start: { position: [0, 0], program: new Intcode(input) },
    emptyAfterGoal: true,
    toKey: curr => $.toPoint(curr.position),
    isGoal: curr => curr.program.getOutput() === 2,
    getNextNodes: (curr: Node) =>
      $.bordering(curr.position)
        .map(coords => ({ position: coords, program: new Intcode('') }))
        .map(addProgramCopy(curr))
        .filter((next: Node) => next.program.outputs[0]),
  })

export const getDistanceToOxygen = (input: string) =>
  discover(input).getPath().length

const padGrid = (grid: Grid<string>) => {
  const line = (size: number) => Array.from('#'.repeat(size))
  grid.prependRow(line(grid.width))
  grid.appendRow(line(grid.width))
  grid.appendColumn(line(grid.height))
  grid.prependColumn(line(grid.height))
  return grid
}

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
  const handler = ([ci, ri]: Coords) =>
    Object.keys(from).includes(ri + minY + ',' + (ci + minX)) ? '.' : '#'
  const grid = new $.Grid(width, height, handler)

  grid.set(end.coords, 'O')

  return padGrid(grid).render()
}

export const getOxygenDuration = (input: string) => {
  const { graph, end } = discover(input)
  let maxMinutes = 0

  $.search.bfs({
    start: { position: end.position, minutes: 0 },
    toKey: curr => $.toPoint(curr.position),
    getNextNodes: curr => {
      // If the position does not appear in the graph, it means it’s a wall and
      // should therefore not continue any further.
      if (!($.toPoint(curr.position) in graph)) return []

      maxMinutes = Math.max(curr.minutes, maxMinutes)

      return $.bordering(curr.position).map(position => ({
        position,
        minutes: curr.minutes + 1,
      }))
    },
  })

  return maxMinutes
}
