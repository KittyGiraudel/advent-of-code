import $ from '../../helpers'
import type { TriCoords } from '../../types'

type Bot = {
  x: number
  y: number
  z: number
  r: number
  distance: number
}

const parse = (string: string) => {
  const [x, y, z, r] = $.numbers(string)
  const distance = $.manhattan([x, y, z], [0, 0, 0])

  return { x, y, z, r, distance } as Bot
}

const toBotCoords = (bot: Bot): TriCoords => [bot.x, bot.y, bot.z]

export const findStrongestBot = (input: string[]): [number, number] => {
  const bots: Bot[] = input.map(parse).sort((a, b) => b.r - a.r)
  const inRange = bots.filter(
    bot => $.manhattan(toBotCoords(bot), toBotCoords(bots[0])) <= bots[0].r
  )

  // I spent quite a lot of time trying to figure that one out, but to no avail.
  // I tried some intersection reduction, and also learnt the line sweeping
  // algorithm, which I am pretty sure is what the solution below really is.
  // Ultimately, I needed Reddit to figure it out.
  // https://www.reddit.com/r/adventofcode/comments/a8s17l/comment/ecfreod/
  //
  // For each bot, the code adds [Math.max(d - r, 0), 1] and [d + r, -1] to a
  // priority queue (where `d` is the Manhattan distance to origin). The queue
  // holds entries for the start and end of each “line segment” as measured by
  // the Manhattan distance from the origin. At the start of the segment the +1
  // (last element in the tuple) adds to the total of overlapping segments. The
  // -1 marks the segment’s end, and is used to decrease the counter. The final
  // loop calculates the maximum number of overlapping segments, and the point
  // where the maximum is hit, which is the answer.
  const { distance } = bots
    .flatMap(bot => [
      // This tuple indicates the start of the “segment”, which is defined by
      // the left side of the square surrounding the bot (its center minus its
      // radius). The +1 means that within that segment, this bot contributes to
      // the overlap.
      [bot.distance - bot.r, +1],
      // This tuple indicates the end of the “segment”, which is defined by the
      // the right side of the square surrounding the bot (its center plus its
      // radius). The -1 means that passed that segment, this bot no longer
      // contributes to the overlap.
      [bot.distance + bot.r, -1],
    ])
    .sort((a, b) => a[0] - b[0])
    .reduce(
      (acc, [distance, e]) => {
        acc.overlaps += e

        if (acc.overlaps > acc.max) {
          acc.distance = distance
          acc.max = acc.overlaps
        }

        return acc
      },
      { distance: 0, overlaps: 0, max: 0 }
    )

  return [inRange.length, distance]
}
