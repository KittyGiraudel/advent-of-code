const $ = require('../../helpers')
const { Intcode } = require('../day-05')

const amplify = (numbers, sequence) =>
  sequence.reduce(
    (acc, digit) =>
      new Intcode(numbers).setInput([digit, acc]).run().getOutput(),
    0
  )

const loop = (input, sequence) => {
  const index = $.loopIndex(0, sequence.length - 1)
  const computers = sequence.map(number => new Intcode(input).setInput(number))
  let signal = 0

  while (!computers[4].hasHalted()) {
    signal = computers[index.next().value].setInput(signal).run().getOutput()
  }

  return signal
}

const findHighestSignal = numbers =>
  Math.max(
    ...$.permutations([9, 8, 7, 6, 5]).map(sequence => loop(numbers, sequence))
  )

module.exports = { amplify, loop, findHighestSignal }
