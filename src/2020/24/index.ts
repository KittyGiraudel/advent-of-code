import $ from '../../helpers'
import type { Coords, Point } from '../../types'

type Mappy = Map<Point, string>
type Cache = Map<string, Point[]>

const VECTORS: Record<string, Coords> = {
  e: [+2, 0],
  w: [-2, 0],
  nw: [-1, -1],
  ne: [+1, -1],
  se: [+1, +1],
  sw: [-1, +1],
}

// Parse a given line into a series of directions.
// @param line - Raw series of steps
const parseLine = (line: string) => {
  const directions: string[] = []
  let pointer = 0

  while (pointer < line.length) {
    if (['n', 's'].includes(line[pointer])) {
      directions.push(line[pointer] + line[pointer + 1])
      pointer += 2
    } else {
      directions.push(line[pointer])
      pointer++
    }
  }

  return directions.map(direction => VECTORS[direction]) as Coords[]
}

// Process given lines and store their outcome into a map.
// @param lines - Raw series of steps
const processLines = (lines: string[]) =>
  lines
    .map(parseLine)
    .map(vectors => vectors.reduce($.applyVector, [0, 0]))
    .map(coords => $.toPoint(coords))
    .reduce<Mappy>(
      (acc, key) => acc.set(key, acc.get(key) === 'B' ? 'W' : 'B'),
      new Map()
    )

// Get the coordinates of all 6 neighbours of the tile at the given coordinates.
// @param key - Stringified coordinates
// @param cache - Coordinates cache
// @return Stringified coordinates of all 6 neighbours
const getNeighborCoords = (key: Point, cache: Cache) => {
  const coords = $.toCoords(key)

  if (cache.has(key)) return cache.get(key) as Point[]

  const neighborCoords = Object.values(VECTORS)
    .map(vector => $.applyVector(coords, vector))
    .map(coords => $.toPoint(coords))

  cache.set(key, neighborCoords)

  return neighborCoords
}

// Flip a given tile based on its current side and the amount of black tiles it
// has around it.
// @param color - Tile color
// @param count - Amount of black tiles around it
const flip = (color: string, count: number) =>
  color === 'B' && (count === 0 || count > 2)
    ? 'W'
    : color === 'W' && count === 2
      ? 'B'
      : color

// Return the new color for the tile at given coords, based on its original
// color, leveraging cache.
// @param coords - Stringified coordinates
// @param origin - Origin map prior to cycling
// @param cache - Coordinates cache
const transition = (coords: Point, origin: Mappy, cache: Cache) => {
  const cell = origin.get(coords)
  const neighborCoords = getNeighborCoords(coords, cache)
  const neighbours = neighborCoords.map(coords => origin.get(coords))
  const count = neighbours.filter(tile => tile === 'B').length

  return flip(cell || 'W', count)
}

// Perform a cycle.
// @param origin - Storage map
// @param cache - Coordinates cache
const cycle = (origin: Mappy, cache: Cache) =>
  Array.from(origin.keys()).reduce<Mappy>((acc, key) => {
    getNeighborCoords(key, cache).forEach(coords => {
      if (acc.has(coords)) return
      acc.set(coords, transition(coords, origin, cache))
    })

    return acc.set(key, transition(key, origin, cache))
  }, new Map(origin))

// Count the amount of black tiles on the floor.
// @param map - Storage map
const countBlackTiles = (map: Mappy) =>
  Array.from(map.values()).filter(a => a === 'B').length

// Run the game of life on the given initial input for a certain amount of
// cycles.
// @param input - Rows
// @param cycles - Amount of cycles
// @param cache - Coordinates cache
export const gameOfLife = (
  lines: string[],
  cycles = 1,
  cache: Cache = new Map()
) =>
  countBlackTiles(
    $.array(cycles).reduce(map => cycle(map, cache), processLines(lines))
  )
