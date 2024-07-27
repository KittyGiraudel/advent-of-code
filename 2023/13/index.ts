import $ from '../../helpers'
import type { Grid } from '../../types'

type Mirror = { column: number | null; row: number | null }

// The algorithm to find a mirror goes like this: iterate from one edge of the
// grid to the other. For a given index, compare the minimum amount of lines on
// each side that’s needed to hit a grid edge. For instance, when comparing
// lines 2 and 3 on a grid with 8 lines, compare 3 lines on each side (0,1,2 vs.
// 3,4,5). Serialize these bundles of lines and compare them as strings. If they
// are identical, the mirror is on this line. The only difference for part 2 is
// that we make sure to find a different mirror than part 1 (that’s the `not`
// argument), as the puzzle guarantees that there will be a different mirror
// (although it’s not guaranteed that the first mirror will no longer work).
const searchAxis = (grid: Grid<string>, not?: number | null) => {
  // This is not necessary per se but we can speed things up by treating the
  // grid as an array of rows instead of a two-dimensional grid.
  const rows = grid.rows.map(row => row.join(''))

  for (let li = 0, ri = li + 1; li < rows.length - 1; li++, ri++) {
    // This check is not necessary per se but it significantly speeds up the
    // whole search by avoiding generating ranges and doing more advanced
    // comparisons when it’s guaranteed this is not a mirror.
    if (rows[li] !== rows[ri]) continue

    const min = Math.min(ri, rows.length - ri)
    const left = $.range(min, li - min + 1).map(i => rows[i])
    const right = $.range(min, ri).map(i => rows[i])

    if (left.join('') === right.reverse().join('') && li !== not) return li
  }

  return null
}

// My initial version passed a `Vertical | Horizontal` argument and then read
// width/height rows/columns, but someone on Reddit made a good point that
// rotating the grid is ultimately simpler.
const findMirror = (grid: Grid<string>, not?: Mirror) => ({
  column: searchAxis(grid.rotate(), not?.column),
  row: searchAxis(grid, not?.row),
})

const summarize = (mirror: Mirror) => {
  if (mirror.column !== null) return mirror.column + 1
  if (mirror.row !== null) return (mirror.row + 1) * 100
  return 0
}

// This creates grid variants by cloning the grid, and replacing the row
// containing the smudge (at index ri) with the opposite character at the right
// column index (ci).
const getVariants = (grid: Grid<string>) => {
  const variants: Grid<string>[] = []

  grid.forEach((value, coords) => {
    variants.push(grid.clone().set(coords, value === '#' ? '.' : '#'))
  })

  return variants
}

const summarizeVariant =
  (mirror: Mirror) => (acc: number, variant: Grid<string>) =>
    acc || summarize(findMirror(variant, mirror))

export const run = (blocks: string[], part2 = false) =>
  $.sum(
    blocks
      .map(block => $.Grid.fromRows(block.split('\n')))
      .map(grid => ({ grid, mirror: findMirror(grid) }))
      .map(({ grid, mirror }) =>
        part2
          ? getVariants(grid).reduce(summarizeVariant(mirror), 0)
          : summarize(mirror)
      )
  )
