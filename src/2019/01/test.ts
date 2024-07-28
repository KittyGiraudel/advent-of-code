import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { computeFuelCost, computeIterativeFuelCost } from './'

test('Day 01 — Sample', () => {
  assert.strictEqual(computeFuelCost(12), 2)
  assert.strictEqual(computeFuelCost(14), 2)
  assert.strictEqual(computeFuelCost(1969), 654)
  assert.strictEqual(computeFuelCost(100_756), 33_583)
  assert.strictEqual(computeIterativeFuelCost(14), 2)
  assert.strictEqual(computeIterativeFuelCost(1969), 966)
})

test('Day 01 — Solutions', () => {
  const numbers = $.readInput(import.meta).map(Number)

  assert.strictEqual($.sum(numbers.map(computeFuelCost)), 3_330_521)
  assert.strictEqual($.sum(numbers.map(computeIterativeFuelCost)), 4_992_931)
})
