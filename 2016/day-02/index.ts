import $ from '../../helpers'
import { Grid, Coords } from '../../types'

const KEYPAD_1: Grid<number> = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

const KEYPAD_2: Grid<number | string | undefined> = [
  [, , 1, ,],
  [, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [, 'A', 'B', 'C'],
  [, , 'D', ,],
]

const VECTORS: Record<string, Coords> = {
  U: [-1, 0],
  R: [0, +1],
  D: [+1, 0],
  L: [0, -1],
}

export const run = (instructions: string[], advanced: boolean = false) => {
  const keypad = advanced ? KEYPAD_2 : KEYPAD_1
  let position: Coords = advanced ? [2, 0] : [1, 1]
  type Vector = keyof typeof VECTORS

  return instructions
    .map(instruction => {
      const characters = Array.from(instruction)

      characters.forEach(char => {
        const next = $.applyVector(position, VECTORS[char as Vector])
        if ($.access(keypad, next)) position = next
      })

      return $.access(keypad, position)
    })
    .join('')
}
