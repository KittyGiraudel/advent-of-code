import $ from '../../helpers'

const getTilingCoords = (ri, ci) => {
  const [N, NE, E, SE, S, SW, W, NW] = $.surrounding([ri, ci], 'COORDS')
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
  const curr = $.grid.create(rows)
  const next = $.grid.clone(curr)

  $.grid.forEach(curr, (_, ri, ci) => {
    const value = $.toDec(
      getTilingCoords(ri, ci)
        .map(coords => $.access(curr, coords) ?? defaultChar)
        .map(value => +(value === '#'))
        .join('')
    )

    next[ri][ci] = algorithm[value]
  })

  return $.grid.render(next)
}

export const processImage = (algorithm, image, iterations = 1) =>
  $.array(iterations).reduce(
    acc => {
      const image = step(algorithm, acc.image, acc.char)

      // Logic shamelessly stolen from this implementation found on GitHub:
      // https://github.com/tpatel/advent-of-code-2021/blob/main/day20.js#L64-L68
      // Basically, reverse the default value used in grid padding to account
      // for the infinity of the grid. The check on the algorithm’s edges is
      // necessary because the example and the input have different edges.
      if (acc.char === '.' && algorithm[0] === '#') {
        acc.char = '#'
      } else if (acc.char === '#' && $.last(algorithm) === '.') {
        acc.char = '.'
      }

      return { image, char: acc.char }
    },
    { image, char: '.' }
  ).image
