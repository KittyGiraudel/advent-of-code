import { Coords, Point } from '../types'

/**
 * Split a string into its numeric part (separated by commas), typically
 * coordinates.
 * @example toCoords('0,1') === [0, 1]
 * @example toCoords('0, 1') === [0, 1]
 * @example toCoords('0,1,2') === [0, 1, 2]
 * @example toCoords('0,  1,  2') === [0, 1, 2]
 */
const toCoords = (point: Point) => point.split(/,\s?/g).map(Number) as Coords

export default toCoords
