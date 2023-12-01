import $ from '../../helpers'
import { Grid, Coords, Point } from '../../types'

const generateMap = (input: string[]) =>
  input.reduce<Record<Point, string>>((acc, line) => {
    const match = line.match(/([xy])=(\d+), ([xy])=(\d+)..(\d+)/)!

    for (let i = +match[4]; i <= +match[5]; i++) {
      const y = match[1] === 'y' ? +match[2] : i
      const x = match[1] === 'x' ? +match[2] : i
      acc[$.toPoint([x, y])] = '#'
    }

    return acc
  }, {})

const fillLevel = (grid: Grid<string>, position: Coords) => {
  fillSide(grid, position, +1)
  fillSide(grid, position, -1)
}

const fillSide = (grid: Grid<string>, [x, y]: Coords, xOffset: number) => {
  let currentX = x
  while (true) {
    if (grid[y][currentX] === '#') return
    grid[y][currentX] = grid[y + 1][currentX] === '|' ? '|' : '~'
    currentX += xOffset
  }
}

const hasWall = (grid: Grid<string>, [x, y]: Coords, xOffset: number) => {
  let currentX = x
  while (true) {
    if (grid[y][currentX] === '.') return false
    if (grid[y][currentX] === '#') return true
    if (!grid[y][currentX]) return false
    currentX += xOffset
  }
}

const hasBothWalls = (grid: Grid<string>, position: Coords) => {
  return hasWall(grid, position, 1) && hasWall(grid, position, -1)
}

const fillFrom = (grid: Grid<string>, [x, y]: Coords, maxY: number) => {
  if (y >= maxY) return

  // If the south cell is free, fill it.
  if (grid[y + 1][x] === '.') {
    grid[y + 1][x] = '|'
    fillFrom(grid, [x, y + 1], maxY)
  }

  // If the south cell is filled and the east cell is free, fill it.
  if (['#', '~'].includes(grid[y + 1][x]) && grid[y][x + 1] === '.') {
    grid[y][x + 1] = '|'
    fillFrom(grid, [x + 1, y], maxY)
  }

  // If the south cell is filled and the west cell is free, fill it.
  if (['#', '~'].includes(grid[y + 1][x]) && grid[y][x - 1] === '.') {
    grid[y][x - 1] = '|'
    fillFrom(grid, [x - 1, y], maxY)
  }

  // If there are walls on both side of the current cell, fill the whole level
  // with water.
  if (hasBothWalls(grid, [x, y])) {
    fillLevel(grid, [x, y])
  }
}

export const scan = (
  input: string[],
  source: Coords = [500, 0]
): [number, number] => {
  const map = generateMap(input)
  const [, maxX, minY, maxY] = $.boundaries(
    (Object.keys(map) as Point[]).map($.toCoords)
  )
  const grid = $.grid.init(
    maxX + 1,
    maxY + 1,
    (x, y) => map[$.toPoint([x, y])] || '.'
  )

  // Honestly I couldn’t figure out to solve this problem so I took over a
  // TypeScript solution from GitHub:
  // https://github.com/andrewgreenh/advent-of-code/blob/498bc454de08abaa7d8efb6b1220410d3b5e5ff6/TypeScript/src/2018/17.ts
  // I also issued a fix for two minor edge cases in that solution, that I
  // encountered when running it on my input:
  // https://github.com/andrewgreenh/advent-of-code/pull/19
  fillFrom(grid, source, maxY)

  const counters = $.count(grid.slice(minY, maxY + 1).flat())

  return [counters['~'], counters['|']]
}
