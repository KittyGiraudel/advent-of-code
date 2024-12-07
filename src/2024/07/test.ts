import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 07 — Sample', () => {
  const sample = $.sample(
    `
    190: 10 19
    3267: 81 40 27
    83: 17 5
    156: 15 6
    7290: 6 8 6 15
    161011: 16 10 13
    192: 17 8 14
    21037: 9 7 18 13
    292: 11 6 16 20
    `
  )

  assert.strictEqual(run(sample), 3749)
  assert.strictEqual(run(sample, true), 11387)
})

test('Day 07 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 12553187650171)
  assert.strictEqual(run(input, true), 96779702119491)
})
