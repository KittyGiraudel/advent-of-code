import $ from '../../helpers'
import { Point } from '../../types'

type Fold = ['x' | 'y', number]

export const parseInput = ([coords, instructions]: string[]) => {
  const dots = new Set(coords.split('\n') as Point[])
  const folds = instructions.split('\n').map(instruction => {
    const [, axis, line] = instruction.match(/([xy])=(\d+)$/) ?? []
    return [axis, +line] as Fold
  })

  return { dots, folds }
}

export const foldOnce = (dots: Set<Point>, [axis, line]: Fold) =>
  Array.from(dots).reduce((acc, dot) => {
    const [x, y] = $.toCoords(dot)

    if (axis === 'x' && x >= line) {
      acc.delete(dot)
      acc.add($.toPoint([line - (x - line), y]))
    } else if (axis === 'y' && y >= line) {
      acc.delete(dot)
      acc.add($.toPoint([x, line - (y - line)]))
    }

    return acc
  }, new Set(dots))

export const foldAll = (input: string[]) => {
  const { dots, folds } = parseInput(input)

  return folds.reduce((acc, fold) => foldOnce(acc, fold), new Set<Point>(dots))
}

export const render = (dots: Set<Point>) => {
  const isDot = (x: number, y: number) => dots.has($.toPoint([x, y]))
  const coords = Array.from(dots).map(point => $.toCoords(point))
  const [, xMax, , yMax] = $.boundaries(coords)
  const grid = $.grid.init(xMax + 1, yMax + 1, (x, y) =>
    isDot(x, y) ? '#' : ' '
  )

  return $.grid.render(grid, ' ')
}
