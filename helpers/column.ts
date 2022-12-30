// Return the column at given index in a bi-dimensional array or array of
// strings.
const column = <Indexed>(
  input: Iterable<Indexed>[],
  index: number
): Iterable<Indexed>[] => input.map((row: Iterable<Indexed>) => row[index])

export default column
