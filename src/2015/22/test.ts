import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 22 — Solutions', () => {
  assert.strictEqual(run(false), 900)
  assert.strictEqual(run(true), 1216)
})
