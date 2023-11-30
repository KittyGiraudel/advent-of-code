import { Grid } from './grid'

/**
 * Return the column at given index in a bi-dimensional array or array of
 * strings.
 */
function column(input: string[], index: number): string[]
function column<T>(input: Grid<T>, index: number): T[]
function column<T>(input: T[], index: number): T[] {
  return input.map<T>(row => (row as T[])[index])
}

export default column
