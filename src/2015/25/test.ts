import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 25 — Solutions', () => {
  assert.strictEqual(run([2981, 3075]), 9_132_360)
})
