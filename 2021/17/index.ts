import $ from '../../helpers'
import { Coords } from '../../types'

type State = {
  probe: Coords
  velocity: Coords
}

// Read the landing area’s boundaries from the given input knowing that the
// *lowest* Y value will be the first one of the pair, and not the second one,
// since the area stands below 0. For instance, `y=-10,-5`, and not.
export const getBoundaries = (input: string) => {
  const [xMin, xMax, yMax, yMin] = $.match(input, /(-?\d+)/g).map(Number)

  return [
    [xMin, xMax],
    [yMin, yMax],
  ] as [Coords, Coords]
}

// 1. Update the probe’s position based on the velocity.
// 2. Apply drag, shifting velocity’s X axis towards 0.
// 3. Apply gravity, decreasing velocity’s Y axis.
const drag = (x: number) => (x > 0 ? x - 1 : x < 0 ? x + 1 : x)
const step = ({ probe, velocity }: State) =>
  ({
    probe: $.applyVector(probe, velocity),
    velocity: [drag(velocity[0]), velocity[1] - 1],
  } as State)

export const isSuccessfulLaunch = (
  [[xMin, xMax], [yMin, yMax]]: [Coords, Coords],
  velocity: Coords
) => {
  let curr = step({ probe: [0, 0], velocity })
  let heights = []

  // While the probe has not gone beyond the upper X boundary, and below the
  // lower Y boundary, keep moving, recording the maximum height at the same
  // time.
  while (curr.probe[0] <= xMax && curr.probe[1] >= yMax) {
    const [x, y] = curr.probe
    heights.push(y)

    if ($.isClamped(x, xMin, xMax) && $.isClamped(y, yMax, yMin))
      return Math.max(...heights)

    curr = step(curr)
  }

  return null
}

const findSuccessfulLaunches = (input: string) => {
  const boundaries = getBoundaries(input)
  const [[, xMax], [, yMax]] = boundaries
  const heights = []

  // The initial X velocity cannot be below 0 (as it would be throwing the
  // probe in the wrong X direction), and cannot go beyond the upper X boundary
  // (as it would overshoot the target area on the first step).
  for (let x = 0; x <= xMax; x++) {
    // The initial Y velocity cannot go beyond the lower Y boundary (as it would
    // overshoot the target are on the first step). For the upper Y boundary, it
    // appears it cannot be higher than the positive lower Y boundary; there
    // must be a mathematical reason for that, but I don’t know it. ¯\_(ツ)_/¯
    for (let y = Math.abs(yMax); y >= yMax; y--) {
      // Record the launch as successful if it reports a maximum height.
      // Otherwise it never reached the landing area and is considered a fail.
      const height = isSuccessfulLaunch(boundaries, [x, y])
      if (height !== null) heights.push(height)
    }
  }

  return heights
}

const findMaxHeight = (input: string) =>
  Math.max(...findSuccessfulLaunches(input))

export const run = (input: string, part2: boolean = false) => {
  return part2 ? findSuccessfulLaunches(input).length : findMaxHeight(input)
}
