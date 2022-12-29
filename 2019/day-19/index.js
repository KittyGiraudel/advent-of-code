import $ from '../../helpers'
import { Intcode } from '../day-05'

export const run = (input, xAxis = [0, 50], yAxis = xAxis) => {
  const computer = new Intcode(input).run()
  const grid = $.grid.init(xAxis[1] - xAxis[0], yAxis[1] - yAxis[0])

  for (let x = xAxis[0]; x < xAxis[1]; x++) {
    for (let y = yAxis[0]; y < yAxis[1]; y++) {
      grid[y - yAxis[0]][x - xAxis[0]] = computer
        .reset()
        .setInput([x, y])
        .run()
        .getOutput()
    }
  }

  return grid
}

const test = input => {
  const computer = new Intcode(input).run()
  const ping = (x, y) => computer.reset().setInput([x, y]).run().getOutput()
  const xOffset = 700
  const yOffset = 1134
  const grid = $.grid.init(100)

  let valid = true

  for (let x = xOffset; x < xOffset + 100; x++) {
    for (let y = yOffset; y < yOffset + 100; y++) {
      const output = ping(x, y)
      if (output !== 1) valid = false
      grid[y - yOffset][x - xOffset] = output
    }
  }

  return { valid, value: xOffset * 10000 + yOffset }
}
