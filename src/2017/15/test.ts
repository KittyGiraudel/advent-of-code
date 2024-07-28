import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 15 — Sample', () => {
  assert.strictEqual(run(65, 8921, 5), 1)
  assert.strictEqual(run(65, 8921, 40_000_000), 588)
  assert.strictEqual(run(65, 8921, 1056, 4, 8), 1)
  assert.strictEqual(run(65, 8921, 5_000_000, 4, 8), 309)
})

test('Day 15 — Solutions', () => {
  assert.strictEqual(run(277, 349, 40_000_000), 592)
  assert.strictEqual(run(277, 349, 5_000_000, 4, 8), 320)
})
