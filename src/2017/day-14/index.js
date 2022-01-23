const $ = require('../../helpers')
const { Computer } = require('../day-10')

const run = key => {
  let grid = []

  for (let i = 0; i < 128; i++) {
    const hash = new Computer(key + '-' + i).round(64).getHash()
    const bin = Array.from(Array.from(hash).map($.hexToBin).join('')).map(
      Number
    )
    grid.push(bin)
  }

  const visited = {}

  // Starting from the cell at the given coordinates, explore the active and not
  // yet explored neighbors, marking them all part of the same group.
  const walk = (coords, group) =>
    $.neighbors
      .bordering(...coords)
      .filter(([ri, ci]) => grid?.[ri]?.[ci])
      .forEach(coords => {
        const point = $.toPoint(coords)

        if (!(point in visited)) {
          visited[point] = group
          walk(coords, group)
        }
      })

  $.grid.forEach(grid, (active, ri, ci) => {
    if (!active) return

    const point = $.toPoint([ri, ci])

    if (!(point in visited)) {
      visited[point] = point
      walk([ri, ci], point)
    }
  })

  const chars = grid.flat().join('')
  const active = $.countInString(chars, '1')
  const groups = new Set(Object.values(visited))

  return [active, groups.size]
}

module.exports = { run }
