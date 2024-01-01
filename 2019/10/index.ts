import $ from '../../helpers'
import { Coords, Point } from '../../types'

type CoordsWithAngle = { coords: Coords; angle: number }
type Group = { items: Coords[]; angle: number }

export const mapOutSpace = (rows: string[]) => {
  const grid = $.Grid.fromRows(rows)
  const map = grid.reduce<Map<Point, Point[]>>(
    (acc, v, [ri, ci]) => (v === '#' ? acc.set(`${ci},${ri}`, []) : acc),
    new Map()
  )

  const keys: Point[] = Array.from(map.keys())

  keys.forEach(current => {
    const [xC, yC] = $.toCoords(current)
    const asteroids: Point[] = keys.filter(key => current !== key)
    const vectors: Point[] = asteroids.map((asteroid: Point) => {
      const [xD, yD] = $.toCoords(asteroid)
      const vector: Coords = [xD - xC, yD - yC]
      const gcd = $.gcd(vector[0], vector[1])

      return $.toPoint(vector.map(value => value / Math.abs(gcd)) as Coords)
    })

    map.set(current, vectors)
  })

  return map
}

export const findBestSpot = (grid: string[]) => {
  const map = mapOutSpace(grid)

  return Array.from(map.keys()).reduce<[Point, number]>(
    (acc, key: Point, index) => {
      const value = new Set(map.get(key)).size
      return index === 0 || acc[1] < value ? [key, value] : acc
    },
    ['0,0', 0]
  )
}

const toCoordsWithAngle = (point: Point): CoordsWithAngle => ({
  coords: $.toCoords(point),
  angle: Infinity,
})

const getAngleFromCoords = (coordsA: Coords) => (coordsB: Coords) =>
  90 +
  (Math.atan2(coordsB[1] - coordsA[1], coordsB[0] - coordsA[0]) * 180) / Math.PI

export const vaporize = (grid: string[]) => {
  const map = mapOutSpace(grid)
  const [spot] = findBestSpot(grid)
  const center = toCoordsWithAngle(spot)
  const getAngleFromCenter = getAngleFromCoords(center.coords)
  const asteroids = Array.from(map.keys())
    .filter(asteroid => asteroid !== spot)
    .map(coords => {
      const coordsWithAngle = toCoordsWithAngle(coords)
      const angle = getAngleFromCenter(coordsWithAngle.coords)
      coordsWithAngle.angle = angle < 0 ? angle + 360 : angle
      return coordsWithAngle
    })
    .sort((a, b) =>
      a.angle !== b.angle
        ? a.angle - b.angle
        : $.manhattan(center.coords, a.coords) -
          $.manhattan(center.coords, b.coords)
    )

  // Group asteroids per angle, so that we end up with an array of groups in
  // ascending order, each group holding coordinates of all asteroids sitting
  // on the same line to the center (thus same angle).
  const groups = asteroids.reduce<Group[]>((acc, { angle, coords }) => {
    const group = acc.find(group => group.angle === angle)
    if (!group) acc.push({ angle, items: [coords] })
    else group.items.push(coords)
    return acc
  }, [])

  const max = Math.max(...groups.map(({ items }) => items.length))

  // Iterate as many times as there are items in the largest group (which
  // corresponds to the line on which there are the most asteroids in a row).
  // At each iteration, take the first item of each group (if there is any item
  // left in groups), and push it onto the final order. This corresponds to the
  // canon rotations.
  return $.array(max).reduce<Coords[]>(order => {
    groups
      .filter(group => group.items.length)
      .forEach(group => order.push(group.items.shift()!))

    return order
  }, [])
}
