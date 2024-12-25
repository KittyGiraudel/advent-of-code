import $ from '../../helpers'
import type { Grid } from '../../types'

const isKey = (block: Grid<string>) =>
  block.row(0).join('') === '.....' && block.row(-1).join('') === '#####'
const isLock = (block: Grid<string>) =>
  block.row(0).join('') === '#####' && block.row(-1).join('') === '.....'

export const run = (input: string[]) => {
  const blocks = input.map(block => $.Grid.fromRows(block.split('\n')))
  const keys = blocks
    .filter(isKey)
    .map(grid =>
      grid.columns.map(
        column => grid.height - column.findIndex(value => value === '#') - 1
      )
    )
  const locks = blocks
    .filter(isLock)
    .map(grid =>
      grid.columns.map(column => column.findIndex(value => value === '.') - 1)
    )

  let total = 0
  for (const key of keys) {
    for (const lock of locks) {
      if ($.zip([key, lock]).every(([k, l]) => k + l <= 5)) total++
    }
  }
  return total
}
