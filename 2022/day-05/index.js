const $ = require('../../helpers')

// Pad the row with an extra space, then slice it into chunks of 4 characters
// which follow this struct: `[A] ` or `    ` (for empty cells). Then trim and
// get the letter which is at position 1 (or empty string if nothing).
const parseRow = row => $.chunk(row + ' ', 4).map(item => item.trim()[1])

// This function transforms a graphic “map” as given into an array of columns
// where the top entry is at index 0.
// Input:
//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3
// Output:
// [ ['N', 'Z'], ['D', 'C', 'M'], ['P'] ]
const parseMap = map =>
  $.grid
    .rotate(map.split('\n').slice(0, -1).map(parseRow))
    .map(column => column.filter(Boolean).reverse())

const parseInstructions = instructions =>
  instructions
    .split('\n')
    .filter(Boolean)
    .map(instruction => instruction.match(/\d+/g))

const process = (input, batch = false) => {
  const map = parseMap(input[0])
  const instructions = parseInstructions(input[1])

  instructions.forEach(([amount, from, to]) => {
    if (batch) {
      map[to - 1].unshift(...map[from - 1].splice(0, amount))
    } else
      for (let i = 0; i < amount; i++)
        map[to - 1].unshift(map[from - 1].shift())
  })

  return map.map(column => column[0]).join('')
}

module.exports = { process }