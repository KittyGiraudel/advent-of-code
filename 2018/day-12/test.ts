import test from 'ava'
import $ from '../../helpers'
import { cycle } from './'

test('Day 12 — Sample', t => {
  const sample = $.sample(
    `
  initial state: #..#.#..##......###...###

  ...## => #
  ..#.. => #
  .#... => #
  .#.#. => #
  .#.## => #
  .##.. => #
  .#### => #
  #.#.# => #
  #.### => #
  ##.#. => #
  ##.## => #
  ###.. => #
  ###.# => #
  ####. => #
  `,
    '\n\n'
  )

  t.is(cycle(sample, 20), 325)
})

test('Day 12 — Solutions', t => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' })

  t.is(cycle(input, 20), 3217)
  t.is(cycle(input, 50000000000), 4000000000866)
})
