import $ from '../../helpers'
import { Coords, Point } from '../../types'
import { Computer } from '../10'

export const run = (key: string, part2: boolean = false) => {
  const grid = new $.Grid<number>(0)

  for (let i = 0; i < 128; i++) {
    const hash = new Computer(key + '-' + i).round(64).getHash()
    const bin = Array.from(Array.from(hash).map($.hexToBin).join('')).map(
      Number
    )
    grid.appendRow(bin)
  }

  const visited: Record<Point, Point> = {}

  // Starting from the cell at the given coordinates, explore the active and not
  // yet explored neighbors, marking them all part of the same group.
  const walk = (coords: Coords, group: Point) =>
    $.bordering(coords)
      .filter(coords => grid.get(coords))
      .forEach(coords => {
        const point = $.toPoint(coords)
        if (!(point in visited)) {
          visited[point] = group
          walk(coords, group)
        }
      })

  grid.forEach((active, coords) => {
    if (!active) return

    const point = $.toPoint(coords)

    if (!(point in visited)) {
      visited[point] = point
      walk(coords, point)
    }
  })

  return part2 ? new Set(Object.values(visited)).size : grid.count(v => v === 1)
}
