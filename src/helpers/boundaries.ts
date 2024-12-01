import type { Coords, QuadriCoords, TriCoords } from '../types'

/**
 * Retrieve the minimum and maximum values of a set of coordinates, reading x, y
 * z, and t keys if existing, otherwising array indices, thus providing support
 * for all 4 types of data structures. It returns an array on purposes as the
 * order of channels may vary (sometimes X comes first, sometimes Y does).
 */
function boundaries(items: Coords[]): [number, number, number, number]
function boundaries(
  items: TriCoords[]
): [number, number, number, number, number, number]
function boundaries(
  items: QuadriCoords[]
): [number, number, number, number, number, number, number, number]
function boundaries(items: Coords[] | TriCoords[] | QuadriCoords[]) {
  if (!items.length) return []

  if (items[0].length === 4) {
    const xs = items.map(coords => coords[0])
    const ys = items.map(coords => coords[1])
    const zs = items.map(coords => coords[2]) as number[]
    const ts = items.map(coords => coords[3]) as number[]

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
    const xs = items.map(coords => coords[0])
    const ys = items.map(coords => coords[1])
    const zs = items.map(coords => coords[2]) as number[]

    return [
      Math.min(...xs),
      Math.max(...xs),
      Math.min(...ys),
      Math.max(...ys),
      Math.min(...zs),
      Math.max(...zs),
    ]
  }

  const xs = items.map(coords => coords[0])
  const ys = items.map(coords => coords[1])

  return [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
}

export default boundaries
