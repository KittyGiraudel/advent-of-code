const $ = require('../../helpers')

const mapOutSpace = grid => {
  const map = new Map()

  grid.forEach((row, y) =>
    row.split('').forEach((item, x) => {
      if (item === '#') map.set(`${x},${y}`, 0)
    })
  )

  const keys = Array.from(map.keys())

  keys.forEach(current => {
    const [xC, yC] = current.split(',').map(Number)
    const asteroids = Array.from(map.keys()).filter(key => current !== key)
    const vectors = asteroids.map(asteroid => {
      const [xD, yD] = asteroid.split(',').map(Number)
      const vector = [xD - xC, yD - yC]
      const gcd = $.findGCD(...vector)

      return vector.map(value => value / Math.abs(gcd)).join(',')
    })

    map.set(current, vectors)
  })

  return map
}

const findBestSpot = grid => {
  const map = mapOutSpace(grid)

  return Array.from(map.keys()).reduce((acc, key) => {
    const value = [...new Set(map.get(key))].length
    if (!acc) return [key, value]
    if (acc[1] < value) return [key, value]
    return acc
  }, null)
}

const toObj = point => {
  const points = point.split(',').map(Number)
  return { x: points[0], y: points[1] }
}

const getDistanceToPoint = pointA => pointB =>
  Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2))
const getAngleFromPoint = pointA => pointB =>
  90 + (Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180) / Math.PI

const vaporize = grid => {
  const map = mapOutSpace(grid)
  const [spot] = findBestSpot(grid)
  const center = toObj(spot)
  const getDistanceToCenter = getDistanceToPoint(center)
  const getAngleFromCenter = getAngleFromPoint(center)
  const asteroids = Array.from(map.keys())
    .filter(asteroid => asteroid !== spot)
    .map(coords => {
      const point = toObj(coords)
      const angle = getAngleFromCenter(point)
      point.angle = angle < 0 ? angle + 360 : angle
      return point
    })
    .sort((a, b) =>
      a.angle !== b.angle
        ? a.angle - b.angle
        : getDistanceToCenter(a) - getDistanceToCenter(b)
    )

  // Group asteroids per angle, so that we end up with an array of groups in
  // ascending order, each group holding coordinates of all asteroids sitting
  // on the same line to the center (thus same angle).
  const groups = asteroids.reduce((acc, { angle, x, y }) => {
    const group = acc.find(group => group.angle === angle)
    if (!group) acc.push({ angle, items: [{ x, y }] })
    else group.items.push({ x, y })
    return acc
  }, [])

  const max = Math.max(...groups.map(({ items }) => items.length))

  // Iterate as many times as there are items in the largest group (which
  // corresponds to the line on which there are the most asteroids in a row).
  // At each iteration, take the first item of each group (if there is any item
  // left in groups), and push it onto the final order. This corresponds to the
  // canon rotations.
  return Array.from({ length: max }).reduce(order => {
    groups
      .filter(group => group.items.length)
      .forEach(group => order.push(group.items.shift()))

    return order
  }, [])
}

module.exports = { mapOutSpace, findBestSpot, vaporize }