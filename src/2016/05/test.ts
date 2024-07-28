import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

// Too slow to run.
test.skip('Day 05 — Sample', () => {
  assert.strictEqual(run('abc'), '18f47a30')
})

test.skip('Day 05 — Solutions', () => {
  assert.strictEqual(run('ugkcyxxp'), 'd4cd2ee1')
  assert.strictEqual(run('ugkcyxxp', true), 'f2c730e5')
})
