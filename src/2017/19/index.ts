import $ from '../../helpers'
import type { Coords, Point } from '../../types'

const VECTORS: Coords[] = [
  [-1, 0],
  [0, +1],
  [+1, 0],
  [0, -1],
]

export const run = (input: string[]): [string, number] => {
  const grid = $.Grid.fromRows(input)
  const read = (position: Coords | Point) => grid.get(position)?.trim()
  const visited: Point[] = []
  let position = grid.findCoords((v, [ri]) => ri === 0 && v === '|')
  let vector: Coords = VECTORS[2]
  let letters = ''
  let value: string | null = null

  if (!position) {
    throw new Error('Could not find start position')
  }

  // While on the circuit …
  while ((value = read(position))) {
    // … pick up letters we find …
    if (/[A-Z]/.test(value)) letters += value
    // … change direction when hitting a corner …
    if (value === '+') {
      const index = $.bordering(position)
        // … by finding the neighboring track that’s not yet visited …
        .findIndex(
          coords => !visited.includes($.toPoint(coords)) && read(coords)
        )
      vector = VECTORS[index]
    }

    // … update the position and record the tile as visited.
    position = $.applyVector(position, vector)
    visited.push($.toPoint(position))
  }

  return [letters, visited.length]
}
