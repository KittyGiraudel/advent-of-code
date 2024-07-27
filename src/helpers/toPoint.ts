import type {
  Coords,
  Point,
  QuadriCoords,
  QuadriPoint,
  TriCoords,
  TriPoint,
} from '../types'

/**
 * Join a coordinate expressed as an array into a string separated by comma,
 * typically to use it as a key for a map or a set.
 * @example toPoint([0, 1]) === '0,1'
 * @example toPoint([0, 1, 2]) === '0,1,2'
 */
function toPoint(coords: Coords): Point
function toPoint(coords: TriCoords): TriPoint
function toPoint(coords: QuadriCoords): QuadriPoint
function toPoint(coords: number[]): string
function toPoint(coords: number[]): string {
  return coords.join(',')
}

export default toPoint
