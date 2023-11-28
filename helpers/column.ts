/**
 * Return the column at given index in a bi-dimensional array or array of
 * strings.
 */
const column = <T>(input: Iterable<T>[], index: number): Iterable<T>[] =>
  input.map((row: Iterable<T>) => row[index])

export default column
