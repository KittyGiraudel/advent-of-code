import $ from '../../helpers'
import type { Coords, Point } from '../../types'

const isWithinBounds = (coords: Coords, size: number) =>
  $.isClamped(coords[0], 0, size - 1) && $.isClamped(coords[1], 0, size - 1)

const navigate = (size: number, bytes: Set<Point>) =>
  $.search.bfs<Coords>({
    start: [0, 0],
    isGoal: curr => curr[0] === size - 1 && curr[1] === size - 1,
    getNext: curr =>
      $.bordering(curr)
        .filter(coords => isWithinBounds(coords, size))
        .filter(coords => !bytes.has($.toPoint(coords))),
  })

export const run = (input: string[], cap: number, part2 = false) => {
  const specs = input as Point[]
  const size = $.max($.numbers(specs.join(','))) + 1
  const bytes = new Set(specs.slice(0, cap))

  if (part2) {
    // Preserving my original answer for posterity, which works fine but takes
    // 7 seconds. The binary search, as suggestedeon Reddit, is nearly instant-
    // aneous (and also smarter as it would scale well on large inputs, where
    // my solution wouldn’t).
    //
    // return specs
    //  .slice(cap)
    //  .find(specification => !navigate(size, bytes.add(specification)).end)
    return specs[
      $.binarySearch(cap, specs.length, i =>
        navigate(size, new Set(specs.slice(0, i))).end ? 1 : -1
      )
    ]
  }

  return navigate(size, bytes).getPath().length
}
