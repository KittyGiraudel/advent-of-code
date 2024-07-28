import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 05 — Sample', () => {
  const sample = $.sample(`
  0,9 -> 5,9
  8,0 -> 0,8
  9,4 -> 3,4
  2,2 -> 2,1
  7,0 -> 7,4
  6,4 -> 2,0
  0,9 -> 2,9
  3,4 -> 1,4
  0,0 -> 8,8
  5,5 -> 8,2
  `)

  assert.strictEqual(run(sample), 5)
  assert.strictEqual(run(sample, true), 12)
})

test('Day 05 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 7269)
  assert.strictEqual(run(input, true), 21_140)
})
