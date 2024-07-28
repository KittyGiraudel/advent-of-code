import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 18 — Sample', () => {
  const sample = $.sample(`
  .#.#.#
  ...##.
  #....#
  ..#...
  #.#..#
  ####..
  `)

  assert.strictEqual(run(sample, 4), 4)
  assert.strictEqual(run(sample, 5, true), 17)
})

test('Day 18 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 100), 1061)
  assert.strictEqual(run(input, 100, true), 1006)
})
