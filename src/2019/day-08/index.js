const $ = require('../../helpers')

const parse = (input, size) =>
  $.chunk(Array.from(input).map(Number), size.width * size.height)

const validate = (input, size) => {
  const { count } = parse(input, size)
    .map(layer => ({ layer, count: $.count(layer) }))
    .sort((a, b) => b.count['0'] - a.count['0'])
    .pop()

  return count['1'] * count['2']
}

const recompose = (input, size) => {
  const layers = parse(input, size)
  const image = $.grid.init(size.width, size.height)

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]
    const grid = $.chunk(layer, size.width)

    $.grid.forEach(grid, (pixel, ri, ci) => {
      if ([null, 2].includes($.access(image, [ri, ci]))) {
        image[ri][ci] = pixel
      }
    })
  }

  return image
}

const render = grid => $.grid.render(grid, ' ', v => v || ' ')

module.exports = { validate, render, recompose }
