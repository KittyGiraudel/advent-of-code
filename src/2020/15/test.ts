import assert from 'node:assert'
import test from 'node:test'
import { get } from '.'
import $ from '../../helpers'

test('Day 15 — Sample', () => {
  assert.strictEqual(get([0, 3, 6], 2020), 436)
  assert.strictEqual(get([1, 3, 2], 2020), 1)
  assert.strictEqual(get([2, 1, 3], 2020), 10)
  assert.strictEqual(get([1, 2, 3], 2020), 27)
  assert.strictEqual(get([2, 3, 1], 2020), 78)
  assert.strictEqual(get([3, 2, 1], 2020), 438)
  assert.strictEqual(get([3, 1, 2], 2020), 1836)
  assert.strictEqual(get([0, 3, 6], 30_000_000), 175_594)
})

test('Day 15 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(get(input, 2020), 289)
  assert.strictEqual(get(input, 30_000_000), 1_505_722)
})
