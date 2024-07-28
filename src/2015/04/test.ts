import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 04 — Sample', () => {
  assert.strictEqual(run('abcdef'), 609_043)
})

test('Day 04 — Solutions', () => {
  assert.strictEqual(run('ckczppom'), 117_946)
  assert.strictEqual(run('ckczppom', 6), 3_938_038)
})
