const $ = require('../../helpers')

const getTilingCoords = (ri, ci) => {
  const [N, NE, E, SE, S, SW, W, NW] = $.getSurroundingCoords(ri, ci)
  const C = [ri, ci]

  // prettier-ignore
  return [
    NW, N, NE,
     W, C,  E,
    SW, S, SE,
  ]
}

const padInput = (input, defaultChar = '.') => {
  const rows = input.split('\n')
  const padding = defaultChar.repeat(rows[0].length)

  return [padding, ...rows, padding].map(row => defaultChar + row + defaultChar)
}

const step = (algorithm, input, defaultChar = '.') => {
  const rows = padInput(input, defaultChar)
  const curr = $.createGrid(rows)
  const next = $.createGrid(rows)

  $.gridForEach(curr, (_, ri, ci) => {
    const value = $.toDec(
      getTilingCoords(ri, ci)
        .map(([ri, ci]) => curr?.[ri]?.[ci] ?? defaultChar)
        .map(value => +(value === '#'))
        .join('')
    )

    next[ri][ci] = algorithm[value]
  })

  return next.map(row => row.join('')).join('\n')
}

const processImage = (algorithm, image, iterations = 1) =>
  Array.from({ length: iterations }).reduce(
    acc => {
      const image = step(algorithm, acc.image, acc.char)

      // Logic shamelessly stolen from this implementation found on GitHub:
      // https://github.com/tpatel/advent-of-code-2021/blob/main/day20.js#L64-L68
      // Basically, reverse the default value used in grid padding to account
      // for the infinity of the grid. The check on the algorithm’s edges is
      // necessary because the example and the input have different edges.
      if (acc.char === '.' && algorithm[0] === '#') {
        acc.char = '#'
      } else if (acc.char === '#' && algorithm[algorithm.length - 1] === '.') {
        acc.char = '.'
      }

      return { image, char: acc.char }
    },
    { image, char: '.' }
  ).image

module.exports = { processImage }
