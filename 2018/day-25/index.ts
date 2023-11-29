import $ from '../../helpers'
import { Coords } from '../../types'

// Interestingly enough, this is almost the exact same algorithm as outlined by
// this Reddit post (who scored #10/#58), so I’m pretty happy:
// https://www.reddit.com/r/adventofcode/comments/a9c61w/comment/eci5rgz/?utm_source=reddit&utm_medium=web2x&context=3
export const observe = (input: Array<string>): number => {
  const lines = input.map($.toCoords)
  const constellations = []
  const isInConstellation = (constellation, coords) =>
    Array.from(constellation).some(
      (point: Coords) => $.manhattan(point, coords) <= 3
    )

  lines.forEach(coords => {
    // For every given point, list all constellations it belongs to (called
    // “hosts” here).
    const hosts = constellations
      .map((constellation, index) =>
        isInConstellation(constellation, coords) ? index : null
      )
      .filter(index => index !== null)

    // If the point doesn’t belong to any constellation, it should start one of
    // its own.
    if (hosts.length === 0) {
      constellations.push(new Set([coords]))
    }

    // Otherwise, it should do 2 things:
    // 1. Be added to the first host it belongs to.
    // 2. All the other hosts should be merged into the first and deleted, since
    //    that point served as a bridge to bring and merge these constellations.
    else {
      const first = hosts.shift()

      constellations[first].add(coords)

      hosts.reverse().forEach(cIndex => {
        Array.from(constellations[cIndex]).forEach(coords =>
          constellations[first].add(coords)
        )

        constellations.splice(cIndex, 1)
      })
    }
  })

  return constellations.length
}
