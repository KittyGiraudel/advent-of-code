const $ = require('../../helpers')

// Return the boundaries of a cubic area of the given width.
const getArea = (width = Infinity) => ({
  xMin: width * -1,
  xMax: width,
  yMin: width * -1,
  yMax: width,
  zMin: width * -1,
  zMax: width,
})

// Parse a given instruction into a set of boundaries and a sign.
const parseLine = line => {
  const [state, rest] = line.split(' ')
  const [xMin, xMax, yMin, yMax, zMin, zMax] = rest
    .match(/(-?\d+)/g)
    .map(Number)
  const sign = state === 'on' ? 1 : -1

  return { sign, xMin, xMax, yMin, yMax, zMin, zMax }
}

// Return the intersection of cuboids a and b (or null if non existent), as
// well as the new intersection’s sign based on the sign of the first cuboid.
const getIntersection = (a, b) => {
  const xMin = Math.max(a.xMin, b.xMin)
  const xMax = Math.min(a.xMax, b.xMax)
  const yMin = Math.max(a.yMin, b.yMin)
  const yMax = Math.min(a.yMax, b.yMax)
  const zMin = Math.max(a.zMin, b.zMin)
  const zMax = Math.min(a.zMax, b.zMax)

  if (xMin > xMax || yMin > yMax || zMin > zMax) return null

  return { sign: a.sign * -1, xMin, xMax, yMin, yMax, zMin, zMax }
}

const getVolume = cuboid =>
  (cuboid.xMax + 1 - cuboid.xMin) *
  (cuboid.yMax + 1 - cuboid.yMin) *
  (cuboid.zMax + 1 - cuboid.zMin)

const reboot = (input, max) => {
  const area = getArea(max)
  const instructions = input
    .map(parseLine)
    .filter(cuboid => !max || getIntersection(area, cuboid))

  const cuboids = instructions.reduce((acc, instruction) => {
    const intersections = acc
      .map(cuboid => getIntersection(cuboid, instruction))
      .filter(Boolean)
    if (instruction.sign === 1) intersections.push(instruction)
    return acc.concat(intersections)
  }, [])

  return $.sum(cuboids.map(cuboid => getVolume(cuboid) * cuboid.sign))
}

module.exports = { reboot }
