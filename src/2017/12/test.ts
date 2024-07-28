import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 12 — Sample', () => {
  const sample = $.sample(`
  0 <-> 2
  1 <-> 1
  2 <-> 0, 3, 4
  3 <-> 2, 4
  4 <-> 2, 3, 6
  5 <-> 6
  6 <-> 4, 5
  `)

  assert.strictEqual(run(sample), 6)
  assert.strictEqual(run(sample, true), 2)
})

test('Day 12 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 141)
  assert.strictEqual(run(input, true), 171)
})
