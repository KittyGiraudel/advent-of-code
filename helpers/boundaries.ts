import { Coords, CoordsObj } from '../types'

/**
 * Retrieve the minimum and maximum values of a set of coordinates, reading
 * x, y, z keys if existing, otherwising array indices, thus providing support
 * for both types of data structures. It returns an array on purposes as the
 * order of channels may vary (sometimes X comes first, sometimes Y does).
 */
const boundaries = (items: (Coords | CoordsObj)[]): number[] => {
  const xs = items.map(point => (point as CoordsObj).x ?? (point as Coords)[0])
  const ys = items.map(point => (point as CoordsObj).y ?? (point as Coords)[1])
  const zs = items.map(point => (point as CoordsObj).z ?? (point as Coords)[2])

  return [
    Math.min(...xs),
    Math.max(...xs),
    Math.min(...ys),
    Math.max(...ys),
    Math.min(...zs),
    Math.max(...zs),
  ]
}

export default boundaries
