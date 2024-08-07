import $ from '../../helpers'
import type { Coords, Point } from '../../types'

export const run = (instructions: string, part2 = false) => {
  const map: Record<Point, number> = { '0,0': part2 ? 2 : 1 }
  const position: [Coords, Coords] = [
    [0, 0],
    [0, 0],
  ]
  let current = 0

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === '>') position[current][0]++
    if (instructions[i] === '<') position[current][0]--
    if (instructions[i] === 'v') position[current][1]++
    if (instructions[i] === '^') position[current][1]--
    map[$.toPoint(position[current])] =
      (map[$.toPoint(position[current])] || 0) + 1
    if (part2) current = +!current
  }

  return Object.values(map).filter(Boolean).length
}
