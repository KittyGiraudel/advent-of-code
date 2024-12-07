import $ from '../../helpers'

export const run = (input: string[], part2 = false) => {
  const grid = $.Grid.fromRows(input)

  if (part2) {
    return grid.reduce((acc, value, [ri, ci]) => {
      if (value !== 'A') return acc

      const [, NE, , SE, , SW, , NW] = $.surrounding([ri, ci])
      const corners = [NE, SE, SW, NW]
      const Ms = corners.filter(coords => grid.at(coords) === 'M').length
      const Ss = corners.filter(coords => grid.at(coords) === 'S').length
      if (Ms !== 2 || Ss !== 2) return acc
      if (grid.at(NE) === grid.at(SW)) return acc
      if (grid.at(NW) === grid.at(SE)) return acc
      return acc + 1
    }, 0)
  }

  return grid.reduce((acc, value, [ri, ci]) => {
    if (value !== 'X') return acc

    // Right to left
    if (
      grid.at([ri + 0, ci + 1]) === 'M' &&
      grid.at([ri + 0, ci + 2]) === 'A' &&
      grid.at([ri + 0, ci + 3]) === 'S'
    )
      acc++

    // Left to right
    if (
      grid.at([ri + 0, ci - 1]) === 'M' &&
      grid.at([ri + 0, ci - 2]) === 'A' &&
      grid.at([ri + 0, ci - 3]) === 'S'
    )
      acc++

    // Bottom to top
    if (
      grid.at([ri - 1, ci + 0]) === 'M' &&
      grid.at([ri - 2, ci + 0]) === 'A' &&
      grid.at([ri - 3, ci + 0]) === 'S'
    )
      acc++

    // Top to bottom
    if (
      grid.at([ri + 1, ci + 0]) === 'M' &&
      grid.at([ri + 2, ci + 0]) === 'A' &&
      grid.at([ri + 3, ci + 0]) === 'S'
    )
      acc++

    // Top-left to bottom-right
    if (
      grid.at([ri + 1, ci + 1]) === 'M' &&
      grid.at([ri + 2, ci + 2]) === 'A' &&
      grid.at([ri + 3, ci + 3]) === 'S'
    )
      acc++

    // Top-right to bottom-left
    if (
      grid.at([ri + 1, ci - 1]) === 'M' &&
      grid.at([ri + 2, ci - 2]) === 'A' &&
      grid.at([ri + 3, ci - 3]) === 'S'
    )
      acc++

    // Bottom-left to top-right
    if (
      grid.at([ri - 1, ci + 1]) === 'M' &&
      grid.at([ri - 2, ci + 2]) === 'A' &&
      grid.at([ri - 3, ci + 3]) === 'S'
    )
      acc++

    // Bottom-right to top-left
    if (
      grid.at([ri - 1, ci - 1]) === 'M' &&
      grid.at([ri - 2, ci - 2]) === 'A' &&
      grid.at([ri - 3, ci - 3]) === 'S'
    )
      acc++

    return acc
  }, 0)
}
