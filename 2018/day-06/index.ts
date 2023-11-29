import $ from '../../helpers'
import { Coords, Point } from '../../types'

export const mapOut = (lines: string[], limit?: number) => {
  const points: Point[] = lines.map(line => line.replace(' ', '')) as Point[]
  const counters: Map<number, number> = new Map()
  const edges: Set<number> = new Set()
  const [minX, maxX, minY, maxY] = $.boundaries(points.map($.toCoords))
  let regionSize = 0

  // Iterate between the X position of the leftmost point and the X poxition
  // of the rightmost point on the X-axis, and from the Y position of the
  // topmost point to the Y position of the bottommost point.
  for (let ci = minX; ci <= maxX; ci++) {
    for (let ri = minY; ri <= maxY; ri++) {
      const current: Point = `${ci},${ri}`
      const coords = $.toCoords(current)

      // Compute the Manhattan distances between the current point and every
      // point in the list.
      const pointsByDist = points
        .map(point => ({ point, dist: $.manhattan($.toCoords(point), coords) }))
        .sort((a, b) => b.dist - a.dist)

      // If the sum of all the distances is within the self-imposed limit (32
      // for the sample, and 10,000 for the real deal), it counts within the
      // safe region.
      if ($.sum(pointsByDist.map(a => a.dist)) < limit) {
        regionSize++
      }

      const closest = pointsByDist.pop()

      // Unless the current tile is equi-distant to 2+ points from the list, it
      // belongs to the pool defined by the closest point.
      if (closest.dist !== pointsByDist.at(-1).dist) {
        const id = points.indexOf(closest.point)
        counters.set(id, (counters.get(id) || 0) + 1)

        // If the current tile sits on an edge of the grid (in which case it
        // belongs to an infinite pool), record that edge so that pool can
        // eventually be discarded.
        if (ci === minX || ri === minY || ci === maxX || ri === maxY)
          edges.add(id)
      }
    }
  }

  return {
    safeRegionSize: regionSize,
    largestRegionSize: Array.from(counters.entries())
      .filter(([n]) => !edges.has(n))
      .sort((a, b) => a[1] - b[1])
      .pop()[1],
  }
}
