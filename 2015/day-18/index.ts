import $ from '../../helpers'
import { Coords, Point } from '../../types'

export const run = (
  input: string[],
  iterations: number,
  advanced: boolean = false
): number => {
  let curr = $.grid.create<string>(input)
  const width = curr[0].length
  const height = curr.length
  const corners: Point[] = [
    `0,0`,
    `0,${width - 1}`,
    `${height - 1},0`,
    `${height - 1},${width - 1}`,
  ]

  if (advanced) {
    corners
      .map($.toCoords)
      .forEach(coords => (curr[coords[0]][coords[1]] = '#'))
  }

  while (iterations--) {
    curr = $.grid.map($.grid.clone(curr), (value, ri, ci) => {
      const neighbors: Coords[] = $.surrounding([ri, ci], 'COORDS')
      const on = neighbors.filter(coords => $.access(curr, coords) === '#')

      if (advanced && corners.includes($.toPoint([ri, ci]))) {
        return '#'
      }

      if (value === '#') {
        return on.length === 2 || on.length === 3 ? '#' : '.'
      }

      return on.length === 3 ? '#' : '.'
    })
  }

  return $.countInString(curr.flat().join(''), '#')
}