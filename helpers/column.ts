/**
 * Return the column at given index in a bi-dimensional array or array of
 * strings.
 */
function column(input: string[], index: number): string[]
function column<T>(input: T[][], index: number): T[]
function column<T>(input: string[] | T[][], index: number) {
  return input.map(stringOrRow => {
    if (typeof stringOrRow === 'string') (stringOrRow as string)[index]
    if (Array.isArray(stringOrRow)) return stringOrRow.at(index)
    return stringOrRow[index]
  })
}

export default column
