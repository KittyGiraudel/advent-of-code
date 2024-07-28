import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

// Too slow to run.
test('Day 05 — Sample', { skip: true }, () => {
  assert.strictEqual(run('abc'), '18f47a30')
})

test('Day 05 — Solutions', { skip: true }, () => {
  assert.strictEqual(run('ugkcyxxp'), 'd4cd2ee1')
  assert.strictEqual(run('ugkcyxxp', true), 'f2c730e5')
})
