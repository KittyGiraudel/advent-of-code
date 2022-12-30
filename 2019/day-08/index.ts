import $ from '../../helpers'
import { Grid } from '../../types'

const parse = (
  input: string,
  size: { width: number; height: number }
): Grid<number> =>
  $.chunk(
    Array.from(input).map(Number),
    size.width * size.height
  ) as Grid<number>

export const validate = (
  input: string,
  size: { width: number; height: number }
): number => {
  const { count } = parse(input, size)
    .map(layer => ({ layer, count: $.count(layer) }))
    .sort((a, b) => b.count['0'] - a.count['0'])
    .pop()

  return count['1'] * count['2']
}

export const recompose = (
  input: string,
  size: { width: number; height: number }
): Grid<number> => {
  const layers = parse(input, size)
  const image = $.grid.init<number>(size.width, size.height)

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]
    const grid = $.chunk(layer, size.width) as Grid<number>

    $.grid.forEach(grid, (pixel, ri, ci) => {
      if ([null, 2].includes($.access(image, [ri, ci]))) {
        image[ri][ci] = pixel
      }
    })
  }

  return image
}

export const render = (grid: Grid<number>): string =>
  $.grid.render(grid, ' ', v => String(v) || ' ')
