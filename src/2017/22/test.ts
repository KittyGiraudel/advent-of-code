import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { run } from './'

test('Day 22 — Sample', () => {
  const sample = $.sample(`
  ..#
  #..
  ...
  `)

  assert.strictEqual(run(sample, 7), 5)
  assert.strictEqual(run(sample, 70), 41)
  assert.strictEqual(run(sample, 10_000), 5587)
  assert.strictEqual(run(sample, 100, true), 26)
  assert.strictEqual(run(sample, 10_000_000, true), 2_511_944)
})

test('Day 22 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input, 10_000), 5280)
  assert.strictEqual(run(input, 10_000_000, true), 2_512_261)
})
