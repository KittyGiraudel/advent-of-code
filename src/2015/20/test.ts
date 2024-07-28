import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 20 — Sample', () => {
  assert.deepStrictEqual(run(150), [8, 8])
})

test('Day 20 — Solutions', () => {
  assert.deepStrictEqual(run(29_000_000), [665_280, 705_600])
})
