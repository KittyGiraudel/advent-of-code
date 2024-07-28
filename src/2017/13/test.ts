import assert from 'node:assert'
import test from 'node:test'
import $ from '../../helpers'
import { cross, run } from './'

test('Day 13 — Sample', () => {
  const sample = $.sample(`
  0: 3
  1: 2
  4: 4
  6: 4
  `)

  assert.strictEqual(run(sample), 24)
  assert.strictEqual(cross(sample), 10)
})

test('Day 13 — Solutions', () => {
  const input = $.readInput(import.meta)

  assert.strictEqual(run(input), 1900)
  assert.strictEqual(cross(input), 3_966_414)
})
