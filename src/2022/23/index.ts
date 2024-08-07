import $ from '../../helpers'
import type { Point } from '../../types'

const SIDES = {
  N: ([N, NE, , , , , , NW]: Point[]) => [N, NW, NE],
  S: ([, , , SE, S, SW, ,]: Point[]) => [S, SW, SE],
  W: ([, , , , , SW, W, NW]: Point[]) => [W, NW, SW],
  E: ([, NE, E, SE, , , ,]: Point[]) => [E, NE, SE],
}
type Side = keyof typeof SIDES

const getNeighbors = $.memo((point: Point) => $.surrounding(point))

const mapPositions = (input: string[]) =>
  $.Grid.fromRows(input).reduce<Set<Point>>(
    (acc, value, coords) => (value === '#' ? acc.add($.toPoint(coords)) : acc),
    new Set()
  )

export const run = (input: string[], rounds = 10) => {
  const positions = mapPositions(input)
  const directions = ['N', 'S', 'W', 'E']
  const isOccupied = (point: Point) => positions.has(point)

  for (let i = 0; i < rounds; i++) {
    // Stage 1: every elf in the map proposes a move based on their neighbors.
    const moving = Array.from(positions)
      .map(point => {
        const neighbors = getNeighbors(point)

        if (neighbors.some(isOccupied)) {
          const next = directions
            .map(direction => SIDES[direction as Side](neighbors))
            .find(neighbors => !neighbors.some(isOccupied))

          if (next) return { curr: point, next: next[0] }
        }
      })
      .filter((item): item is { curr: Point; next: Point } => Boolean(item))

    // This is for part 2.
    if (!moving.length) return i + 1

    // Stage 2: every elf in the map moves provided they are the only one that
    // was supposed to move to that direction
    moving.forEach((moving, _, array) => {
      const { curr, next } = moving
      if (!array.find(item => item.curr !== curr && item.next === next)) {
        positions.add(next)
        positions.delete(curr)
      }
    })

    $.rotate(directions, -1)
  }

  const [minX, maxX, minY, maxY] = $.boundaries(
    (Array.from(positions) as Point[]).map($.toCoords)
  )

  return (maxX + 1 - minX) * (maxY + 1 - minY) - positions.size
}
