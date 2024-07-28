import assert from 'node:assert'
import test from 'node:test'
import { run, run2 } from './'

test('Day 17 — Sample', () => {
  assert.strictEqual(run(3), 638)
})

test('Day 17 — Solutions', () => {
  assert.strictEqual(run(394), 926)
  assert.strictEqual(run2(394), 10_150_888)
})
