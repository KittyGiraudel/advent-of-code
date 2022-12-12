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

const getPath = (grid, start, end) => {
  const frontier = [start]
  const from = { [start.point]: null }

  while (frontier.length) {
    const curr = frontier.pop()

    if (curr.point === end.point) break

    $.bordering(curr.coords)
      .filter(isWithinBounds(grid))
      .filter(next => !(next.point in from))
      .map(next => ({ ...next, elevation: $.access(grid, next.coords) }))
      .filter(next => next.elevation - curr.elevation <= 1)
      .forEach(next => {
        from[next.point] = curr.point
        frontier.unshift(next)
      })
  }

  return from
}

const process = input => {
  const start = {}
  const end = {}
  const grid = $.grid.create(input, remapGrid(start, end))
  const from = getPath(grid, start, end)

  return $.pathLength(from, start.point, end.point)
}

const findShortestPath = input => {
  const end = {}
  const grid = $.grid.create(input, remapGrid({}, end))

  return Math.min(
    ...$.grid
      .flatMap(grid, (v, ri, ci) => {
        if (v === 'a'.charCodeAt()) {
          const start = { point: `${ri},${ci}`, coords: [ri, ci], elevation: v }
          const path = getPath(grid, start, end)

          if (!(end.point in path)) return null

          return $.pathLength(path, start.point, end.point)
        }

        return null
      })
      .filter(Boolean)
  )
}

module.exports = { process, findShortestPath }
