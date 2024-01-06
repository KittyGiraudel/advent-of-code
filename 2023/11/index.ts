import $ from '../../helpers'
import { Coords, Grid } from '../../types'

const isEmpty = (array: string[]) => array.every(value => value === '.')
const calculateExpansion = (grid: Grid<string>) => {
  const emptyRowIndices = grid.rows
    .map((row, index) => (isEmpty(row) ? index : null))
    .filter((index): index is number => Boolean(index))

  const emptyColumnIndices = grid.columns
    .map((column, index) => (isEmpty(column) ? index : null))
    .filter((index): index is number => Boolean(index))

  return { emptyColumnIndices, emptyRowIndices }
}

const findGalaxies = (grid: Grid<string>, factor: number) => {
  const { emptyRowIndices, emptyColumnIndices } = calculateExpansion(grid)
  const galaxies: Coords[] = []

  grid.forEach((value, [ri, ci]) => {
    if (value === '#')
      galaxies.push([
        // If I’m being honest, I am not 100% clear on why this should be
        // `factor - 1` instead of `factor`. If you expand empty lines by 10,
        // you need to multiple the number of empty lines before the current
        // value by 9, and I don’t quite get why. For instance, value 8 with
        // 4 empty lines before is 8 + 4 * 9 = 44.
        ri + emptyRowIndices.filter(eri => eri < ri).length * (factor - 1),
        ci + emptyColumnIndices.filter(eci => eci < ci).length * (factor - 1),
      ])
  })

  return galaxies
}

export const run = (input: string[], factor = 2) => {
  const grid = $.Grid.fromRows(input)
  const galaxies = findGalaxies(grid, factor)
  const pairs = $.pairs(galaxies)

  return $.sum(pairs.map(([a, b]) => $.manhattan(a, b)))
}
