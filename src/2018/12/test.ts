import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { cycle } from './'

test('Day 12 — Sample', () => {
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
    { delimiter: '\n\n' }
  ) as [string, string]

  assert.strictEqual(cycle(sample, 20), 325)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: '\n\n' }) as [
    string,
    string,
  ]

  assert.strictEqual(cycle(input, 20), 3217)
  assert.strictEqual(cycle(input, 50_000_000_000), 4_000_000_000_866)
})
