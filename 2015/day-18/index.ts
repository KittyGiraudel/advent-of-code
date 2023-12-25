import $ from '../../helpers'
import { Point } from '../../types'

export const run = (
  input: string[],
  iterations: number,
  part2: boolean = false
) => {
  let curr = $.Grid.fromRows<string>(input)
  const corners: Point[] = [
    `0,0`,
    `0,${curr.width - 1}`,
    `${curr.height - 1},0`,
    `${curr.height - 1},${curr.width - 1}`,
  ]

  if (part2) {
    corners.forEach(point => curr.set(point, '#'))
  }

  while (iterations--) {
    curr = curr.map((value, ...coords) => {
      const neighbors = $.surrounding(coords, 'COORDS')
      const on = neighbors.filter(coords => curr.get(coords) === '#')

      if (part2 && corners.includes($.toPoint(coords))) {
        return '#'
      }

      if (value === '#') {
        return on.length === 2 || on.length === 3 ? '#' : '.'
      }

      return on.length === 3 ? '#' : '.'
    })
  }

  return curr.count(v => v === '#')
}
