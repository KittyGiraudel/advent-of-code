import $ from '../../helpers'
import { Coords, Point } from '../../types'

export const maze = (input: string[]) => {
  const gates: Record<string, Coords[]> = {}
  // The grid is padded by 2 extra rows or columns on each side to make way for
  // the door names, hence the `- 4`. The width is a bit awkward to compute due
  // to the automatic trimming of lines, which is why we pick the max length.
  const height = input.length - 4
  const width = Math.max(...input.map(i => i.length)) - 4
  const grid = $.grid.init(width, height, (ci, ri) => input[ri + 2][ci + 2])

  // Top row
  grid[0].forEach((value, ci) => {
    if (value !== '.') return
    const door = input[0][ci + 2] + input[1][ci + 2]
    ;(gates[door] = gates[door] ?? []).push([0, ci] as Coords)
  })

  // Bottom row
  grid.at(-1).forEach((value, ci) => {
    if (value !== '.') return
    const door = input.at(-2)[ci + 2] + input.at(-1)[ci + 2]
    ;(gates[door] = gates[door] ?? []).push([height - 1, ci])
  })

  // Left column
  $.column(grid, 0).forEach((value, ri) => {
    if (value !== '.') return
    const door = input[ri + 2][0] + input[ri + 2][1]
    ;(gates[door] = gates[door] ?? []).push([ri, 0])
  })

  // Right column
  $.column(grid, width - 1).forEach((value, ri) => {
    if (value !== '.') return
    const door = input[ri + 2].at(-2) + input[ri + 2].at(-1)
    ;(gates[door] = gates[door] ?? []).push([ri, width - 1])
  })

  $.grid.forEach(grid, (value, ri, ci) => {
    if (!/[A-Z]/.test(value)) return
    const bottom = $.access(grid, [ri + 1, ci]).trim()

    if (/[A-Z]/.test(bottom)) {
      const top = $.access(grid, [ri - 1, ci]).trim()
      let door = value + bottom
      ;(gates[door] = gates[door] ?? []).push(top ? [ri - 1, ci] : [ri + 2, ci])
    }

    const right = $.access(grid, [ri, ci + 1]).trim()

    if (/[A-Z]/.test(right)) {
      const left = $.access(grid, [ri, ci - 1]).trim()
      let door = value + right
      ;(gates[door] = gates[door] ?? []).push(
        left ? [ri, ci - 1] : [ri, ci + 2]
      )
    }
  })

  const portals: Record<Point, Coords> = {}
  const start = gates.AA[0]
  const end = gates.ZZ[0]

  delete gates.AA
  delete gates.ZZ

  Object.values(gates).forEach((doors: [Coords, Coords?]) => {
    portals[$.toPoint(doors[0])] = doors[1]
    portals[$.toPoint(doors[1])] = doors[0]
  })

  const { from } = $.pathfinding.bfs({
    start,
    getNextNodes: curr =>
      $.bordering(curr, 'COORDS')
        .filter(coords => $.access(grid, coords) === '.')
        .concat([portals[$.toPoint(curr)]])
        .filter(Boolean),
    isGoal: curr => curr[0] === end[0] && curr[1] === end[1],
  })

  return $.pathfinding.path(from, start, end).length
}
