import $ from '../../helpers'
import { Coords, Grid, Point } from '../../types'

const generateMap = (input: string[]) =>
  input.reduce<Record<Point, string>>((acc, line) => {
    const match = line.match(/([xy])=(\d+), ([xy])=(\d+)..(\d+)/)!

    for (let i = +match[4]; i <= +match[5]; i++) {
      const ri = match[1] === 'y' ? +match[2] : i
      const ci = match[1] === 'x' ? +match[2] : i
      acc[$.toPoint([ri, ci])] = '#'
    }

    return acc
  }, {})

const fillLevel = (grid: Grid<string>, position: Coords) => {
  fillSide(grid, position, +1)
  fillSide(grid, position, -1)
}

const fillSide = (grid: Grid<string>, [ri, ci]: Coords, ciOffset: number) => {
  while (grid.get([ri, ci]) !== '#') {
    grid.set([ri, ci], grid.get([ri + 1, ci]) === '|' ? '|' : '~')
    ci += ciOffset
  }
}

const hasWall = (grid: Grid<string>, [ri, ci]: Coords, ciOffset: number) => {
  while (true) {
    if (!grid.get([ri, ci])) return false
    if (grid.get([ri, ci]) === '.') return false
    if (grid.get([ri, ci]) === '#') return true
    ci += ciOffset
  }
}

const hasWallOnBothSides = (grid: Grid<string>, position: Coords) => {
  return hasWall(grid, position, +1) && hasWall(grid, position, -1)
}

const fillFrom = (grid: Grid<string>, position: Coords, maxRi: number) => {
  if (position[0] >= maxRi) return

  const [, E, S, W] = $.bordering(position)

  // If the south cell is free, fill it.
  if (grid.get(S) === '.') {
    grid.set(S, '|')
    fillFrom(grid, S, maxRi)
  }

  // If the south cell is filled and the east cell is free, fill it.
  if (['#', '~'].includes(grid.get(S)) && grid.get(E) === '.') {
    grid.set(E, '|')
    fillFrom(grid, E, maxRi)
  }

  // If the south cell is filled and the west cell is free, fill it.
  if (['#', '~'].includes(grid.get(S)) && grid.get(W) === '.') {
    grid.set(W, '|')
    fillFrom(grid, W, maxRi)
  }

  // If there are walls on both side of the current cell, fill the whole level
  // with water.
  if (hasWallOnBothSides(grid, position)) fillLevel(grid, position)
}

export const scan = (
  input: string[],
  source: Coords = [0, 500]
): [number, number] => {
  const map = generateMap(input)
  const [minRi, maxRi, minCi, maxCi] = $.boundaries(
    (Object.keys(map) as Point[]).map($.toCoords)
  )
  const grid = new $.Grid(
    maxCi + 1,
    maxRi + 1,
    coords => map[$.toPoint(coords)] || '.'
  )

  // Honestly I couldn’t figure out to solve this problem so I took over a
  // TypeScript solution from GitHub:
  // https://github.com/andrewgreenh/advent-of-code/blob/498bc454de08abaa7d8efb6b1220410d3b5e5ff6/TypeScript/src/2018/17.ts
  // I also issued a fix for two minor edge cases in that solution, that I
  // encountered when running it on my input:
  // https://github.com/andrewgreenh/advent-of-code/pull/19
  fillFrom(grid, source, maxRi)

  const counters = $.frequency(grid.rows.slice(minRi, maxRi + 1).flat())

  return [counters['~'], counters['|']]
}
