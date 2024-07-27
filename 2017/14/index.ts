import $ from '../../helpers'
import type { Coords, Point } from '../../types'
import { Computer } from '../10'

export const run = (key: string, part2 = false) => {
  const grid = new $.Grid<number>(0)

  for (let i = 0; i < 128; i++) {
    const hash = new Computer(key + '-' + i).round(64).getHash()
    const bin = Array.from(Array.from(hash).map($.hexToBin).join('')).map(
      Number
    )
    grid.appendRow(bin)
  }

  // This reduces the grid into a map that associates every active point where
  // the cell is active (`1`) to the first point in a group of active cells
  // (where first means highest in top-to-bottom/left-to-right order). Part 1 is
  // the amount of total active cells, part 2 is the amount of groups, found by
  // picking unique values.
  const groups = grid.reduce<Record<Point, Point>>((groups, active, coords) => {
    const point = $.toPoint(coords)

    if (!active || point in groups) return groups

    const { graph } = $.search.bfs({
      start: coords,
      getNext: curr => $.bordering(curr).filter(coords => grid.get(coords)),
    })

    $.keys<Point>(graph).forEach(key => (groups[key] = point))

    return groups
  }, {})

  const cells = Object.values(groups)

  return part2 ? $.unique(cells).length : cells.length
}
