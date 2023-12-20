import $ from '../../helpers/'
import { Grid } from '../../types'

type BingoCell = { marked: boolean; value: number }

const isGridComplete = (grid: Grid<BingoCell>) => {
  const hasFullRow = grid.rows.some(row => row.every(item => item.marked))
  const hasFullCol = grid.columns.some(col => col.every(item => item.marked))

  return hasFullRow || hasFullCol
}

const roll = (grids: Grid<BingoCell>[], number: number) => {
  grids.forEach(grid => {
    grid.forEach(item => {
      if (item.value === number) item.marked = true
    })
  })
}

const computeGridScore = (grid: Grid<BingoCell>) =>
  grid.reduce((acc, item) => acc + (item.marked ? 0 : item.value), 0)

export const getBingos = (input: string) => {
  const [numbers, ...grids] = parseInput(input)
  const bingos = []

  for (let i = 0; i < numbers.length; i++) {
    roll(grids, numbers[i])

    for (let g = 0; g < grids.length; g++) {
      if (isGridComplete(grids[g])) {
        bingos.push(numbers[i] * computeGridScore(grids[g]))
        grids.splice(g, 1)
      }
    }
  }

  return bingos
}

const formatGrid = (grid: string) =>
  $.Grid.from<BingoCell, BingoCell>(
    grid.split('\n').map((row: string) =>
      row
        .split(/\s+/g)
        .filter(Boolean)
        .map(Number)
        .map((value: number) => ({ value, marked: false }))
    )
  )

const parseInput = (input: string): [number[], ...Grid<BingoCell>[]] => {
  const [numbers, ...grids] = input.split('\n\n')

  return [numbers.split(',').map(Number), ...grids.map(formatGrid)]
}
