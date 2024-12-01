import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 01 — Sample', () => {
  const sample = $.sample(`
  3   4
  4   3
  2   5
  1   3
  3   9
  3   3
  `)

  assert.strictEqual(run(sample), 11)
  assert.strictEqual(run(sample, true), 31)
})

test('Day 01 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input, false), 2367773)
  assert.strictEqual(run(input, true), 21271939)
})
