const $ = require('../../helpers')
const { Intcode } = require('../day-05')
const [input] = require('../../helpers/readInput')(__dirname)

const getGrid = input => {
  const comp = new Intcode(input)

  // A little puzzled why the computer is marked “halted” before the end though.
  // Basically it reaches opcode 99 after every interaction (there are indeed
  // many occurrences of opcode 99 in the input), and you need to keep poking it
  // until eventually it finishes, but you also don’t really know when besides
  // getting a new output value.
  while (comp.outputs.length !== comp.run().outputs.length) comp.run()

  const output = comp.getOutput()
  const width = output.findIndex(v => v === 10)
  const grid = $.chunk(output, width + 1).map(row =>
    row.slice(0, -1).map(c => String.fromCharCode(c))
  )

  return grid
}

const calibrate = grid => {
  let calibration = 0

  $.gridForEach(grid, (v, ri, ci) => {
    if (v !== '#') return

    const neighborcoords = $.getBorderingCoords(ri, ci)
    const neighbors = neighborcoords.map(([ri, ci]) => grid?.[ri]?.[ci])
    const intersection = neighbors.every(neighbor => neighbor === '#')

    if (intersection) calibration += ri * ci
  })

  return calibration
}

const encode = string => (string + '\n').split('').map(a => a.charCodeAt())

const scaffold = input => {
  const computer = new Intcode(input).updateMemory(0, 2)

  // Helper function to minimize repeatition; totally sugar.
  computer.execute = function (input) {
    return this.setInput(encode(input)).run()
  }

  // The inputs were manually resolved by printing the map and listing out all
  // the instructions one by one to go from start to finish to begin with. Then
  // by figuring out 3 repeated patterns that are no longer than 20 characters.
  return computer
    .run()
    .execute('A,B,A,C,B,A,C,B,A,C')
    .execute('L,6,L,4,R,6,6')
    .execute('L,6,R,6,6,R,6,6,L,8')
    .execute('L,6,L,5,5,L,5,5,L,6')
    .execute('n')
    .getOutput()
    .pop()
}

module.exports = { getGrid, calibrate, scaffold }
