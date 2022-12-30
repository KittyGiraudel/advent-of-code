import { Grid } from '../types'

// Return the column at given index in a bi-dimensional array.
const column = <T>(grid: string[] | Grid<T>, index: number): T[] =>
  grid.map(row => row[index])

export default column
