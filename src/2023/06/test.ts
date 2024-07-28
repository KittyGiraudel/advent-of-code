import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 06 — Sample', () => {
  const sample = $.sample(`
  Time:      7  15   30
  Distance:  9  40  200
  `)

  assert.strictEqual(run(sample), 288)
  assert.strictEqual(run(sample, true), 71_503)
})

test('Day 06 — Solutions', () => {
  const input = $.readInput(import.meta)
  assert.strictEqual(run(input), 449_820)
  assert.strictEqual(run(input, true), 42_250_895)
})
