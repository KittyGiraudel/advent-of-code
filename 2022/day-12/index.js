const $ = require('../../helpers')

const remapGrid = (start, end) => (value, ri, ci) => {
  const coords = [ri, ci]

  if (value === 'S') {
    start.point = $.toPoint(coords)
    start.coords = coords
    return (start.elevation = 'a'.charCodeAt())
  }

  if (value === 'E') {
    end.point = $.toPoint(coords)
    end.coords = coords
    return (end.elevation = 'z'.charCodeAt())
  }

  return value.charCodeAt()
}

const isWithinBounds =
  grid =>
  ({ coords: [ri, ci] }) =>
    $.isClamped(ri, 0, grid.length - 1) &&
    $.isClamped(ci, 0, grid[0].length - 1)

const walk = (grid, start, end) =>
  $.astar.graph(start, end, (curr, from) =>
    $.bordering(curr.coords)
      .filter(isWithinBounds(grid))
      // Note that using `skipVisited` would work just as well but would be
      // significantly slower because we’d run the next `.map` (and `.filter`)
      // on nodes we actually don’t need to walk.
      .filter(next => !(next.point in from))
      .map(next => ({ ...next, elevation: $.access(grid, next.coords) }))
      .filter(next => next.elevation - curr.elevation <= 1)
  )

const process = input => {
  const start = {}
  const end = {}
  const grid = $.grid.create(input, remapGrid(start, end))
  const from = walk(grid, start, end)

  return $.astar.path(from, start.point, end.point).length
}

const findShortestPath = input => {
  const end = {}
  const grid = $.grid.create(input, remapGrid({}, end))

  return Math.min(
    ...$.grid
      .flatMap(grid, (v, ri, ci) => {
        if (v === 'a'.charCodeAt()) {
          const start = { point: `${ri},${ci}`, coords: [ri, ci], elevation: v }
          const path = walk(grid, start, end)

          if (!(end.point in path)) return null

          return $.astar.path(path, start.point, end.point).length
        }

        return null
      })
      .filter(Boolean)
  )
}

module.exports = { process, findShortestPath }
