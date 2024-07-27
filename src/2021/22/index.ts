import $ from '../../helpers'

type Cube = {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  zMin: number
  zMax: number
  sign: number
}

// Return the boundaries of a cubic area of the given width.
const getArea = (width: number = Number.POSITIVE_INFINITY): Cube => ({
  xMin: width * -1,
  xMax: width,
  yMin: width * -1,
  yMax: width,
  zMin: width * -1,
  zMax: width,
  sign: Number.POSITIVE_INFINITY,
})

// Parse a given instruction into a set of boundaries and a sign.
const parseLine = (line: string) => {
  const [state, rest] = line.split(' ')
  const [xMin, xMax, yMin, yMax, zMin, zMax] = $.match(rest, /(-?\d+)/g).map(
    Number
  )
  const sign = state === 'on' ? 1 : -1

  return { sign, xMin, xMax, yMin, yMax, zMin, zMax } as Cube
}

// Return the intersection of cuboids a and b (or null if non existent), as
// well as the new intersection’s sign based on the sign of the first cuboid.
const getIntersection = (a: Cube, b: Cube) => {
  const xMin = Math.max(a.xMin, b.xMin)
  const xMax = Math.min(a.xMax, b.xMax)
  const yMin = Math.max(a.yMin, b.yMin)
  const yMax = Math.min(a.yMax, b.yMax)
  const zMin = Math.max(a.zMin, b.zMin)
  const zMax = Math.min(a.zMax, b.zMax)

  if (xMin > xMax || yMin > yMax || zMin > zMax) return null

  return { sign: a.sign * -1, xMin, xMax, yMin, yMax, zMin, zMax } as Cube
}

const getVolume = (cuboid: Cube) =>
  (cuboid.xMax + 1 - cuboid.xMin) *
  (cuboid.yMax + 1 - cuboid.yMin) *
  (cuboid.zMax + 1 - cuboid.zMin)

export const run = (input: string[], max: number) => {
  const area = getArea(max)
  const instructions = input
    .map(parseLine)
    .filter(cuboid => !max || getIntersection(area, cuboid))

  const cuboids = instructions.reduce<Cube[]>((acc, instruction) => {
    const intersections = acc
      .map(cuboid => getIntersection(cuboid, instruction))
      .filter((cube): cube is Cube => Boolean(cube))
    if (instruction.sign === 1) intersections.push(instruction)
    return acc.concat(intersections)
  }, [])

  return $.sum(cuboids.map(cuboid => getVolume(cuboid) * cuboid.sign))
}
