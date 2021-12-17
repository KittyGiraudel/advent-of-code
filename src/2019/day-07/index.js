const { Intcode } = require('../day-05')
const getPermutations = require('../../helpers/getPermutations')

const amplify = (numbers, sequence) => {
  let signal = 0

  for (let i = 0; i < sequence.length; i++) {
    const computer = new Intcode(numbers)
    computer.setInput(sequence[i])
    computer.setInput(signal)
    computer.run()
    signal = computer.getOutput()
  }

  return signal
}

const loop = (numbers, sequence) => {
  const computers = sequence.map(number =>
    new Intcode(numbers).setInput(number)
  )
  let index = 0
  let signal = 0

  while (!computers[4].hasHalted()) {
    computers[index].setInput(signal)
    computers[index].run()
    signal = computers[index].getOutput()
    index = index === 4 ? 0 : index + 1
  }

  return signal
}

const findHighestSignal = numbers =>
  Math.max(
    ...getPermutations([9, 8, 7, 6, 5]).map(sequence => loop(numbers, sequence))
  )

module.exports = { amplify, loop, findHighestSignal }
