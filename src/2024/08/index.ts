import $ from '../../helpers'
import type { Coords, Point } from '../../types'

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input)
  const antennas = new Map<string, Set<Point>>()
  const antinodes = new Set<Point>()

  // First, go through the grid and record every antenna (i.e. every cell which
  // is not empty). Map their type (e.g. A, a, B, b…) to their positions.
  grid.forEach((value, coords) => {
    if (value === '.') return
    const point = $.toPoint(coords)
    if (!antennas.has(value)) antennas.set(value, new Set<Point>([point]))
    else antennas.get(value)!.add(point)
  })

  // Then, iterate on every type of antenna, and compose all the possible pairs
  // of positions for that type. 2 positions = 1 pair, 3 positions = 3 pairs, 4
  // positions = 6 pairs…
  for (const [_, value] of antennas) {
    const pairs = $.pairs(Array.from(value).map($.toCoords))

    // For each pair of positions, compute the positional difference between
    // both points as a vector as well as the anti-vector, in order to place
    // antinodes in directions.
    pairs.forEach(([a, b]) => {
      const vector: Coords = [a[0] - b[0], a[1] - b[1]]
      const antiVector: Coords = [vector[0] * -1, vector[1] * -1]

      // Part 1 places a single antinode on each side of the pair, while part 2
      // keeps applying the difference vector until out of bounds, *and* also
      // includes the antennas’ positions.
      let antinodeA = part2 ? a : $.applyVector(a, vector)
      while (grid.get(antinodeA)) {
        antinodes.add($.toPoint(antinodeA))
        antinodeA = $.applyVector(antinodeA, vector)
        if (!part2) break
      }

      let antinodeB = part2 ? b : $.applyVector(b, antiVector)
      while (grid.get(antinodeB)) {
        antinodes.add($.toPoint(antinodeB))
        antinodeB = $.applyVector(antinodeB, antiVector)
        if (!part2) break
      }
    })
  }

  return antinodes.size
}
