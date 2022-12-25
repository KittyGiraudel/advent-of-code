const $ = require('../../helpers')

const remapGrid = (start, end) => (value, ri, ci) => {
  const position = [ri, ci]

  if (value === 'S') {
    start.position = position
    return (start.elevation = 'a'.charCodeAt())
  }

  if (value === 'E') {
    end.position = position
    return (end.elevation = 'z'.charCodeAt())
  }

  return value.charCodeAt()
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
      .map(position => ({
        position,
        elevation: $.access(grid, position),
      }))
      .filter(next => next.elevation - elevation <= 1)

const walk = (grid, start, end) =>
  $.pathfinding.search({
    start,
    getNeighbors: getNeighbors(grid),
    toKey: curr => $.toPoint(curr.position),
    isDone: curr =>
      curr.position[0] === end.position[0] &&
      curr.position[1] === end.position[1],
  }).from

const process = input => {
  const start = {}
  const end = {}
  const grid = $.grid.create(input, remapGrid(start, end))
  const from = walk(grid, start, end)

  return $.pathfinding.path(from, start.position, end.position).length
}

const findShortestPath = input => {
  const end = {}
  const grid = $.grid.create(input, remapGrid({}, end))
  const endPoint = $.toPoint(end.position)

  return Math.min(
    ...$.grid
      .flatMap(grid, (v, ri, ci) => {
        if (v === 'a'.charCodeAt()) {
          const start = { position: [ri, ci], elevation: v }
          const path = walk(grid, start, end)

          if (!(endPoint in path)) return null

          return $.pathfinding.path(path, start.position, end.position).length
        }

        return null
      })
      .filter(Boolean)
  )
}

module.exports = { process, findShortestPath }
