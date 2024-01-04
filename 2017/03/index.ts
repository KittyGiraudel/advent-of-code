import $ from '../../helpers'
import { Coords, Point } from '../../types'

const EAST: Coords = [+1, 0]
const WEST: Coords = [-1, 0]
const SOUTH: Coords = [0, +1]
const NORTH: Coords = [0, -1]

export const resolve = (bound: number) => {
  // Given the value increments by 1 for every new cell, use an array where the
  // index serves as the value itself, hence why we skip the first cell (0).
  const coords: Coords[] = [
    [Infinity, Infinity],
    [0, 0],
  ]

  // Taking a step means applying a directional vector to the last recorded
  // set of coordinates.
  const step = (vector: Coords) =>
    coords.push($.applyVector(coords.at(-1)!, vector))

  let steps = 0
  // Populating the grid goes like this: go east, then north, then west, then
  // south, and increment the amount of steps to take by 1 every 2 directions.
  // The first directions are: E1, N1, W2, S2, E3, N3, W4, S4, E5, N5, W6, S6…
  while (coords.length <= bound) {
    steps++
    for (let i = 0; i < steps; i++) step(EAST)
    for (let i = 0; i < steps; i++) step(NORTH)
    steps++
    for (let i = 0; i < steps; i++) step(WEST)
    for (let i = 0; i < steps; i++) step(SOUTH)
  }

  return $.manhattan(coords[bound], [0, 0])
}

export const resolve2 = (bound: number) => {
  let steps = 0
  let position: Coords = [0, 0]
  const map = new Map<Point, number>([['0,0', 1]])

  // Taking a step still means applying a directional vector to the last
  // recorded set of coordinates. But the stored value depends on the sum of the
  // value of the recorded neighbors.
  const step = (vector: Coords) => {
    position = $.applyVector(position, vector)

    const sum = $.sum(
      $.surrounding(position).map(coords => map.get($.toPoint(coords)) || 0)
    )

    map.set($.toPoint(position), sum)

    return sum
  }

  const peek = () => map.get($.toPoint(position))

  while (true) {
    steps++
    for (let i = 0; i < steps; i++) if (step(EAST) > bound) return peek()
    for (let i = 0; i < steps; i++) if (step(NORTH) > bound) return peek()
    steps++
    for (let i = 0; i < steps; i++) if (step(WEST) > bound) return peek()
    for (let i = 0; i < steps; i++) if (step(SOUTH) > bound) return peek()
  }
}

export const run = (bound: number, part2: boolean = false) => {
  return part2 ? resolve2(bound) : resolve(bound)
}
