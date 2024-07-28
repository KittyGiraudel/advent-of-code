import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { mix } from './'

test('Day 20 — Sample', () => {
  const sample = [1, 2, -3, 3, -2, 0, 4]

  assert.strictEqual(mix(sample, 1, 1), 3)
  assert.strictEqual(mix(sample, 10, 811_589_153), 1_623_178_306)
})

test('Day 20 — Solutions', () => {
  const input = $.readInput(import.meta).map(Number)

  assert.strictEqual(mix(input), 13_522)
  assert.strictEqual(mix(input, 10, 811_589_153), 17_113_168_880_158)
})
