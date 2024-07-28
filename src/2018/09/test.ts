import assert from 'node:assert'
import test from 'node:test'
import { play } from './'

test('Day 09 — Sample', () => {
  assert.strictEqual(play(9, 25), 32)
  assert.strictEqual(play(17, 1104), 2764)
  assert.strictEqual(play(10, 1618), 8317)
  assert.strictEqual(play(21, 6111), 54_718)
  assert.strictEqual(play(30, 5807), 37_305)
  assert.strictEqual(play(13, 7999), 146_373)
})

test('Day 09 — Solutions', () => {
  assert.strictEqual(play(468, 71_010), 374_287)
  assert.strictEqual(play(468, 71_010 * 100), 3_083_412_635)
})
