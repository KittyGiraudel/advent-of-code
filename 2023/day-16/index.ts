import $ from '../../helpers'
import { Coords, Grid, Point } from '../../types'

const flip = (vector: Coords, value: '/' | '\\') =>
  [
    vector[1] === 0 ? 0 : vector[1] * (value === '/' ? -1 : +1),
    vector[0] === 0 ? 0 : vector[0] * (value === '/' ? -1 : +1),
  ] as Coords

const energize = (grid: Grid<string>, position: Coords, direction: Coords) => {
  const beams = [{ position, direction }]
  const visited = new Set<string>()
  const energized = new Set<Point>()

  // For as long as we have running beams, take the first beam and move it to
  // its new position. If it’s now out of bound, discard the beam. If a beam has
  // already been there in that direction, discard the beam as we’ve met a loop.
  // Otherwise, change its direction if needed, and add new beams when meeting
  // - and | tiles in the opposite direction.
  while (beams.length) {
    const beam = beams[0]

    beam.position = $.applyVector(beam.position, beam.direction)

    const point = $.toPoint(beam.position)
    const key = point + ';' + $.toPoint(beam.direction)
    const value = $.grid.at(grid, beam.position)

    if (!value || visited.has(key)) {
      beams.shift()
      continue
    }

    energized.add(point)
    visited.add(key)

    if (value === '/' || value === '\\') {
      beam.direction = flip(beam.direction, value)
    } else if (value === '-' && beam.direction[0] !== 0) {
      beam.direction = [0, -1]
      beams.push({ position: beam.position, direction: [0, +1] })
    } else if (value === '|' && beam.direction[1] !== 0) {
      beam.direction = [-1, 0]
      beams.push({ position: beam.position, direction: [+1, 0] })
    }
  }

  return energized.size
}

export const run = (input: string[], advanced: boolean = false) => {
  const grid = $.grid.from<string>(input)
  const { width, height } = $.grid.dimensions(grid)

  if (!advanced) {
    return energize(grid, [0, -1], [0, +1])
  }

  return Math.max(
    ...$.range(height).flatMap(ri => [
      energize(grid, [ri, -1], [0, +1]),
      energize(grid, [ri, width], [0, -1]),
    ]),
    ...$.range(width).flatMap(ci => [
      energize(grid, [-1, ci], [+1, 0]),
      energize(grid, [height, ci], [-1, 0]),
    ])
  )
}
