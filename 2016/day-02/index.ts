import $ from '../../helpers'
import { Coords } from '../../types'

const KEYPAD_1: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

// prettier-ignore
const KEYPAD_2: (number | string | undefined)[][] = [
  [   ,    ,  1 ,    ,   ],
  [   ,  2 ,  3 ,  4 ,   ],
  [ 5 ,  6 ,  7 ,  8 , 9 ],
  [   , 'A', 'B', 'C',   ],
  [   ,    , 'D',    ,   ],
]

const VECTORS: Record<string, Coords> = {
  U: [-1, 0],
  R: [0, +1],
  D: [+1, 0],
  L: [0, -1],
}

export const run = (instructions: string[], part2: boolean = false) => {
  const keypad = part2 ? KEYPAD_2 : KEYPAD_1
  let position: Coords = part2 ? [2, 0] : [1, 1]
  type Vector = keyof typeof VECTORS

  return instructions
    .map(instruction => {
      Array.from(instruction).forEach(char => {
        const next = $.applyVector(position, VECTORS[char as Vector])
        if (keypad?.[next[0]]?.[next[1]]) position = next
      })

      return keypad[position[0]][position[1]]
    })
    .join('')
}
