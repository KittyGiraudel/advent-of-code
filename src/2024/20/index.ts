import $ from '../../helpers'
import type { Coords, Grid, Point } from '../../types'

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input)
  const start = grid.findCoords(value => value === 'S') as Coords
  const end = grid.findCoords(value => value === 'E') as Coords

  // Reset the start and end point so they become free spaces like any other
  grid.set(start, '.').set(end, '.')

  const distances = createDistanceField(start, grid)
  const delta = part2 ? 20 : 2
  const cheats = new Set<string>()

  grid.forEach((value, start) => {
    if (value !== '.') return
    const startPoint = $.toPoint(start)
    const startDistance = distances.get(startPoint) ?? 0

    for (let ri = start[0] - delta; ri <= start[0] + delta; ri++) {
      for (let ci = start[1] - delta; ci <= start[1] + delta; ci++) {
        const end: Coords = [ri, ci]
        const distance = $.manhattan(end, start)

        // Skip non-open cells, and cells that are too far to reach within time
        if (grid.get(end) !== '.' || distance > delta) continue

        const endDistance = distances.get($.toPoint(end)) ?? 0
        const save = Math.abs(startDistance - endDistance) - distance

        if (save >= 100) cheats.add([start, end].sort().join('->'))
      }
    }
  })

  return cheats.size
}

function createDistanceField(start: Coords, grid: Grid<string>) {
  const frontier: Coords[] = [start]
  const distances = new Map<Point, number>()
  distances.set($.toPoint(start), 0)

  while (frontier.length) {
    const curr = frontier.pop()!

    $.bordering(curr)
      .filter(next => grid.get(next) === '.')
      .forEach(next => {
        const point = $.toPoint(next)
        if (!distances.has(point)) {
          frontier.unshift(next)
          distances.set(point, 1 + distances.get($.toPoint(curr))!)
        }
      })
  }

  return distances
}
