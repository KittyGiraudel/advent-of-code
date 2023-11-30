import toCoordsObj from './toCoordsObj'
import {
  Coords,
  CoordsObj,
  QuadriCoords,
  QuadriCoordsObj,
  TriCoords,
  TriCoordsObj,
} from '../types'

/**
 * Retrieve the minimum and maximum values of a set of coordinates, reading
 * x, y, z keys if existing, otherwising array indices, thus providing support
 * for both types of data structures. It returns an array on purposes as the
 * order of channels may vary (sometimes X comes first, sometimes Y does).
 */
function boundaries(items: Coords[]): [number, number, number, number]
function boundaries(items: CoordsObj[]): [number, number, number, number]
function boundaries(
  items: TriCoords[]
): [number, number, number, number, number, number]
function boundaries(
  items: TriCoordsObj[]
): [number, number, number, number, number, number]
function boundaries(
  items: QuadriCoords[]
): [number, number, number, number, number, number, number, number]
function boundaries(
  items: QuadriCoordsObj[]
): [number, number, number, number, number, number, number, number]
function boundaries(items: any[]) {
  if (!items.length) return []

  items = items.map(item => {
    if (!Array.isArray(item)) return item
    if (item.length === 4) return toCoordsObj(item as QuadriCoords)
    if (item.length === 3) return toCoordsObj(item as TriCoords)
    return toCoordsObj(item as Coords)
  })

  if ('t' in items[0]) {
    const xs = items.map(coords => (coords as QuadriCoordsObj).x)
    const ys = items.map(coords => (coords as QuadriCoordsObj).y)
    const zs = items.map(coords => (coords as QuadriCoordsObj).z)
    const ts = items.map(coords => (coords as QuadriCoordsObj).t)

    return [
      Math.min(...xs),
      Math.max(...xs),
      Math.min(...ys),
      Math.max(...ys),
      Math.min(...zs),
      Math.max(...zs),
      Math.min(...ts),
      Math.max(...ts),
    ]
  }

  if ('z' in items[0]) {
    const xs = items.map(coords => (coords as TriCoordsObj).x)
    const ys = items.map(coords => (coords as TriCoordsObj).y)
    const zs = items.map(coords => (coords as TriCoordsObj).z)

    return [
      Math.min(...xs),
      Math.max(...xs),
      Math.min(...ys),
      Math.max(...ys),
      Math.min(...zs),
      Math.max(...zs),
    ]
  }

  const xs = items.map(coords => (coords as CoordsObj).x)
  const ys = items.map(coords => (coords as CoordsObj).y)

  return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
}

export default boundaries
