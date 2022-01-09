const $ = require('../../helpers')

const parseInput = ([coords, instructions]) => {
  const dots = new Set(coords.split('\n'))
  const folds = instructions.split('\n').map(instruction => {
    const [, axis, line] = instruction.match(/([xy])=(\d+)$/)
    return [axis, +line]
  })

  return { dots, folds }
}

const foldOnce = (dots, [axis, line]) =>
  Array.from(dots).reduce((acc, dot) => {
    const [x, y] = dot.split(',').map(Number)

    if (axis === 'x' && x >= line) {
      acc.delete(dot)
      acc.add([line - (x - line), y].join(','))
    } else if (axis === 'y' && y >= line) {
      acc.delete(dot)
      acc.add([x, line - (y - line)].join(','))
    }

    return acc
  }, new Set(dots))

const foldAll = input => {
  const { dots, folds } = parseInput(input)

  return folds.reduce((acc, fold) => foldOnce(acc, fold), new Set(dots))
}

const render = dots => {
  const isDot = (x, y) => dots.has([x, y].join(','))
  const coords = Array.from(dots, dot => dot.split(',').map(Number))
  const xMax = Math.max(...coords.map(dot => dot[0])) + 1
  const yMax = Math.max(...coords.map(dot => dot[1])) + 1
  const grid = $.grid.init(xMax, yMax, (x, y) => (isDot(x, y) ? '#' : ' '))

  return $.grid.render(grid, ' ')
}

module.exports = { parseInput, foldOnce, foldAll, render }
