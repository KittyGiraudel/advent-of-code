import $ from '../../helpers'
import { Point } from '../../types'

type Fold = ['x' | 'y', number]

export const parseInput = ([coords, instructions]: string[]) => {
  const dots = new Set<Point>(coords.split('\n') as Point[])
  const folds = instructions.split('\n').map<Fold>(instruction => {
    const [, axis, line] = $.match(instruction, /([xy])=(\d+)$/)
    return [axis as Fold[0], +line]
  })

  return { dots, folds }
}

export const foldOnce = (dots: Set<Point>, [axis, line]: Fold) =>
  Array.from(dots).reduce<Set<Point>>((acc, dot) => {
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
  const coords = Array.from(dots).map($.toCoords)
  const [, xMax, , yMax] = $.boundaries(coords)
  const grid = new $.Grid(xMax + 1, yMax + 1, ([ri, ci]) =>
    isDot(ci, ri) ? '#' : ' '
  )

  return grid.render(' ')
}
