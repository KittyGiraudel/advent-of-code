import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 05 — Sample', () => {
  const sample = [0, 3, 0, 1, -3]

  assert.strictEqual(run(sample), 5)
  assert.strictEqual(run(sample, 3), 10)
})

test('Day 05 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(run(input), 372_671)
  assert.strictEqual(run(input, 3), 25_608_480)
})
