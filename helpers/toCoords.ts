import {
  Coords,
  Point,
  QuadriCoords,
  QuadriPoint,
  TriCoords,
  TriPoint,
} from '../types'

/**
 * Split a string into its numeric part (separated by commas), typically
 * coordinates.
 * @example toCoords('0,1') === [0, 1]
 * @example toCoords('0, 1') === [0, 1]
 * @example toCoords('0,1,2') === [0, 1, 2]
 * @example toCoords('0,  1,  2') === [0, 1, 2]
 */
function toCoords(point: Point): Coords
function toCoords(point: TriPoint): TriCoords
function toCoords(point: QuadriPoint): QuadriCoords
function toCoords(point: string): number[] {
  return point.split(/,\s?/g).map(Number)
}

export default toCoords
