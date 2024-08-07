import $ from '../../helpers'
import type { ValueOrArray } from '../../types'

type Fish = [ValueOrArray<number>, ValueOrArray<number>?]

const split = (value: string) =>
  `[${Math.floor(+value / 2)},${Math.ceil(+value / 2)}]`

const handleExplosions = (string: string): string => {
  const openings: number[] = []
  let left: number | null = null
  let right: number | null = null
  let current = ''

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '[') {
      openings.push(i)
    } else if (string[i] === ']') {
      const openingIndex = openings.pop()
      right = +current
      current = ''

      // If the closed pair is within 4 pairs or more, it should be exploded.
      if (openings.length >= 4) {
        // To explode the current pair (`[[6,[5,[4,[3,2]]]],1]` for instance):
        // 1. Take everything up to the opening bracket (excluded), in which
        //    update the last number found with the left value. In the example,
        //    that would be `[[6,[5,[4,`, updated as `[[6,[5,[7,`.
        // 2. Add a zero replacing the exploding pair. So, `[[6,[5,[7,0`.
        // 3. Take everything after the closing bracket (excluded), in which the
        //    first number found is updated with the right value. In the
        //    example, that would be `]]],1]`, updated as `]]],3]`, for a final
        //    expression of `[[6,[5,[7,0]]],3]`.
        // 4. Then start again from the beginning of the string.
        return handleExplosions(
          string
            .slice(0, openingIndex)
            .replace(/(\d+)([^\d]*)$/, (_, n: number, rest: string) =>
              String(+n + left! + rest)
            ) +
            '0' +
            string.slice(i + 1).replace(/\d+/, n => String(+n + right!))
        )
      }
    } else if (string[i] === ',') {
      left = +current
      current = ''
    } else {
      current += string[i]
    }
  }

  return string
}

const handleLeftMostSplit = (string: string) =>
  string.replace(/(\d{2,})/, split)

const reduceFish = (fish: string) => handleLeftMostSplit(handleExplosions(fish))

// The reducing logic is as follow:
// 1. First do all explosions that can be done.
// 2. Once no more explosions can be done, perform the left-most split.
// 3. Repeat step 1 and 2 until the string no longer changes.
export const reduce = (string: string) => {
  let curr = string
  let next = reduceFish(curr)

  while (curr !== next) {
    curr = next
    next = reduceFish(curr)
  }

  return next
}

export const computeMagnitude = ([left, right]: Fish): number =>
  (typeof left === 'number' ? left : computeMagnitude(left as Fish)) * 3 +
  (typeof right === 'number' ? right : computeMagnitude(right as Fish)) * 2

export const sumFish = (...fishes: string[]) =>
  fishes.reduce((acc, fish) => (acc ? reduce(`[${acc},${fish}]`) : fish))

export const findHighestMagnitude = (...fishes: string[]) =>
  Math.max(
    ...$.pairs(fishes)
      .map(pair => sumFish(...pair))
      .map(value => JSON.parse(value))
      .map(computeMagnitude)
  )
