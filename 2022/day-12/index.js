const $ = require('../../helpers')

const parse = input => {
  const start = {}
  const end = {}
  const grid = $.grid.create(input, (value, ri, ci) => {
    if (value === 'S') {
      start.position = [ri, ci]
      return (start.elevation = 'a'.charCodeAt())
    }

    if (value === 'E') {
      end.position = [ri, ci]
      return (end.elevation = 'z'.charCodeAt())
    }

    return value.charCodeAt()
  })

  return { grid, start, end }
}

const isWithinBounds =
  grid =>
  ([ri, ci]) =>
    $.isClamped(ri, 0, grid.length - 1) &&
    $.isClamped(ci, 0, grid[0].length - 1)

const getNeighbors =
  grid =>
  ({ position, elevation }) =>
    $.bordering(position, 'COORDS')
      .filter(isWithinBounds(grid))
      .map(position => ({ position, elevation: $.access(grid, position) }))
      .filter(next => next.elevation - elevation <= 1)

const getPathLength = (grid, start, end) => {
  const { from: graph } = $.pathfinding.search({
    start,
    getNeighbors: getNeighbors(grid),
    toKey: curr => $.toPoint(curr.position),
    isDone: curr =>
      curr.position[0] === end.position[0] &&
      curr.position[1] === end.position[1],
  })

  return $.toPoint(end.position) in graph
    ? $.pathfinding.path(graph, start.position, end.position).length
    : Infinity
}

const findPath = input => {
  const { grid, start, end } = parse(input)

  return getPathLength(grid, start, end)
}

const findShortestPath = input => {
  const { grid, end } = parse(input)

  return $.grid.reduce(
    grid,
    (min, elevation, ...position) =>
      elevation === 'a'.charCodeAt()
        ? Math.min(min, getPathLength(grid, { position, elevation }, end))
        : min,
    Infinity
  )
}

module.exports = { findPath, findShortestPath }
