import $ from '../../helpers'
import type { Coords, Grid } from '../../types'

type Node = {
  position: Coords
  elevation: number
}

const parse = (input: string[]) => {
  const start: Node = { position: [0, 0], elevation: 0 }
  const end: Node = { position: [0, 0], elevation: 0 }
  const grid = $.Grid.fromRows(input, (value, coords) => {
    if (value === 'S') {
      start.position = coords
      return (start.elevation = 'a'.charCodeAt(0))
    }

    if (value === 'E') {
      end.position = coords
      return (end.elevation = 'z'.charCodeAt(0))
    }

    return value.charCodeAt(0)
  })

  return { grid, start, end }
}

const getNext =
  (grid: Grid<number>) =>
  ({ position, elevation }: Node) =>
    $.bordering(position)
      .filter(position => grid.get(position))
      .map(position => ({ position, elevation: grid.get(position) }))
      .filter((next: Node) => next.elevation - elevation <= 1)

const getPathLength = (grid: Grid<number>, start: Node, end: Node) => {
  const { graph, getPath } = $.search.bfs({
    start,
    getNext: getNext(grid),
    toKey: curr => $.toPoint(curr.position),
    isGoal: curr =>
      curr.position[0] === end.position[0] &&
      curr.position[1] === end.position[1],
  })

  return $.toPoint(end.position) in graph
    ? getPath().length
    : Number.POSITIVE_INFINITY
}

export const findPath = (input: string[]) => {
  const { grid, start, end } = parse(input)

  return getPathLength(grid, start, end)
}

export const findShortestPath = (input: string[]) => {
  const { grid, end } = parse(input)

  return grid.reduce(
    (min, elevation, position) =>
      elevation === 'a'.charCodeAt(0)
        ? Math.min(min, getPathLength(grid, { position, elevation }, end))
        : min,
    Number.POSITIVE_INFINITY
  )
}
