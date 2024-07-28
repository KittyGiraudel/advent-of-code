import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 03 — Sample', () => {
  assert.strictEqual(run(1024), 31)
  assert.strictEqual(run(1024, true), 1968)
})

test('Day 03 — Solutions', () => {
  assert.strictEqual(run(361_527), 326)
  assert.strictEqual(run(361_527, true), 363_010)
})
