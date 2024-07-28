import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 14 — Sample', () => {
  assert.strictEqual(run('flqrgnkx'), 8108)
  assert.strictEqual(run('flqrgnkx', true), 1242)
})

test('Day 14 — Solutions', () => {
  assert.strictEqual(run('vbqugkhl'), 8148)
  assert.strictEqual(run('vbqugkhl', true), 1180)
})
