const chunk = require('../../helpers/chunk')
const countOccurrences = require('../../helpers/countOccurrences')

const parse = (input, size) =>
  chunk(Array.from(input).map(Number), size.width * size.height)

const validate = (input, size) => {
  const [{ count }] = parse(input, size)
    .map(layer => ({ layer, count: countOccurrences(layer) }))
    .sort((a, b) => a.count['0'] - b.count['0'])

  return count['1'] * count['2']
}

const recompose = (input, size) => {
  const layers = parse(input, size)
  const image = Array.from({ length: size.height }, _ =>
    Array.from({ length: size.width }, _ => null)
  )

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]
    const rows = chunk(layer, size.width)

    for (let ri = 0; ri < rows.length; ri++) {
      const row = rows[ri]

      for (let ci = 0; ci < row.length; ci++) {
        const pixel = row[ci]

        if (image[ri][ci] === null || image[ri][ci] === 2) {
          image[ri][ci] = pixel
        }
      }
    }
  }

  return image
}

const render = grid =>
  grid.map(row => row.map(a => a || ' ').join(' ')).join('\n')

module.exports = { validate, render, recompose }
