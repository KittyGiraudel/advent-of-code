import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 10 — Sample', () => {
  assert.strictEqual(run('1'), 2)
  assert.strictEqual(run('11'), 2)
  assert.strictEqual(run('21'), 4)
  assert.strictEqual(run('1211'), 6)
  assert.strictEqual(run('111221'), 6)
})

test('Day 10 — Solutions', () => {
  assert.strictEqual(run('1113122113', 40), 360_154)
  assert.strictEqual(run('1113122113', 50), 5_103_798)
})
