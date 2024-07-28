import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 09 — Sample', () => {
  const sample = $.sample(
    `
    0 3 6 9 12 15
    1 3 6 10 15 21
    10 13 16 21 30 45
    `
  )

  assert.strictEqual(run(sample), 114)
  assert.strictEqual(run(sample, true), 2)
})

test('Day 09 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 1_898_776_583)
  assert.strictEqual(run(input, true), 1100)
})
