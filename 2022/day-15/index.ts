import $ from '../../helpers'
import { Coords } from '../../types'

const isWithinSensorRange = ({ position, radius }, coords) =>
  $.manhattan(position, coords) <= radius

const isOutOfRange = (signals, coords) =>
  signals.every(signal => !isWithinSensorRange(signal, coords))

const isValidCandidate = (signals, coords, max) =>
  $.isClamped(coords[0], 0, max) &&
  $.isClamped(coords[1], 0, max) &&
  isOutOfRange(signals, coords)

type Sensor = {
  position: Coords
  beacon: Coords
  radius: number
}

type Diagonal = {
  from: Coords
  to: Coords
  vector: Coords
}

// The goal of part 2 is to find the position of a beacon that is not detected
// by any of the sensor (because they all detect another beacon closer to them).
// This means there must be only one set of coords in the 0,4000000->0,4000000
// space that is not detected by any sensor.
export const detect = (input: string[], y: number, max?: number) => {
  const data = input.map(line => line.match(/-?\d+/g).map(Number))
  const sensors: Sensor[] = data.map(([sx, sy, bx, by]) => {
    const position: Coords = [sx, sy]
    const beacon: Coords = [bx, by]

    return { position, beacon, radius: $.manhattan(position, beacon) }
  })

  // Part 1: It’s not the most elegant, but it works fine enough on the real
  // input, albeit a little slow (~1.5 second). Essentially it iterates on the
  // given row (`y` parameter) between the left receiving edge of leftmost
  // sensor and the right receiving edge of the rightmost sensor. For each set
  // of coordinates on that line, it checks whether it is not already a beacon
  // and within the range of a sensor.
  if (y && !max) {
    const sorted = sensors.sort((a, b) => a.position[0] - b.position[0])
    const minX = sorted[0].position[0] - sorted[0].radius
    const maxX = sorted.at(-1).position[0] + sorted.at(-1).radius

    let count = 0

    for (let x = minX; x < maxX; x++) {
      const coords: Coords = [x, y]
      const point = $.toPoint(coords)

      if (
        sensors.some(
          sensor =>
            isWithinSensorRange(sensor, coords) &&
            $.toPoint(sensor.beacon) !== point
        )
      ) {
        count++
      }
    }

    return count
  }

  // Truth be told, I am not 100% on how this works although I have written that
  // solution on my own. The premise is based on the following Reddit post that
  // explains a potential searching algorithm. Basically the idea is that given
  // there is only a single position on the entire space that is not within
  // range of any sensor, it has to live at the intersection of two diagonals
  // between 2 pairs of sensor detection areas. I played with the idea for a
  // while but couldn’t implement it. Then another Reddit post gave me another
  // clue: to play with “borders”. So the solution below is a mix between both
  // approaches.
  // Ref: https://www.reddit.com/r/adventofcode/comments/zmjzu7/2022_day_15_part_2_no_search_formula/
  // Ref: https://www.reddit.com/r/adventofcode/comments/zmcn64/comment/j0d915u/?utm_source=share&utm_medium=web2x&context=3
  //
  // We loop through all sensors until we find what we’re looking for, at which
  // point we stop early. For each sensor, we iterate through its perimeter,
  // right outside of its detection range. If the current cell on that edge is
  // within the expected range, and *not* within the range of any of the sensor,
  // then we have found our match and we can stop early (since there is only a
  // single point in total).
  const candidate = sensors.reduce((candidate, sensor, _, sensors) => {
    // If we have found a candidate, we’re done here and we can stop looking. It
    // may be faster with a for loop we can shortcut, but the sensors list is 32
    // items long, so this would make virtually no difference.
    if (candidate) return candidate

    // The top, right, bottom and left positions are *not* contained within the
    // sensor detection area: they are around it (on the edge), since that is
    // where potential candidates live.
    const { position, radius } = sensor
    const top: Coords = [position[0], position[1] - radius - 1]
    const right: Coords = [position[0] + radius + 1, position[1]]
    const bottom: Coords = [position[0], position[1] + radius + 1]
    const left: Coords = [position[0] - radius - 1, position[1]]

    // Then the algorithm is pretty straightforward. Start at the top of the
    // rhombus (T), and go down-right (1) towards the right point (R), then
    // down-left (2) towards the bottom point (B), then up-left (3) towards the
    // left point (L), then finally up-right (4) towards the top point (T).
    //      T
    //  4 /   \ 1
    //   L     R
    //  3 \   / 2
    //      B

    const diagonals: Diagonal[] = [
      { from: top, to: right, vector: [+1, +1] },
      { from: right, to: bottom, vector: [-1, +1] },
      { from: bottom, to: left, vector: [-1, -1] },
      { from: left, to: top, vector: [+1, -1] },
    ]

    for (let { from: curr, to, vector } of diagonals) {
      while ($.toPoint(curr) !== $.toPoint(to)) {
        if (isValidCandidate(sensors, curr, max)) return curr
        curr = $.applyVector(curr, vector)
      }
    }
  }, null)

  return candidate[0] * 4_000_000 + candidate[1]
}
