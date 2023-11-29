import $ from '../../helpers'
import { Coords, Grid } from '../../types'

type Node = {
  position: Coords | null
  elevation: number
}

const parse = (
  input: Array<string>
): { grid: Grid<number>; start: Node; end: Node } => {
  const start: Node = { position: null, elevation: 0 }
  const end: Node = { position: null, elevation: 0 }
  const grid = $.grid.create(input, (value, ri, ci) => {
    if (value === 'S') {
      start.position = [ri, ci]
      return (start.elevation = 'a'.charCodeAt(0))
    }

    if (value === 'E') {
      end.position = [ri, ci]
      return (end.elevation = 'z'.charCodeAt(0))
    }

    return value.charCodeAt(0)
  })

  return { grid, start, end }
}

const isWithinBounds =
  (grid: Grid<number>) =>
  ([ri, ci]: Coords) =>
    $.isClamped(ri, 0, grid.length - 1) &&
    $.isClamped(ci, 0, grid[0].length - 1)

const getNextNodes =
  (grid: Grid<number>) =>
  ({ position, elevation }: Node) =>
    $.bordering(position, 'COORDS')
      .filter(isWithinBounds(grid))
      .map(position => ({ position, elevation: $.access(grid, position) }))
      .filter((next: Node) => next.elevation - elevation <= 1)

const getPathLength = (grid: Grid<number>, start: Node, end: Node): number => {
  const { from: graph } = $.pathfinding.bfs({
    start,
    getNextNodes: getNextNodes(grid),
    toKey: curr => $.toPoint(curr.position),
    isGoal: curr =>
      curr.position[0] === end.position[0] &&
      curr.position[1] === end.position[1],
  })

  return $.toPoint(end.position) in graph
    ? $.pathfinding.path(graph, start.position, end.position).length
    : Infinity
}

export const findPath = (input: Array<string>): number => {
  const { grid, start, end } = parse(input)

  return getPathLength(grid, start, end)
}

export const findShortestPath = (input: Array<string>): number => {
  const { grid, end } = parse(input)

  return $.grid.reduce(
    grid,
    (min, elevation, ri, ci) =>
      elevation === 'a'.charCodeAt(0)
        ? Math.min(
            min,
            getPathLength(grid, { position: [ri, ci], elevation }, end)
          )
        : min,
    Infinity
  )
}
