import $ from '../../helpers'
import { Coords, Point } from '../../types'

export const run = (
  input: string[],
  iterations: number,
  advanced: boolean = false
) => {
  let curr = $.grid.from<string>(input)
  const { width, height } = $.grid.dimensions(curr)
  const corners: Point[] = [
    `0,0`,
    `0,${width - 1}`,
    `${height - 1},0`,
    `${height - 1},${width - 1}`,
  ]

  if (advanced) {
    corners.forEach(point => $.grid.set(curr, $.toCoords(point), '#'))
  }

  while (iterations--) {
    curr = $.grid.map(curr, (value, ...coords) => {
      const neighbors = $.surrounding(coords, 'COORDS')
      const on = neighbors.filter(coords => $.grid.at(curr, coords) === '#')

      if (advanced && corners.includes($.toPoint(coords))) {
        return '#'
      }

      if (value === '#') {
        return on.length === 2 || on.length === 3 ? '#' : '.'
      }

      return on.length === 3 ? '#' : '.'
    })
  }

  return $.countInString(curr.join(''), '#')
}
