import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 13 — Sample', () => {
  assert.strictEqual(run([4, 7], 10), 11)
})

test('Day 13 — Solutions', () => {
  assert.strictEqual(run([39, 31], 1364), 86)
  assert.strictEqual(run([39, 31], 1364, true), 127)
})
