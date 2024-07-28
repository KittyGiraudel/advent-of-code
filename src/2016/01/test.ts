import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Sample', () => {
  assert.strictEqual(run('R2, L3'.split(', ')), 5)
  assert.strictEqual(run('R2, R2, R2'.split(', ')), 2)
  assert.strictEqual(run('R5, L5, R5, R3'.split(', ')), 12)
  assert.strictEqual(run('R8, R4, R4, R8'.split(', '), true), 4)
})

test('Day 01 — Solutions', () => {
  const input = $.readInput(import.meta, { delimiter: ', ' })

  assert.strictEqual(run(input), 239)
  assert.strictEqual(run(input, true), 141)
})
