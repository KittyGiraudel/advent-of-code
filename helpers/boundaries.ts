import { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Retrieve the minimum and maximum values of a set of coordinates, reading
 * x, y, z keys if existing, otherwising array indices, thus providing support
 * for both types of data structures. It returns an array on purposes as the
 * order of channels may vary (sometimes X comes first, sometimes Y does).
 */
function boundaries(items: Coords[]): [number, number, number, number]
function boundaries(
  items: TriCoords[]
): [number, number, number, number, number, number]
function boundaries(
  items: QuadriCoords[]
): [number, number, number, number, number, number, number, number]
function boundaries(items: any[]) {
  if (!items.length) return []

  if (items[0].length === 4) {
    const xs = (items as QuadriCoords[]).map(coords => coords[0])
    const ys = (items as QuadriCoords[]).map(coords => coords[1])
    const zs = (items as QuadriCoords[]).map(coords => coords[2])
    const ts = (items as QuadriCoords[]).map(coords => coords[3])

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

  if (items[0].length === 3) {
    const xs = (items as TriCoords[]).map(coords => coords[0])
    const ys = (items as TriCoords[]).map(coords => coords[1])
    const zs = (items as TriCoords[]).map(coords => coords[2])

    return [
      Math.min(...xs),
      Math.max(...xs),
      Math.min(...ys),
      Math.max(...ys),
      Math.min(...zs),
      Math.max(...zs),
    ]
  }

  const xs = (items as Coords[]).map(coords => coords[0])
  const ys = (items as Coords[]).map(coords => coords[1])

  return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
}

export default boundaries
