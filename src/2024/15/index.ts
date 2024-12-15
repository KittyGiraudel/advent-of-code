import $ from '../../helpers'
import type { Coords } from '../../types'

const VECTORS = {
  '^': [-1, 0] as Coords,
  '>': [0, +1] as Coords,
  v: [+1, 0] as Coords,
  '<': [0, -1] as Coords,
}
type Orientation = keyof typeof VECTORS

function unique(coords: Coords[]) {
  const points = coords.map(coords => $.toPoint(coords))
  const uniquePoints = Array.from(new Set(points))
  const uniqueCoords = uniquePoints.map(point => $.toCoords(point))

  return uniqueCoords
}

export const run = (input: [string, string], part2 = false) => {
  let grid = $.Grid.fromRows(input[0].split('\n'))
  const moves = Array.from(input[1].split('\n').join('')) as Orientation[]

  if (part2) {
    const largeGrid = new $.Grid<string>(grid.width * 2, grid.height)

    grid.forEach((value, coords) => {
      if (value === '#') {
        largeGrid.set([coords[0], coords[1] * 2], '#')
        largeGrid.set([coords[0], coords[1] * 2 + 1], '#')
      } else if (value === 'O') {
        largeGrid.set([coords[0], coords[1] * 2], '[')
        largeGrid.set([coords[0], coords[1] * 2 + 1], ']')
      } else if (value === '.') {
        largeGrid.set([coords[0], coords[1] * 2], '.')
        largeGrid.set([coords[0], coords[1] * 2 + 1], '.')
      } else if (value === '@') {
        largeGrid.set([coords[0], coords[1] * 2], '@')
        largeGrid.set([coords[0], coords[1] * 2 + 1], '.')
      }
    })

    grid = largeGrid
  }

  const tryMoving = (positions: Coords[], vector: Coords): Coords[] => {
    const next = $.applyVector(positions[0], vector)
    const type = grid.get(next)

    // If the next position is free, we can safely move.
    if (type === '.') return positions

    // If the next position is a box (part 1 specific), we add it to our array
    // of moved items and go deeper.
    if (type === 'O') return tryMoving([next, ...positions], vector)

    // If the next position is a box (part 2 specific) and we are pushing
    // horizontally, we add it to our array of moved items and go deeper.
    if ((type === '[' || type === ']') && vector[0] === 0) {
      return tryMoving([next, ...positions], vector)
    }

    // If the next position is a box (part 2 specific) and we are pushing
    // vertically, we check (deep) whether both the left side and the right side
    // can be pushed, and if they are, we can safely move.
    if (type === '[' || type === ']') {
      const dx = type === '[' ? +1 : -1
      const colA = tryMoving([next], vector)
      const colB = tryMoving([$.applyVector(next, [0, dx])], vector)
      return !colA.length || !colB.length
        ? []
        : [...colA, ...colB, ...positions]
    }

    return []
  }

  let robot = grid.findCoords(value => value === '@') as Coords

  moves.forEach(move => {
    const vector = VECTORS[move]
    const moves = tryMoving([robot], vector)

    unique(moves).forEach(coords => {
      const value = grid.get(coords)
      const next = $.applyVector(coords, vector)
      grid.set(coords, '.')
      grid.set(next, value)
      if (value === '@') robot = next
    })
  })

  return grid.reduce(
    (acc, value, coords) =>
      acc + (value === 'O' || value === '[' ? coords[0] * 100 + coords[1] : 0),
    0
  )
}
