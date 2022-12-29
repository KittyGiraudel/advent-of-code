import $ from '../../helpers'

export const parseInput = ([coords, instructions]) => {
  const dots = new Set(coords.split('\n'))
  const folds = instructions.split('\n').map(instruction => {
    const [, axis, line] = instruction.match(/([xy])=(\d+)$/)
    return [axis, +line]
  })

  return { dots, folds }
}

export const foldOnce = (dots, [axis, line]) =>
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

export const foldAll = input => {
  const { dots, folds } = parseInput(input)

  return folds.reduce((acc, fold) => foldOnce(acc, fold), new Set(dots))
}

export const render = dots => {
  const isDot = (x, y) => dots.has($.toPoint([x, y]))
  const coords = Array.from(dots, $.toCoords)
  const [, xMax, , yMax] = $.boundaries(coords)
  const grid = $.grid.init(xMax + 1, yMax + 1, (x, y) =>
    isDot(x, y) ? '#' : ' '
  )

  return $.grid.render(grid, ' ')
}
