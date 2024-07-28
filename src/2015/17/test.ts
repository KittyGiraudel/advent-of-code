import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 17 — Sample', () => {
  assert.strictEqual(run([20, 15, 10, 5, 5], 25)[0], 4)
  assert.strictEqual(run([20, 15, 10, 5, 5], 25)[1], 3)
})

test('Day 17 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.deepStrictEqual(run(input, 150), [654, 57])
})
