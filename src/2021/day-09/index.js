const $ = require('../../helpers')

// Find the low points in the grid. To do so, iterate over every row, then every
// number, and get its 4 neighbors. If all existing neighbors are higher than
// the current point, it’s a low point.
const getLowPoints = rows =>
  rows.reduce(
    (lowPoints, row, ri) =>
      row
        .map((point, ci) =>
          $.neighbors
            .bordering(ri, ci)
            .map(([ri, ci]) => rows[ri]?.[ci] ?? Infinity)
            .every(n => n > point)
            ? [ri, ci]
            : null
        )
        .filter(Boolean)
        .concat(lowPoints),
    []
  )

const getBasin = (grid, point, evaluated = []) => {
  // Look for the neighbors of the current point, and preserve only the
  // neighbors that:
  // - Have not been visited yet.
  // - Exist (as in, are within the bounds of the grid).
  // - Are not high points (value of 9).
  const neighbors = $.neighbors.bordering(...point).filter(([ri, ci]) => {
    if (evaluated.includes([ri, ci].join(','))) return false
    if (typeof grid[ri]?.[ci] === 'undefined') return false
    if (grid[ri]?.[ci] === 9) return false
    return true
  })

  // Start from the neighbors of the current point, and recursively find the
  // neighbors of each neighbor that belong to the basin.
  return neighbors.reduce((points, neighbor) => {
    const pointsAsStrings = points.map(neighbor => neighbor.join(','))
    const nPoints = getBasin(grid, neighbor, evaluated.concat(pointsAsStrings))

    return points.concat(nPoints)
  }, neighbors)
}

const sumLowPointsRisk = rows => {
  const grid = $.grid.create(rows, Number)
  const lowPoints = getLowPoints(grid)

  return $.sum(lowPoints.map(([ri, ci]) => grid[ri][ci]).map(p => p + 1))
}

const getProductOfBiggestBasins = (rows, amount = 3) => {
  const grid = $.grid.create(rows, Number)
  const lowPoints = getLowPoints(grid)

  return $.product(
    lowPoints
      .map(point => getBasin(grid, point).length)
      .sort((a, b) => a - b)
      .slice(amount * -1)
  )
}

module.exports = { sumLowPointsRisk, getProductOfBiggestBasins }
