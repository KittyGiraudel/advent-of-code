import $ from '../../helpers'
import { Coords } from '../../types'

// Count the amount of trees encountered on a slope defined by given vector.
// @param grid - Rows of strings
// @param vector - X,Y vector
// @param Amount of trees
export const getTreeCountForSlope = (
  rows: Array<string>,
  vector: Coords
): number => {
  const width = rows[0].length
  const coords = [0, 0]
  const pings = []
  const length = Math.ceil(rows.length / vector[1])

  for (let i = 0; i < length; i++) {
    pings.push(rows[coords[1]][coords[0] % width])
    coords[0] += vector[0]
    coords[1] += vector[1]
  }

  return pings.filter(char => char === '#').length
}

// Compute the product of the amount of trees found on the slopes defined by
// the given vectors.
// @param grid - Rows of strings
// @param vectors - Array of X,Y vectors
export const getResult = (
  rows: Array<string>,
  vectors: Array<Coords>
): number =>
  $.product(vectors.map(vector => getTreeCountForSlope(rows, vector)))
