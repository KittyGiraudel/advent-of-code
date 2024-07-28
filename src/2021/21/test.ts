import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 21 — Sample', () => {
  assert.strictEqual(run([4, 8]), 739_785)
  assert.strictEqual(run([4, 8], true), 444_356_092_776_315)
})

test('Day 21 — Solutions', () => {
  assert.strictEqual(run([4, 5]), 864_900)
  assert.strictEqual(run([4, 5], true), 575_111_835_924_670)
})
