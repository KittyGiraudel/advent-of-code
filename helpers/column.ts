/**
 * Return the column at given index in a bi-dimensional array or array of
 * strings.
 */
function column(input: string[], index: number): string[]
function column<T>(input: T[][], index: number): T[]
function column<T>(input: T[], index: number): T[] {
  return input.map<T>(row =>
    Array.isArray(row) ? row.at(index) : (row as string)[index]
  )
}

export default column
