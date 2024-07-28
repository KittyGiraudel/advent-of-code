import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 22 — Sample', () => {
  assert.strictEqual(run(510, [10, 10]), 114)
  assert.strictEqual(run(510, [10, 10], true), 45)
})

test('Day 22 — Solutions', () => {
  assert.strictEqual(run(10_647, [770, 7]), 6208)
  assert.strictEqual(run(10_647, [770, 7], true), 1039)
})
