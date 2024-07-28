import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 21 — Solutions', () => {
  assert.deepStrictEqual(run([0, 9, 2, 103]), [121, 201])
})
