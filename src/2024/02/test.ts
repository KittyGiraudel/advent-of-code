import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 02 — Sample', () => {
  const sample = $.sample(`
  7 6 4 2 1
  1 2 7 8 9
  9 7 6 2 1
  1 3 2 4 5
  8 6 4 4 1
  1 3 6 7 9
  `)

  assert.strictEqual(run(sample), 2)
  assert.strictEqual(run(sample, true), 4)
})

test('Day 02 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 269)
  assert.strictEqual(run(input, true), 337)
})
