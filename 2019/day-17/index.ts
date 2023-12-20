import $ from '../../helpers'
import { Grid } from '../../types'
import { Intcode } from '../day-05'

export const getGrid = (input: string) => {
  const computer = new Intcode(input)

  // A little puzzled why the computer is marked “halted” before the end though.
  // Basically it reaches opcode 99 after every interaction (there are indeed
  // many occurrences of opcode 99 in the input), and we need to keep poking it
  // until it eventually finishes, but we also don’t really know when besides
  // getting a new output value.
  while (computer.outputs.length !== computer.run().outputs.length)
    computer.run()

  // Convert the array of ASCII codes into their respective characters, then
  // join them all together to have a single large string. Then, split the
  // string on line breaks (formerly ASCII code 10), and split each row on
  // individual characters to make grid.
  return $.Grid.fromRows<string>(
    (computer.getOutput() as number[])
      .map(code => String.fromCharCode(code))
      .join('')
      .split('\n')
  )
}

export const calibrate = (grid: Grid<string>) =>
  grid.reduce((calibration, value, ri, ci) => {
    if (value !== '#') return calibration

    const neighborcoords = $.bordering([ri, ci], 'COORDS')
    const neighbors = neighborcoords.map(coords => grid.get(coords))
    const intersection = neighbors.every(neighbor => neighbor === '#')

    if (intersection) calibration += ri * ci

    return calibration
  }, 0)

export const scaffold = (input: string) => {
  const computer = new Intcode(input).updateMemory(0, 2)

  // Helper function to minimize repeatition; totally sugar.
  computer.execute = function (input: string) {
    return this.setInput($.toAscii(input)).run()
  }

  computer.run()

  // The inputs were manually resolved by printing the map and listing out all
  // the instructions one by one to go from start to finish to begin with. Then
  // by figuring out 3 repeated patterns that are no longer than 20 characters.
  return computer
    .execute('A,B,A,C,B,A,C,B,A,C')
    .execute('L,6,L,4,R,6,6')
    .execute('L,6,R,6,6,R,6,6,L,8')
    .execute('L,6,L,5,5,L,5,5,L,6')
    .execute('n')
    .getOutput()
    .pop()
}
