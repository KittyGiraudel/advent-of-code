import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 24 — Sample', () => {
  const sample = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]

  assert.strictEqual(run(sample, 3), 99)
  assert.strictEqual(run(sample, 4), 44)
})

test('Day 24 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(run(input, 3), 10_439_961_859)
  assert.strictEqual(run(input, 4), 72_050_269)
})
