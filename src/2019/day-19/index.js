const $ = require('../../helpers')
const fs = require('fs')
const { Intcode } = require('../day-05')
const [input] = require('../../helpers/readInput')(__dirname)

const run = (input, xAxis = [0, 50], yAxis = xAxis) => {
  const computer = new Intcode(input).run()
  const grid = Array.from({ length: yAxis[1] - yAxis[0] }, _ =>
    Array.from({ length: xAxis[1] - xAxis[0] })
  )

  for (let x = xAxis[0]; x < xAxis[1]; x++) {
    for (let y = yAxis[0]; y < yAxis[1]; y++) {
      const output = computer.reset().setInput([x, y]).run().getOutput()
      grid[y - yAxis[0]][x - xAxis[0]] = output
    }
  }

  return grid
}

const test = input => {
  const computer = new Intcode(input).run()
  const ping = (x, y) => computer.reset().setInput([x, y]).run().getOutput()

  while (true) {
    let x = 0
    let y = 100

    ping(x, y)
  }

  const xOffset = 700
  const yOffset = 1134
  const grid = Array.from({ length: 100 }, _ => Array.from({ length: 100 }))

  let valid = true

  for (let x = xOffset; x < xOffset + 100; x++) {
    for (let y = yOffset; y < yOffset + 100; y++) {
      const output = computer.reset().setInput([x, y]).run().getOutput()
      if (output !== 1) valid = false
      grid[y - yOffset][x - xOffset] = output
    }
  }

  const map = grid.map(row => row.join('')).join('\n')
  fs.writeFileSync('./dump.txt', map.replace(/0/g, '·'), 'utf8')

  return { valid, value: xOffset * 10000 + yOffset }
}

module.exports = { run }
