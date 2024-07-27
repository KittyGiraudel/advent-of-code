import $ from '../../helpers'
import type { Coords, TriCoords, TriPoint } from '../../types'

type Brick = [TriCoords, TriCoords]
type Store = { height: number; brick: number }

export const run = (input: string[], part2 = false) => {
  const bricks = input
    .map(
      line => line.split('~').map(part => $.toCoords(part as TriPoint)) as Brick
    )
    .sort((a, b) => a[0][2] - b[0][2])
  const [minX, maxX, minY, maxY] = $.boundaries(bricks.flat())
  const grid = new $.Grid<Store>(maxY + 1 - minY, maxX + 1 - minX, () => ({
    height: 0,
    brick: Number.POSITIVE_INFINITY,
  }))

  const onBrick = (
    [start, end]: Brick,
    handler: (value: Store, coords: Coords) => void
  ) => {
    for (let ci = start[0]; ci <= end[0]; ci++) {
      for (let ri = start[1]; ri <= end[1]; ri++) {
        handler(grid.get([ri, ci]), [ri, ci])
      }
    }
  }

  const graph = $.array(bricks.length).map(() => ({
    supports: [] as number[],
    supportedBy: [] as number[],
  }))

  // Iterate over all bricks from the lowest in the stack to the highest
  // (smallest Z value)
  bricks.forEach((brick, index) => {
    const [start, end] = brick
    const height = end[2] - start[2] + 1
    let top = 0
    let previous = Number.POSITIVE_INFINITY

    // First, we find the tallest Z value from the brick
    onBrick(brick, cell => {
      top = Math.max(top, cell.height)
    })

    // Then, we iterate each block from the brick one more time
    onBrick(brick, (cell, coords) => {
      // If the block is (one of) the highest in the brick, we need to mark it
      // as such so that subsequent bricks know it’s there
      if (cell.height === top) {
        // If it’s not defined or different than our current brick, we mark
        // the current brick as being on top (up) from the previous highest,
        // and the previous brick as being below (supportedBy) from the current brick
        if (cell.brick !== previous) {
          graph[cell.brick].supports.push(index)
          graph[index].supportedBy.push(cell.brick)
          previous = cell.brick
        }
      }

      // Finally, we update our map to store the current brick and its tallest
      // Z at every coordinate
      grid.set(coords, { brick: index, height: top + height })
    })
  })

  if (!part2) {
    const safe = $.array(graph.length).map(() => true)

    for (const { supportedBy } of graph) {
      if (supportedBy.length === 1) safe[supportedBy[0]] = false
    }

    return safe.filter(Boolean).length
  }

  const results = bricks.map((_, destroyedIndex) => {
    const clone = structuredClone(graph)
    const queue = [destroyedIndex]
    const fallen = new Set<number>()

    while (queue.length) {
      const fallingIndex = queue.pop()!
      const { supports, supportedBy } = clone[fallingIndex]

      // Add the current brick to the set of falling bricks; it is technically
      // incorrect to add the destroyed brick to the set, but we can just return
      // -1 to negate it
      fallen.add(fallingIndex)

      // If the next brick is still supported, there is nothing to do as it’s
      // not going to fall
      if (fallingIndex !== destroyedIndex && supportedBy.length > 0) continue

      // Remove the falling brick from the supportedBy arrays, as it’s no longer
      // supporting them
      clone
        .filter(brick => brick.supportedBy.includes(fallingIndex))
        .forEach(brick =>
          brick.supportedBy.splice(brick.supportedBy.indexOf(fallingIndex), 1)
        )

      // Find the next falling bricks (which are no longer supported by
      // anything)
      const nextFalling = supports.filter(
        nextIndex => clone[nextIndex].supportedBy.length === 0
      )

      // Push them into the queue
      queue.unshift(...nextFalling)
    }

    // The resulting amount of falling bricks is the amount of bricks supported
    // by nothing, minus one because the brick we dstroyed is included in
    return fallen.size - 1
  })

  return $.sum(results)
}
