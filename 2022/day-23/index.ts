import $ from '../../helpers'
import { Point } from '../../types'

const SIDES = {
  N: ([N, NE, E, SE, S, SW, W, NW]) => [N, NW, NE],
  S: ([N, NE, E, SE, S, SW, W, NW]) => [S, SW, SE],
  W: ([N, NE, E, SE, S, SW, W, NW]) => [W, NW, SW],
  E: ([N, NE, E, SE, S, SW, W, NW]) => [E, NE, SE],
}

const getNeighbors = $.memo((point: Point): Point[] =>
  $.surrounding($.toCoords(point), 'POINTS')
)

const mapPositions = (input: string[]): Set<Point> =>
  $.grid.reduce(
    $.grid.create(input),
    (acc, value, ri, ci) =>
      value === '#' ? acc.add((ri + ',' + ci) as Point) : acc,
    new Set()
  )

export const run = (input: string[], rounds: number = 10): number => {
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
            .map(direction => SIDES[direction](neighbors))
            .find(neighbors => !neighbors.some(isOccupied))

          if (next) return { curr: point, next: next[0] }
        }
      })
      .filter(Boolean)

    // This is for part 2.
    if (!moving.length) return i + 1

    // Stage 2: every elf in the map moves provided they are the only one that
    // was supposed to move to that direction
    moving.forEach(({ curr, next }, _, array) => {
      if (!array.find(item => item.curr !== curr && item.next === next)) {
        positions.add(next)
        positions.delete(curr)
      }
    })

    $.rotate(directions, -1)
  }

  const [minX, maxX, minY, maxY] = $.boundaries(
    Array.from(positions).map($.toCoords)
  )

  return (maxX + 1 - minX) * (maxY + 1 - minY) - positions.size
}
