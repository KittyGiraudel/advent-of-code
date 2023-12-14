import $ from '../../helpers'
import { Intcode } from '../day-05'

export const amplify = (numbers: string, sequence: number[]) =>
  sequence.reduce<number>(
    (acc, digit) =>
      +new Intcode(numbers).setInput([digit, acc]).run().getOutput(),
    0
  )

export const loop = (input: string, sequence: number[]) => {
  const index = $.loopIndex(0, sequence.length - 1)
  const computers = sequence.map(number => new Intcode(input).setInput(number))
  let signal = 0

  while (!computers[4].hasHalted()) {
    signal = computers[index.next().value]
      .setInput(signal)
      .run()
      .getOutput() as number
  }

  return signal
}

export const findHighestSignal = (numbers: string) =>
  Math.max(
    ...$.permutations([9, 8, 7, 6, 5]).map(sequence => loop(numbers, sequence))
  )
