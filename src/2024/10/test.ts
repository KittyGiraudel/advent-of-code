import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 10 — Sample', () => {
  const sample = $.sample(
    `
    89010123
    78121874
    87430965
    96549874
    45678903
    32019012
    01329801
    10456732
    `
  )

  assert.strictEqual(run(sample), 36)
  assert.strictEqual(run(sample, true), 81)
})

test('Day 10 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 709)
  assert.strictEqual(run(input, true), 1326)
})
