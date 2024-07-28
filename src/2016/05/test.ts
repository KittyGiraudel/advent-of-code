import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 05 — Sample', { skip: 'Too slow to run' }, () => {
  assert.strictEqual(run('abc'), '18f47a30')
})

test('Day 05 — Solutions', { skip: 'Too slow to run' }, () => {
  assert.strictEqual(run('ugkcyxxp'), 'd4cd2ee1')
  assert.strictEqual(run('ugkcyxxp', true), 'f2c730e5')
})
