import $ from '../../helpers'
import { Coords } from '../../types'

type Disk = {
  coords: Coords
  size: number
  used: number
  available: number
}

const getDisks = (dump: string[]): Disk[] =>
  dump.slice(2).map(line => {
    const [, x, y, size, used, available] = line
      .match(/x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+(\d+)/)
      .map(Number)

    return { coords: [y, x], size, used, available }
  })

export const run = (dump: string[]): number => {
  const disks = getDisks(dump)

  return $.combinations(disks, 2).filter(
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
export const getData = (dump: string[]): number => {
  const disks = getDisks(dump)
  const maxCi = Math.max(...disks.map(disk => disk.coords[1]))
  const emptyNode = disks.find(disk => disk.used === 0)
  const oversizedDisks = disks.filter(disk => disk.used > emptyNode.size)
  const availableDisks = disks
    .filter(disk => disk.used <= emptyNode.size)
    .map(disk => disk.coords)
    .map($.toPoint)

  let data: Coords = [0, maxCi]
  let curr: Coords = emptyNode.coords
  let total: number = 0

  const getNextNodes = (curr: Coords) =>
    $.bordering(curr, 'COORDS').filter((coords: Coords) => {
      const point = $.toPoint(coords)
      return availableDisks.includes(point) && point !== $.toPoint(data)
    })

  // While the data is not in the top-left corner (coords 0,0), repeatedly
  // position the empty disk on its left, and swap both disks.
  while (data[0] || data[1]) {
    // Find the path from the empty disk to the left of the data disk.
    const end: Coords = [data[0], data[1] - 1]
    const graph = $.pathfinding.bfs({
      start: curr,
      isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
      getNextNodes,
    })

    // Increment the total amount of moves by the length of this path.
    total += $.pathfinding.path(graph.from, curr, end).length

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
