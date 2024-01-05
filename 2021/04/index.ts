import $ from '../../helpers/'
import { Grid } from '../../types'

type BingoCell = { marked: boolean; value: number }

const isLineComplete = (rowOrCol: BingoCell[]) =>
  rowOrCol.every(item => item.marked)

const isGridComplete = (grid: Grid<BingoCell>) =>
  grid.someRow(isLineComplete) || grid.someColumn(isLineComplete)

const roll = (grids: Grid<BingoCell>[], number: number) => {
  grids.forEach(grid => {
    grid.forEach(item => {
      if (item.value === number) item.marked = true
    })
  })
}

const computeGridScore = (grid: Grid<BingoCell>) =>
  grid.reduce((acc, item) => acc + (item.marked ? 0 : item.value), 0)

export const run = (input: string, part2: boolean = false) => {
  const [numbers, ...grids] = parseInput(input)
  const bingos: number[] = []

  for (let i = 0; i < numbers.length; i++) {
    roll(grids, numbers[i])

    for (let g = 0; g < grids.length; g++) {
      if (isGridComplete(grids[g])) {
        bingos.push(numbers[i] * computeGridScore(grids[g]))
        grids.splice(g, 1)
      }
    }
  }

  return part2 ? bingos.at(-1) : bingos[0]
}

const formatGrid = (grid: string) =>
  $.Grid.from<BingoCell>(
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
