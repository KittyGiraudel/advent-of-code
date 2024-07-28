import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 19 — Sample', () => {
  assert.strictEqual(run(5), 3)
  assert.strictEqual(run(5, true), 2)
})

test('Day 19 — Solutions', () => {
  assert.strictEqual(run(3_012_210), 1_830_117)
  assert.strictEqual(run(3_012_210, true), 1_417_887)
})
