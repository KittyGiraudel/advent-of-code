import $ from '../../helpers/'
import { Grid } from '../../types'

type BingoCell = { marked: boolean; value: number }

const isGridComplete = (grid: Grid<BingoCell>): boolean => {
  const hasFullRow = grid.some(row => row.every(item => item.marked))
  const hasFullCol = grid[0].some((_, i) => grid.every(row => row[i].marked))

  return hasFullRow || hasFullCol
}

const roll = (grids: Grid<BingoCell>[], number: number): void => {
  grids.forEach(grid => {
    $.grid.forEach(grid, item => {
      if (item.value === number) item.marked = true
    })
  })
}

const computeGridScore = (grid: Grid<BingoCell>): number =>
  $.grid.reduce(grid, (acc, item) => acc + (item.marked ? 0 : item.value), 0)

export const getBingos = (input: string): Array<number> => {
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

const formatGrid = (grid: string): Grid<BingoCell> =>
  grid.split('\n').map((row: string) =>
    row
      .split(/\s+/g)
      .filter(Boolean)
      .map(Number)
      .map((value: number) => ({ value, marked: false }))
  )

const parseInput = (input: string): [Array<number>, ...Grid<BingoCell>[]] => {
  const [numbers, ...grids] = input.split('\n\n')

  return [numbers.split(',').map(Number), ...grids.map(formatGrid)]
}
