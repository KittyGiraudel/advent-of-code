import { Coords, Point } from '../types'

// Split a string into its numeric part (separated by commas), typically
// coordinates.
const toCoords = (point: Point): Coords =>
  point.split(/,\s?/g).map(Number) as Coords

export default toCoords
