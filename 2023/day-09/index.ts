import $ from '../../helpers'

const getNextValue = (value: number, index: number, array: number[]) =>
  array[index + 1] - value

// Note that I construct the layers *upwards* instead of downwards to simplify
// the code a bit and maintain the relevant layer at static index 0 instead of
// having to read the length of the array every time to get the last layer.
const extrapolate = (advanced?: boolean) => (history: number[]) => {
  let layers = [history]

  // Step 1: reduce until only 0
  while (layers[0].some(Boolean))
    layers.unshift(layers[0].map(getNextValue).slice(0, -1))

  // Step 2: extrapolate back the edges
  if (advanced) layers[0].unshift(0)
  else layers[0].push(0)

  // Start from the 2nd layer, as the first one contains only zeroes (0).
  for (let i = 1; i < layers.length; i++) {
    const layer = layers[i]
    const above = layers[i - 1]
    const end = layer.length - 1

    if (advanced) layer.unshift(layer[0] - above[0])
    else layer.push(layer[end] + above[end])
  }

  return layers.pop()!.at(advanced ? 0 : -1) as number
}

export const run = (input: string[], advanced?: boolean) =>
  $.sum(input.map($.numbers).map(extrapolate(advanced)))
