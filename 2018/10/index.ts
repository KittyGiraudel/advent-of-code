import $ from '../../helpers'
import { Coords } from '../../types'

const applyVelocity = ([position, velocity]: [Coords, Coords]) =>
  [$.applyVector(position, velocity), velocity] as [Coords, Coords]

const parseLine = (line: string) =>
  $.chunk($.numbers(line), 2) as [Coords, Coords]

const getDimensions = ([minX, maxX, minY, maxY]: number[]) => [
  maxX + 1 - minX,
  maxY + 1 - minY,
]

export const plot = (input: string[]) => {
  let curr = input.map(parseLine)
  let [width, height] = [Infinity, Infinity]
  let seconds = 0

  // This condition is somewhat arbitrary. I assumed the message would be
  // letters (given it was in the example), and looking back at other AoC
  // puzzles where letters were rendered, they usually were displayed over a few
  // rows. So I thought once the height is within a dozen lines or so, it’s
  // probably fine.
  while (!$.isClamped(height, 5, 15)) {
    // Increment the amount of seconds one has to wait to see the message.
    seconds++
    // Apply the velocity to every point.
    curr = curr.map(applyVelocity)
    // Compute the new grid dimensions based on the updated points.
    const positions = curr.map(([position]) => position)
    const boundaries = $.boundaries(positions)
    ;[width, height] = getDimensions(boundaries)
  }

  return seconds
}
