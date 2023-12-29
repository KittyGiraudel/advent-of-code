import $ from '../../helpers'
import { Coords, CoordsAndPoint, Grid, Point } from '../../types'

// Find the low points in the grid. To do so, iterate over every row, then every
// number, and get its 4 neighbors. If all existing neighbors are higher than
// the current point, it’s a low point.
const getLowPoints = (grid: Grid<number>) =>
  grid.reduce<Coords[]>((acc, value, ri, ci) => {
    const coords: Coords = [ri, ci]

    if (
      $.bordering(coords)
        .map(coords => grid.get(coords) ?? Infinity)
        .every(n => n > value)
    ) {
      acc.push(coords)
    }

    return acc
  }, [])

const getBasin = (
  grid: Grid<number>,
  position: Coords,
  evaluated: Point[] = []
): Coords[] => {
  // Look for the neighbors of the current point, and preserve only the
  // neighbors that:
  // - Have not been visited yet.
  // - Exist (as in, are within the bounds of the grid).
  // - Are not high points (value of 9).
  const neighbors = $.bordering(position).filter(coords => {
    if (evaluated.includes($.toPoint(coords))) return false
    if (typeof grid.get(coords) === 'undefined') return false
    if (grid.get(coords) === 9) return false
    return true
  })

  // Start from the neighbors of the current point, and recursively find the
  // neighbors of each neighbor that belong to the basin.
  return neighbors.reduce<Coords[]>((coords, neighbor) => {
    const points = coords.map(coords => $.toPoint(coords))
    const nCoords = getBasin(grid, neighbor, evaluated.concat(points))

    return coords.concat(nCoords)
  }, neighbors)
}

const sumLowPointsRisk = (rows: string[]) => {
  const grid = $.Grid.fromRows(rows, Number)
  const lowPoints = getLowPoints(grid)

  return $.sum(
    lowPoints.map((coords: Coords) => grid.get(coords)).map(p => p + 1)
  )
}

const getProductOfBiggestBasins = (rows: string[]) => {
  const grid = $.Grid.fromRows(rows, Number)
  const lowPoints = getLowPoints(grid)

  return $.product(
    lowPoints
      .map(position => getBasin(grid, position).length)
      .sort((a, b) => a - b)
      .slice(-3)
  )
}

export const run = (input: string[], part2: boolean = false) => {
  return part2 ? getProductOfBiggestBasins(input) : sumLowPointsRisk(input)
}
