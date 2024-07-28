import assert from 'node:assert'
import test from 'node:test'
import { run } from './'

test('Day 17 — Sample', () => {
  assert.strictEqual(run('ihgpwlah'), 'DDRRRD')
  assert.strictEqual(run('kglvqrro'), 'DDUDRLRRUDRD')
  assert.strictEqual(run('ulqzkmiv'), 'DRURDRUDDLLDLUURRDULRLDUUDDDRR')
  assert.strictEqual(run('ihgpwlah', true).length, 370)
  assert.strictEqual(run('kglvqrro', true).length, 492)
  assert.strictEqual(run('ulqzkmiv', true).length, 830)
})

test('Day 17 — Solutions', () => {
  assert.strictEqual(run('awrkjxxr'), 'RDURRDDLRD')
  assert.strictEqual(run('awrkjxxr', true).length, 526)
})
