import $ from '../../helpers'

// Pad the row with an extra space, then slice it into chunks of 4 characters
// which follow this struct: `[A] ` or `    ` (for empty cells). Then trim and
// get the letter which is at position 1 (or empty string if nothing).
const parseRow = (row: string): string[] =>
  $.chunk.string(row + ' ', 4).map(item => item.trim()[1])

// This function transforms a graphic “map” as given into an array of columns
// where the top entry is at index 0.
// Input:
//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3
// Output:
// [ ['N', 'Z'], ['D', 'C', 'M'], ['P'] ]
const parseMap = (map: string): string[][] =>
  $.grid
    .rotate(map.split('\n').filter(Boolean).slice(0, -1).map(parseRow))
    .map(column => column.filter(Boolean).reverse())

const parseInstructions = (instructions: string): number[][] =>
  instructions
    .split('\n')
    .filter(Boolean)
    .map(instruction => instruction.match(/\d+/g).map(v => +v))

export const process = (
  input: [string, string],
  batch: boolean = false
): string => {
  const map = parseMap(input[0])
  const instructions = parseInstructions(input[1])

  instructions.forEach(([amount, from, to]) => {
    if (batch) {
      map[to - 1].unshift(...map[from - 1].splice(0, amount))
    } else
      for (let i = 0; i < amount; i++)
        map[to - 1].unshift(map[from - 1].shift())
  })

  return $.column(map, 0).join('')
}
