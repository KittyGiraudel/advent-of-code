const $ = require('../../helpers')

const KEYPAD_1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const KEYPAD_2 = [
  [, , 1, ,],
  [, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [, 'A', 'B', 'C'],
  [, , 'D', ,],
]

const VECTORS = {
  U: [-1, 0],
  R: [0, +1],
  D: [+1, 0],
  L: [0, -1],
}

const run = (instructions, advanced) => {
  const keypad = advanced ? KEYPAD_2 : KEYPAD_1
  let position = advanced ? [2, 0] : [1, 1]

  return instructions
    .map(instruction => {
      const characters = Array.from(instruction)

      characters.forEach(char => {
        const next = $.applyVector(position, VECTORS[char])
        if ($.access(keypad, next)) position = next
      })

      return $.access(keypad, position)
    })
    .join('')
}

module.exports = { run }