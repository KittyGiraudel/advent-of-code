import $ from '../../helpers'
import { Coords, Grid, Point } from '../../types'

const VECTORS: Coords[] = [
  [-1, 0],
  [0, +1],
  [+1, 0],
  [0, -1],
]

const getNextNodes = (
  grid: Grid<string>,
  curr: { position: Coords; vector: Coords }
) => {
  const read = (coords: Coords) => $.grid.at(grid, coords)?.trim()
  if (read(curr.position) === '+')
    return $.bordering(curr.position, 'COORDS')
      .map((position, index) => ({ position, vector: VECTORS[index] }))
      .filter(({ position }) => read(position))
  else return [{ ...curr, position: $.applyVector(curr.position, curr.vector) }]
}

export const run = (input: string[]): [string, number] => {
  const grid = $.grid.from<string>(input)
  const read = (coords: Coords) => $.grid.at(grid, coords)?.trim()
  const visited: Point[] = []
  let position: Coords = [0, grid[0].findIndex(v => v === '|')]
  let vector: Coords = VECTORS[2]
  let letters = ''
  let value = null

  // While on the circuit …
  while ((value = read(position))) {
    // … pick up letters we find …
    if (/[A-Z]/.test(value)) letters += value
    // … change direction when hitting a corner …
    if (value === '+') {
      const index = $.bordering(position, 'BOTH')
        // … by finding the neighboring track that’s not yet visited …
        .findIndex(
          ({ coords, point }) => !visited.includes(point) && read(coords)
        )
      vector = VECTORS[index]
    }

    // … update the position and record the tile as visited.
    position = $.applyVector(position, vector)
    visited.push($.toPoint(position))
  }

  return [letters, visited.length]
}
