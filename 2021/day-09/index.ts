import $ from '../../helpers'
import { Coords, CoordsAndPoint, Grid, Point } from '../../types'

// Find the low points in the grid. To do so, iterate over every row, then every
// number, and get its 4 neighbors. If all existing neighbors are higher than
// the current point, it’s a low point.
const getLowPoints = (grid: Grid<number>): Coords[] =>
  $.grid.reduce(
    grid,
    (acc, point, ri, ci) => {
      const coords: Coords = [ri, ci]

      if (
        $.bordering(coords, 'COORDS')
          .map((coords: Coords) => $.access(grid, coords) ?? Infinity)
          .every((n: number) => n > point)
      ) {
        acc.push(coords as Coords)
      }

      return acc
    },
    []
  )

const getBasin = (
  grid: Grid<number>,
  position: Coords,
  evaluated: Point[] = []
): CoordsAndPoint[] => {
  // Look for the neighbors of the current point, and preserve only the
  // neighbors that:
  // - Have not been visited yet.
  // - Exist (as in, are within the bounds of the grid).
  // - Are not high points (value of 9).
  const neighbors: CoordsAndPoint[] = $.bordering(position, 'BOTH').filter(
    ({ coords, point }) => {
      if (evaluated.includes(point)) return false
      if (typeof $.access(grid, coords) === 'undefined') return false
      if ($.access(grid, coords) === 9) return false
      return true
    }
  )

  // Start from the neighbors of the current point, and recursively find the
  // neighbors of each neighbor that belong to the basin.
  return neighbors.reduce(
    (coords: CoordsAndPoint[], neighbor: CoordsAndPoint) => {
      const points = coords.map(({ point }) => point)
      const nCoords = getBasin(grid, neighbor.coords, evaluated.concat(points))

      return coords.concat(nCoords)
    },
    neighbors
  )
}

export const sumLowPointsRisk = (rows: string[]): number => {
  const grid = $.grid.create(rows, Number)
  const lowPoints = getLowPoints(grid)

  return $.sum(
    lowPoints.map((coords: Coords) => $.access(grid, coords)).map(p => p + 1)
  )
}

export const getProductOfBiggestBasins = (
  rows: string[],
  amount: number = 3
): number => {
  const grid = $.grid.create(rows, Number)
  const lowPoints = getLowPoints(grid)

  return $.product(
    lowPoints
      .map(position => getBasin(grid, position).length)
      .sort((a, b) => a - b)
      .slice(amount * -1)
  )
}