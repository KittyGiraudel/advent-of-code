import $ from '../../helpers'
import { Coords, CoordsAndPoint, Grid, Point } from '../../types'
import { Computer } from '../day-10'

export const run = (key: string): [number, number] => {
  let grid: Grid<number> = []

  for (let i = 0; i < 128; i++) {
    const hash = new Computer(key + '-' + i).round(64).getHash()
    const bin = Array.from(Array.from(hash).map($.hexToBin).join('')).map(
      Number
    )
    grid.push(bin)
  }

  const visited: Record<Point, Point> = {}

  // Starting from the cell at the given coordinates, explore the active and not
  // yet explored neighbors, marking them all part of the same group.
  const walk = (coords: Coords, group: Point) =>
    ($.bordering(coords) as Array<CoordsAndPoint>)
      .filter(({ coords }) => $.access(grid, coords))
      .forEach(({ coords, point }) => {
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
