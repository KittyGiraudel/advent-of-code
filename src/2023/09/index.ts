import $ from '../../helpers'

const extrapolate =
  (part2 = false) =>
  (history: number[]) => {
    const layers = [history]

    // Note that we construct the layers *upwards* instead of downwards to ease
    // the code a bit and maintain the relevant layer at static index 0 instead
    // of having to read the length of the array every time to get the last
    // layer.
    while (layers[0].some(Boolean))
      layers.unshift(layers[0].map((v, i, a) => a[i + 1] - v).slice(0, -1))

    // To exrapolate the correct value for the given history, we start from the
    // layer of zeroes (first in our array of layers), and for each layer, we
    // update the accumulate based on the current edge.
    return layers.reduce(
      (acc, layer) => (part2 ? layer[0] - acc : layer[layer.length - 1] + acc),
      0
    )
  }

export const run = (input: string[], part2 = false) =>
  $.sum(input.map($.numbers).map(extrapolate(part2)))
