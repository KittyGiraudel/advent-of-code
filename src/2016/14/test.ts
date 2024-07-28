import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 14 — Sample', () => {
  assert.strictEqual(run('abc'), 22_728)
})

test('Day 14 — Solutions', () => {
  assert.strictEqual(run('jlmsuwbz'), 35_186)
})
