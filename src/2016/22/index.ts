import $ from '../../helpers'
import type { Coords } from '../../types'

type Disk = {
  coords: Coords
  size: number
  used: number
  available: number
}

const getDisks = (dump: string[]) =>
  dump.slice(2).map(line => {
    const [x, y, size, used, available] = $.numbers(line)

    return { coords: [y, x], size, used, available } as Disk
  })

export const run = (dump: string[]) => {
  const disks = getDisks(dump)

  return $.pairs(disks).filter(
    ([a, b]) =>
      (a.used > 0 && a.used <= b.available) ||
      (b.used > 0 && b.used <= a.available)
  ).length
}

// I was a little stumped with part 2, so I originally solved it manually with
// this online visualization: https://codepen.io/anon/pen/BQEZzK/?editors=0010
// Once I understood it worked, I decided to give a proper solution a go. There
// are *a lot* of asumptions for this solution to work though, not to mention
// hard-coded details. Namely:
// 1. It relies on the data and goal being on the same row.
// 2. It assumes there is only a single empty disk in the grid.
// 3. It assumes there are no oversized disks on the top row.
// The idea is to move the empty disk around, to the left of the data disk. Then
// swap both disks. Repeat until the data is in the goal spot (top-left corner).
export const getData = (dump: string[]) => {
  const disks = getDisks(dump)
  const maxCi = Math.max(...disks.map(disk => disk.coords[1]))
  const emptyNode = disks.find(disk => disk.used === 0)

  if (!emptyNode) {
    throw new Error('Could not find empty node')
  }

  const oversizedDisks = disks.filter(disk => disk.used > emptyNode.size)
  const availableDisks = disks
    .filter(disk => disk.used <= emptyNode.size)
    .map(disk => disk.coords)
    .map(coords => $.toPoint(coords))

  let data: Coords = [0, maxCi]
  let curr: Coords = emptyNode.coords
  let total = 0

  const getNext = (curr: Coords) =>
    $.bordering(curr).filter(coords => {
      const point = $.toPoint(coords)
      return availableDisks.includes(point) && point !== $.toPoint(data)
    })

  // While the data is not in the top-left corner (coords 0,0), repeatedly
  // position the empty disk on its left, and swap both disks.
  while (data[0] || data[1]) {
    // Find the path from the empty disk to the left of the data disk, then
    // increment the total amount of moves by the length of this path.
    const end: Coords = [data[0], data[1] - 1]
    total += $.search
      .bfs({
        start: curr,
        isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
        getNext,
      })
      .getPath().length

    // Swap both disks for an additional move.
    curr = data
    data = end
    total += 1

    // If we can guarantee there are no oversized disks on the second row, we
    // can shorten that loop entirely by computing the remaining steps once we
    // have the goal (0,0), the empty disk (`_`) and the data (`D`) on the same
    // row. Swapping the empty disk with the data takes 5 moves:
    //          1           2           3           4           5
    // y=0    . D _       . D .       . D .       . D .       _ D .
    // y=1    . . .       . . _       . _ .       _ . .       . . .
    if (!oversizedDisks.some(disk => disk.coords[0] === 1))
      return total + (maxCi - 1) * 5
  }

  return total
}
