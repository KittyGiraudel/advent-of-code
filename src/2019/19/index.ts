import $ from '../../helpers'
import type { Coords } from '../../types'
import { Intcode } from '../05'

export const run = (
  input: string,
  xAxis: Coords = [0, 50],
  yAxis: Coords = xAxis
) => {
  const computer = new Intcode(input).run()
  const grid = new $.Grid<number>(xAxis[1] - xAxis[0], yAxis[1] - yAxis[0])

  for (let x = xAxis[0]; x < xAxis[1]; x++) {
    for (let y = yAxis[0]; y < yAxis[1]; y++) {
      grid.set(
        [y - yAxis[0], x - xAxis[0]],
        computer.reset().setInput([x, y]).run().getOutput<number>()
      )
    }
  }

  return grid
}

const test = (input: string) => {
  const computer = new Intcode(input).run()
  const ping = (x: number, y: number) =>
    computer.reset().setInput([x, y]).run().getOutput<number>()
  const xOffset = 700
  const yOffset = 1134
  const grid = new $.Grid<number>(100)

  let valid = true

  for (let x = xOffset; x < xOffset + 100; x++) {
    for (let y = yOffset; y < yOffset + 100; y++) {
      const output = ping(x, y)
      if (output !== 1) valid = false
      grid.set([y - yOffset, x - xOffset], output)
    }
  }

  return { valid, value: xOffset * 10_000 + yOffset }
}
